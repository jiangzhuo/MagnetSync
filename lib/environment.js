/**
 * This module provides global envirionment variables for the networking part.
 **/
var events = require('events');
var env = module.exports = new events.EventEmitter;

env.localPort = 23333;
env.publicKey = 'VXtwHUsfbcM0kkCL78MaV57cZEbgWlzxn6wL4/0z4l4=';
env.privateKey = 'tCpBwhsoR6hY9Tckw/4aI1CoxAG10Mka2EY9+XNYNchVe3AdSx9twzSSQIvvwxpXntxkRuBaXPGfrAvj/TPiXg==';
