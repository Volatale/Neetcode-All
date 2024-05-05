class FreqStack {
  constructor() {
    this.freqMap = {}; //* Track the frequency of each number
    this.stack = {}; //* frequency : stack of elements that have this frequency
    this.maxFreq = 0; //* Highest frequency element
  }

  push(val) {
    //* Get the current count, and then add THIS new addition
    const count = (this.freqMap[val] || 0) + 1;

    this.freqMap[val] = count; //* Add an occurrence of this number

    if (count > this.maxFreq) {
      this.maxFreq = count; //* Found a new best
      this.stack[count] = []; //* Create a new stack for numbers of this new frequency
    }

    this.stack[count].push(val);
  }

  pop() {
    //* Pop the most frequent element
    const popped = this.stack[this.maxFreq].pop();

    //* Remove an occurrence of that element from the freqmap
    this.freqMap[popped]--;

    //* If there are no more elements with the max frequency
    if (this.stack[this.maxFreq].length === 0) {
      delete this.stack[this.maxFreq];
      this.maxFreq--; //* Since we popped, we now have 1 less of the popped element
    }

    return popped;
  }
}

const stack = new FreqStack();

stack.push(5);
stack.push(7);
stack.push(5);
stack.push(7);
stack.push(4);
stack.push(5);
console.log(stack.pop()); //* 5
console.log(stack.pop()); //* 7
console.log(stack.pop()); //* 5
console.log(stack.pop()); //* 4
