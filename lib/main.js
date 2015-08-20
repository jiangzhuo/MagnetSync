/**
 * This file integrates all other modules.
 **/

var magnetSync = module.exports;

var env = magnetSync.environment = require('./environment');
var NodeID = magnetSync.NodeID = require('./node-id');
var Message = magnetSync.Message = require('./message');
var connection = magnetSync.connection = require('./connection');

magnetSync.init = function () {
    // load options
    // listen
    connection.init();
    // upnp
    // stun test
};
