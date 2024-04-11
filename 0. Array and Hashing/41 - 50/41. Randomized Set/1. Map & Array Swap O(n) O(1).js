class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }

  insert(val) {
    if (!this.map.has(val)) {
      this.map.set(val, this.list.length);
      this.list.push(val);
      return true;
    }

    return false;
  }

  remove(val) {
    if (this.map.has(val)) {
      const length = this.list.length - 1;
      const index = this.map.get(val);

      const lastValue = this.list[length];

      //* Swap the last first and last
      [this.list[length], this.list[index]] = [
        this.list[index],
        this.list[length],
      ];

      this.list.pop(); //* We can now pop in O(1) time since it has been moved to the end
      this.map.set(lastValue, index); //* Update reference in map to new location
      this.map.delete(val); //* Remove what we were supposed to from map

      return true;
    }

    return false;
  }

  getRandom() {
    const index = Math.floor(Math.random() * this.list.length);
    return this.list[index];
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
