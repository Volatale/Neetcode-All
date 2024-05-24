class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyCircularQueue {
  constructor(k) {
    this.front = null;
    this.back = null;
    this.maxSize = k;
    this.size = 0;
  }

  Front() {
    if (this.size === 0) return -1;

    return this.front.val;
  }

  Rear() {
    if (this.size === 0) return -1;

    return this.back.val;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  enQueue(value) {
    if (this.size === this.maxSize) return false;

    const newNode = new ListNode(value);

    if (this.size === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    //* Create the circular link
    this.back.next = this.front;
    this.size++;

    return true;
  }

  deQueue() {
    if (this.size === 0) return false;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;

      //* We lost the reference to the OLD head, get the NEW one
      this.back.next = this.front;
    }

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
