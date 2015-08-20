/**
 * This is the base connecting module.
 * UPnP and NAT-PMP included.
 **/

// this module is currently implemented by node-rudp;
// the protocol (I think) does not implement any congestion control methods.

var co = require('co');
var rudp = require('rudp');
var env = require('./environment');
var connection = module.exports;

var nativeSock = null, server = null;
var messageListeners = {};

/*
 * send message 
 * address is {address:'...', port:...} or something according to your protocol.
 */
connection.send = function (message, address) {
    var msgBuf = message.toBuffer();
    // todo: check protocol
    var socket = connect(address.address, address.port);
    socket.send(msgBuf);
    // warning: no callback here
    // but a return value of Promise is expected
};

/*
 * callback is function(message, address)
 * messageType === '*' means all messages
 */
connection.subscribe = function (messageType, callback) {
    var indexName = 'msg_' + messageType;
    if (messageListeners[indexName] === undefined) {
        messageListeners[indexName] = [];
    }
    messageListeners[indexName].push(callback);
};

connection.init = co.wrap(function* () {
    nativeSock = dgram.createSocket('udp6');
    nativeSock.bind(env.localPort);
    server = new rudp.Server(nativeSock);
    server.on('connection', function (socket) {
        manageSocket(socket); // manage the connection
    });
});


// todo: closing timeout
// todo: check IP address format
var connected = [];

function addrHash(addr, port) {
    return addr + ':' + port;
}

function manageSocket(socket) {
    socket.address = socket._sender._packetSender._address;
    socket.port = socket._sender._packetSender._port;
    socket.on('data', handleMessage.bind(socket));
    connected[addrHash(socket.address, socket.port)] = socket;
}

function connect(addr, port) {
    if (connected[addrHash(addr, port)]) {
        return connected[addrHash(addr, port)];
    } else {
        var socket = new rudp.Client(nativeSock, addr, port);
        manageSocket(socket);
        return socket;
    }
}

function handleMessage(msgBuf) {
    try {
        var msg = new Message(msgBuf);
        var address = {
            address: this.address,
            port: this.port
        };
    } catch (err) {
        // todo: log warning
    }
    try {
        var indexName = 'msg_' + msg.type;
        if (messageListeners[indexName]) {
            for (var cb of messageListeners[indexName]) {
                cb(msg, address);
            }
        }
        if (messageListeners['msg_*']) {
            for (var cb of messageListeners['msg_*']) {
                cb(msg, address);
            }
        }
    } catch (err) {
        // todo: error event
    }
}
