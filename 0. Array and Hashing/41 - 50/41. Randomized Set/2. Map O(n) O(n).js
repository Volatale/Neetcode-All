class RandomizedSet {
  constructor() {
    this.values = new Map();
  }

  insert(val) {
    if (!this.values.has(val)) {
      this.values.set(val, val);
      return true;
    }

    return false;
  }

  remove(val) {
    if (this.values.has(val)) {
      this.values.delete(val);
      return true;
    }

    return false;
  }

  getRandom() {
    const n = this.values.size;

    const randomKey = Math.floor(Math.random() * n);
    const keys = Array.from(this.values.keys());
    return this.values.get(keys[randomKey]);
  }
}

const randomizedSet = new RandomizedSet();

console.log(randomizedSet.insert(1)); //* true
console.log(randomizedSet.remove(2)); //* false
console.log(randomizedSet.insert(2)); //* true
console.log(randomizedSet.getRandom()); //* ?
console.log(randomizedSet.remove(1)); //* true
console.log(randomizedSet.insert(2)); //* false
console.log(randomizedSet.getRandom()); //* ?

//* Testing negatives
const setII = new RandomizedSet();

console.log(setII.insert(-1));
console.log(setII.getRandom());
