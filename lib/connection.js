/**
 * This is the base connecting module.
 * UPnP and NAT-PMP included.
 **/
var connection = module.exports;

/*
 * send message 
 * address is {address:'...', port:...} or something according to your protocol.
 */
connection.send = function (message, address) {
};

/*
 * callback is function(message, address)
 * messageType === '*' means all messages
 */
connection.subscribe = function (messageType, callback) {
};
