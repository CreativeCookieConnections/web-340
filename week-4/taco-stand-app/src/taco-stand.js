/**
 * Author: Aisha Keller
 * Date: 11/16/2025
 * File Name: taco-stand.js
 * Description: This file contains the implementation of the TacoStandEmitter class that extends EventEmitter to handle taco stand events.
 */

const EventEmitter = require("events");

class TacoStandEmitter extends EventEmitter {
  constructor() {
    super();
  }

  serveCustomer(customer) {
    this.emit("serve", customer);
  }

  prepareTaco(order) {
    this.emit("prepare", order);
  }

  handleRush(rush) {
    this.emit("rush", rush);
  }
}

module.exports = TacoStandEmitter;
