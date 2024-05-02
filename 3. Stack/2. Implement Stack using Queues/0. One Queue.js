class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    return this.front.val;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const dequeued = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;

    return dequeued.val;
  }
}

class MyStack {
  constructor() {
    this.queue = new MyQueue();
  }

  empty() {
    return this.queue.length === 0;
  }

  //* Enqueue the element
  //* Then reverse the queue since a stack exits the other way
  push(x) {
    const size = this.queue.length;
    this.queue.enqueue(x);

    for (let i = 0; i < size; i++) {
      this.queue.enqueue(this.queue.dequeue());
    }

    return x;
  }

  pop() {
    return this.queue.dequeue();
  }

  top() {
    return this.queue.front.val;
  }
}

const stack = new MyStack();

console.log(stack.push(1));
console.log(stack.push(2));
console.log(stack.top());
console.log(stack.pop());
console.log(stack.empty());
