//* We need to design a stack that supports the following operations:
//*     - Push
//*     - Pop (don't return the element)
//*     - Top (peek)
//*     - getMin (gets the minimum element in the stack)
//* So ultimately, we need a way to retrieve the TOP element and also the MINIMUM element
//* Naturally, this involves tracking whatever the minimum currently is
//! We could use a Min Heap (Priority Queue) to track the minimum element, but this is inefficient
//*     - One of the constraints is that each operation must have a time complexity of O(1)
//* Ideally, we don't use a separate data structure just to handle the tracking of the minimum
//* We can track the minimum within the stack itself
//* Whenever we find a value <= current min, push it to the stack (as an extra element)
//* Then, push whatever the new value is supposed to be
//* That way, if the popped element happens to be the current minimum
//*     - We can set the "new" minimum to the NEXT element
//*     - In other words, we pop twice
//! Essentially, whenever we find a new minimum, we push the old minimum AND the new minimum
//* And when the new minimum is removed, this allows us to easily determine what the previous minimum was (before the new one)
class MinStack {
  #min;
  #stack;

  constructor() {
    this.#min = Infinity;
    this.#stack = [];
  }

  push(val) {
    if (val <= this.#min) {
      this.#stack.push(this.#min); //* Push the current minimum
      this.#min = val; //* Now we have a new minimum
    }

    this.#stack.push(val);
  }

  pop() {
    const popped = this.#stack.pop();

    //* The current minimum was removed, so now we need the previous min
    if (popped === this.#min) {
      this.#min = this.#stack.pop();
    }
  }

  top() {
    return this.#stack[this.#stack.length - 1];
  }

  getMin() {
    return this.#min;
  }
}
