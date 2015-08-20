/**
 * This module defines NodeID formats, its object structure, 
 * and implements related methods.
 **/

var env = require('./environment');

// create ID object
var NodeID = module.exports = function (strID) {
};

// ID structue
NodeID.prototype = {};

// get/set one bit
NodeID.prototype.bit = function (position, value) {};

NodeID.prototype.clone = function () {};
NodeID.prototype.toString = function () {};
NodeID.prototype.toJSON = function () {};

// get/set address
NodeID.prototype.address = function (address) {};

NodeID.myNodeID = env.myNodeID = null;
