//* We need to design a stack-like data structure
//*     - push() - pushes an element onto the stack
//*     - pop() - Removes and returns the most frequent element in the stack
//! In the event of a tie, we pop the MOST RECENT element
//* Based on this, we should use a stack as the underlying data structure
//* However, we also need a way to track the frequencies of elements
//* This is technically an online algorithm (we are given inputs over time since it is a class)
//* Thus, we don't know the maximum possible frequency at instantiation time
//* We can track the frequency of elements using a frequency map
//*     - Why? Because this is a stack, there could be multiple elements with tied frequency
//*     - We need a frequency count of every element simultaneously
//* One option we have is to use an array of arrays, where the outer "i" indicates the frequency of elements
//* So for example, take [[], [1, 2, 3], [1, 2]]
//*     - There are no elements with 0 occurrences, but 1, 2 and 3 exist at "1 occurrences" so far
//*     - Then, for "2 occurrences" we have 1 and 2
//* Therefore we can easily handle the "tie" case by simply popping the [i].pop() (which gives us 2)
//* In addition to both of these data structures, we can track the maximum frequency so far
//* Whenever we find a "new" maximum frequency, we can push a new "stack" (array) to the array
class FreqStack {
  #stack;
  #freq;
  #maxFreq;

  constructor() {
    this.#stack = {}; //* Frequency : Stack of elements that have this frequency
    this.#freq = {}; //* Frequency map
    this.#maxFreq = 0;
  }

  push(val) {
    //* Get the current count
    const count = (this.#freq[val] || 0) + 1;

    //* Add an occurrence of this value
    this.#freq[val] = count;

    //* Create another "stack" to hold the values of this frequency
    if (count > this.#maxFreq) {
      this.#maxFreq = count;
      this.#stack[count] = [];
    }

    this.#stack[count].push(val);
  }

  pop() {
    //* Pop the most frequent element
    const popped = this.#stack[this.#maxFreq].pop();

    //* Remove an occurrence of that element
    this.#freq[popped]--;

    //* If there are no more elements with this frequency, remove the stack
    if (this.#stack[this.#maxFreq].length === 0) {
      this.#stack[this.#maxFreq].pop();
      this.#maxFreq--;
    }

    return popped;
  }
}

const stack = new FreqStack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());
