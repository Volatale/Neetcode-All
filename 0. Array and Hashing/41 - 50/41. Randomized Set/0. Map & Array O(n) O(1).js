class RandomizedSet {
  constructor() {
    this.map = new Map(); //* ValueAt : Index
    this.values = []; //* Maps don't have indices; so we can't just lookup a random key
  }

  //* O(1)
  insert(val) {
    if (!this.map.has(val)) {
      this.map.set(val, this.values.length); //* The value = the last index
      this.values.push(val);
      return true;
    }

    return false;
  }

  //* O(1)
  remove(val) {
    if (this.map.has(val)) {
      const index = this.map.get(val); //* Index the value is being stored at
      const lastVal = this.values[this.values.length - 1];

      this.values[index] = lastVal; //* Move the value over (essentially overwriting since it is useless now)
      this.values.pop(); //* We no longer need it
      this.map.set(lastVal, index); //* Map needs to update its value to point to a new index
      this.map.delete(val);
      return true;
    }

    return false;
  }

  //* O(1)
  getRandom() {
    const index = Math.floor(Math.random() * this.values.length);
    return this.values[index];
  }
}

const randomizedSet = new RandomizedSet();

console.log(randomizedSet.insert(1)); //* true
console.log(randomizedSet.remove(2)); //* false
console.log(randomizedSet.insert(2)); //* true
console.log(randomizedSet.getRandom()); //* ?
debugger;

console.log(randomizedSet.remove(1)); //* true
console.log(randomizedSet.insert(2)); //* false
console.log(randomizedSet.getRandom()); //* ?

//* Testing negatives
const setII = new RandomizedSet();

console.log(setII.insert(-1));
console.log(setII.getRandom());
