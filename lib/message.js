/**
 * This module defines message formats, message object structure, 
 * and implements related methods.
 **/

// create an empty message or create a message from buffer
var Message = module.exports = function (buffer) { // throws
    if (buffer === undefined) {
        // empty message
    } else {
        var msgObj = JSON.parse(buffer);
        // todo: validate
        for (var i of ['uuid', 'nodeID', 'keyType', 'key', 'keyExtra',
                'userAgent', 'date', 'type', 'payload']) {
            this[i] = msgObj[i];
        }
    }
};

// message structure
Message.prototype = {
    uuid: null,
    nodeID: null,
    type: null,
    payload: null,
    userAgent: null,
    date: null
};

// serialization
Message.prototype.toBuffer = function () {
    var msgObj = {
        uuid: this.uuid,
        nodeID: this.nodeID,
        keyType: null,
        key: null,
        keyExtra: null,
        signature: '',
        userAgent: this.userAgent,
        date: this.date,
        type: this.type,
        payload: this.payload
    };
    var msgBuf = new Buffer(JSON.stringify(msgObj), 'utf8');
    return msgBuf;
};
