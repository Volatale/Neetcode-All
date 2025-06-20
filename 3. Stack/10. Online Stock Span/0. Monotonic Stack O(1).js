//* The goal is to return the "stock span" for every day
//* The "stock span" is the no. of PREVIOUSLY consecutive days that the price is <= current price
//* This happens to be an online algorithm, so we don't have all of the necessary data immediately
//* So we need a data structure that can keep track of the previous days
//* We are essentially looking for the NGE (or equal) element for every value
//*     - Thus, the same NGE can be reused for all of the previously found values
//*     - That is, the ones that are in the data structure
//* To find the next greater element of something, we can use a Stack ADT
//* When we find an NGE, we pop the stack and perform (i - stack.pop())
//*     - "i" is the current index and stack.pop() is some previous day we need the NGE for
//*     - So (5 - 3) would mean the stock span for that day is 2
//* Essentially, the stack holds all of the days we need a stock span for
//* Store pairs of [span, price] to avoid recalculating previous spans
//* Then add the span result of the top element to the current span
//! If we don't do this, we still end up needing to iterate backwards for every index
//*     - Which could still end up being O(n^2) in the worst case
class StockSpanner {
  #stack;

  constructor() {
    //* Stores tuples of [span, price]
    this.#stack = [];
  }

  next(price) {
    //* Price of current day
    let span = 1;

    while (
      //* Check if this is the NGE for the top of the stack (price >= top price)
      this.#stack.length > 0 &&
      price >= this.#stack[this.#stack.length - 1][1]
    ) {
      //* Increase span by the previous amount to avoid redoing work
      span += this.#stack.pop()[0];
    }

    //* Reuse the previous results without having to recalculate
    this.#stack.push([span, price]);
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

console.log("\nNext Stock Span");
const stockSpanII = new StockSpanner();
console.log(stockSpanII.next(1));
console.log(stockSpanII.next(2));
console.log(stockSpanII.next(3));
console.log(stockSpanII.next(1));
console.log(stockSpanII.next(2));
console.log(stockSpanII.next(3));
