class StockSpanner {
  constructor() {
    //* We need to retroactively
    this.stack = [];
  }

  //* Previous Smaller Element
  next(price) {
    //* The current day counts as a day
    let span = 1;

    while (
      this.stack.length > 0 &&
      price >= this.stack[this.stack.length - 1][1] //* Current price >= top of stack's price
    ) {
      //* Increase span by the popped[0] amount since we can avoid redoing work
      span += this.stack.pop()[0];
    }

    //* This allows us to use the previous results without having to recalculate
    this.stack.push([span, price]);

    return span;
  }
}

const stockSpanner = new StockSpanner();
console.log(stockSpanner.next(100));
console.log(stockSpanner.next(80));
console.log(stockSpanner.next(60));
console.log(stockSpanner.next(70));
console.log(stockSpanner.next(60));
console.log(stockSpanner.next(75));
console.log(stockSpanner.next(85));
