class MyListNode {
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

  size() {
    return this.length;
  }

  enqueue(val) {
    const newNode = new MyListNode(val);

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

//* Every time we dequeue:
//*     - Increment seconds
//*     - Decrement the value we dequeued
//* If k is 0 and the value is also 0
//*     - Then we can break out of the loop
//*     - Person "k" no longer needs to buy any tickets
//* If the number of tickets needed is > 0
//*     - Then we put this value at the back of teh queue
//* Else, the person no longer needs to buy more tickets, so leave them out of the queue
//* In order to track where the (original) "kth" person is, we simply cycle "k"
function timeRequiredToBuy(tickets, k) {
  const queue = new MyQueue(tickets);
  let seconds = 0;

  while (queue.length > 0) {
    //* Person at front buys ticket
    let ticketsNeeded = queue.dequeue();
    ticketsNeeded--;
    seconds++;

    //* Kth ticketsNeeded does not need to buy anymore tickets
    if (k === 0 && ticketsNeeded === 0) {
      break;
    }

    //* Person still needs more tickets, send to back of queue
    if (ticketsNeeded > 0) {
      queue.enqueue(ticketsNeeded);
    }

    //* Update position of "k" (to track kth person) through mutations
    k = k === 0 ? queue.length - 1 : k - 1;
  }

  return seconds;
}

console.log(timeRequiredToBuy([2, 3, 2], 2)); //* 6
console.log(timeRequiredToBuy([5, 1, 1, 1], 0)); //* 8
console.log(timeRequiredToBuy([3], 0)); //* 3
console.log(timeRequiredToBuy([1, 1, 1], 1)); //* 2
console.log(timeRequiredToBuy([4, 4, 4, 4, 3], 1)); //* 17
console.log(timeRequiredToBuy([84, 49, 5, 24, 70, 77, 87, 8], 3)); //* 154
console.log(timeRequiredToBuy([2, 3, 1], 1)); //* 6
console.log(timeRequiredToBuy([3, 2, 1], 0)); //* 6

//* Time: O(n) - We iterate through the array multiple times, but the number of times depends on the values
//* It takes O(1) to dequeue and enqueue since we are using an actual queue implementation

//* Space: O(n) - The queue scales with the input size (tickets.length)
