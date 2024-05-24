class MyCircularQueue {
  constructor(k) {
    this.nums = new Array(k).fill(null);
    this.maxSize = k;
    this.front = 0; //* Start at index 0
    this.rear = -1; //* (-1 + 1) = 0, so (initially) start at index 0
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  Front() {
    if (this.isEmpty()) return -1;

    return this.nums[this.front];
  }

  Rear() {
    if (this.isEmpty()) return -1;

    return this.nums[this.rear];
  }

  enQueue(value) {
    if (this.isFull()) return false;

    //* The modulo helps us circle back around and stay within bounds
    this.rear = (this.rear + 1) % this.maxSize;
    this.nums[this.rear] = value;
    this.size++;

    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;

    //* Using the same modulo here
    this.front = (this.front + 1) % this.maxSize;
    this.size--;

    return true;
  }
}

const queue = new MyCircularQueue(3);
console.log(queue.enQueue(1)); //* True
console.log(queue.enQueue(2)); //* True
console.log(queue.enQueue(3)); //* True
console.log(queue.enQueue(4)); //* False
console.log(queue.Rear()); //* 3
console.log(queue.isFull()); //* True
console.log(queue.deQueue()); //* True
console.log(queue.enQueue(4)); //* True
console.log(queue.Rear()); //* 4

const queueII = new MyCircularQueue(6);
console.log(queueII.enQueue(6));
console.log(queueII.Rear()); //* 6
console.log(queueII.Rear()); //* 6
console.log(queueII.deQueue()); //* False
console.log(queueII.enQueue(5)); //* True
console.log(queueII.Rear(5)); //* -1
console.log(queueII.deQueue()); //* False
console.log(queueII.Front());
console.log(queueII.deQueue());
console.log(queueII.deQueue());
console.log(queueII.deQueue());
