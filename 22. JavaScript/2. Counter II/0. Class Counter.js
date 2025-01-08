class Counter {
  constructor(init) {
    this.init = init;
    this.count = init;
  }

  increment() {
    this.count++;
    return this.count;
  }

  decrement() {
    this.count--;
    return this.count;
  }

  reset() {
    this.count = this.init;
  }
}
