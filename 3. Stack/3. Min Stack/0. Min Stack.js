class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyStack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  empty() {
    return this.length === 0;
  }

  peek() {
    return this.top.val;
  }

  push(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }

    this.length++;
    return this.length;
  }

  pop() {
    if (this.length === 0) return;

    const popped = this.top;

    if (this.length === 1) {
      this.top = null;
      this.bottom = null;
    } else {
      this.top = this.top.next;
    }

    this.length--;
    return popped.val;
  }
}

class MinStack {
  constructor() {
    this.min = Infinity;
    this.stack = new MyStack();
  }

  //* If val <= min, push the CURRENT min onto the stack
  //* This ensures that if we pop the min, we have an immediate reference to the PREVIOUS minimum
  //* [Inf, 5], min = 5, then push 2, [Inf, 5, 5, 2]. Min = 2
  //* Popping 2 puts 5 on top of the stack, then we pop that too
  push(val) {
    if (val <= this.min) {
      this.stack.push(this.min); //* Add the PREVIOUS min to the stack
      this.min = val;
    }

    this.stack.push(val);
  }

  //* If you just found a new minimu, the previous minimum is always right underneath the top
  //* So we have to pop 2
  pop() {
    if (this.stack.pop() === this.min) this.min = this.stack.pop();
  }

  top() {
    return this.stack.peek();
  }

  getMin() {
    return this.min;
  }
}

const minStack = new MinStack();

minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); //* -3
minStack.pop();
console.log(minStack.top()); //* 0
console.log(minStack.getMin()); //* -2
