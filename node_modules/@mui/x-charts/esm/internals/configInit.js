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
export const cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType('bar');
cartesianSeriesTypes.addType('line');
cartesianSeriesTypes.addType('scatter');