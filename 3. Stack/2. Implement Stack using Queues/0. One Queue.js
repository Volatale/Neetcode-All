class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* We can simulate a Stack using a Queue by simply reversing the Queue itself
//* A stack is technically just a reversed queue, and a queue is a reversed stack
//* So doing an explicit reversal essentially just gives you the other
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

    if (this.front === null && this.back === null) {
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

    const front = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;
    return front.val;
  }
}

class MyStack {
  #queue;

  constructor() {
    this.#queue = new MyQueue();
  }

  empty() {
    return this.#queue.length === 0;
  }

  push(x) {
    const size = this.#queue.length;
    this.#queue.enqueue(x);

    //* Reverse the queue (to simulate the stack)
    for (let i = 0; i < size; i++) {
      this.#queue.enqueue(this.#queue.dequeue());
    }

    return x;
  }

  top() {
    return this.#queue.peek();
  }

  pop() {
    return this.#queue.dequeue();
  }
}

const stack = new MyStack();

console.log(stack.push(1));
console.log(stack.push(2));
console.log(stack.top());
console.log(stack.top());
console.log(stack.empty());
