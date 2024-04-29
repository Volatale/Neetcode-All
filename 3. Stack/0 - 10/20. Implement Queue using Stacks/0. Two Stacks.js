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
    if (this.length === 0) return undefined;

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

class MyQueue {
  constructor() {
    this.stack1 = new MyStack();
    this.stack2 = new MyStack();
  }

  //* BOTH stacks have to be empty
  empty() {
    return this.stack1.empty() && this.stack2.empty();
  }

  //* Transfer when we need to peek
  //* Since a stack is the wrong way around vs a queue
  peek() {
    this.transfer();
    return this.stack2.peek();
  }

  //* Push to stack1
  push(val) {
    return this.stack1.push(val);
  }

  //* When we need to pop, transfer everything to stack2
  //* But only if the length of stack2 === 0
  //* Otherwise we end up changing the order of the stack
  pop() {
    this.transfer();
    return this.stack2.pop();
  }

  //* If you have [1, 2, 3], and [4, 5]
  //* You can't put the left on top of the right
  //* Or you end up with [4, 5, 1, 2, 3], but that is not what we want
  //* So you can ONLY transfer when stack2.length === 0 to ensure correct order
  transfer() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
  }
}

const queue = new MyQueue();

queue.push(1);
queue.push(2);
console.log(queue.peek()); //* 1
console.log(queue.pop()); //* 1
console.log(queue.empty()); //* False
