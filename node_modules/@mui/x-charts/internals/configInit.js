"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartesianSeriesTypes = void 0;
let instance;
class CartesianSeriesTypes {
  constructor() {
    this.types = new Set();
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
}
const cartesianSeriesTypes = exports.cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType('bar');
cartesianSeriesTypes.addType('line');
cartesianSeriesTypes.addType('scatter');