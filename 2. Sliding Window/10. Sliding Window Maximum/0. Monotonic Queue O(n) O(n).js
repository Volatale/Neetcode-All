class ListNode {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class Deque {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  getValues() {
    const values = [];

    let curr = this.head;

    while (curr !== null) {
      values.push(curr.val);
      curr = curr.next;
    }

    return values;
  }

  size() {
    return this.length;
  }

  getHead() {
    if (this.head === null) {
      throw new Error("Deque is empty");
    }

    return this.head.val;
  }

  getTail() {
    if (this.tail === null) {
      throw new Error("Deque is empty");
    }

    return this.tail.val;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.head && this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this.length;
  }

  enqueueLeft(val) {
    const newNode = new ListNode(val);

    if (this.length === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.head && this.tail) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.head === null || this.tail === null) {
      throw new Error("Deque is empty");
    }

    const dequeued = this.head;

    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return dequeued.val;
  }

  pop() {
    if (this.head === null || this.tail === null) return undefined;

    const popped = this.tail;

    if (this.tail.prev === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return popped.val;
  }
}

//* Use a monotonically decreasing queue
//* The leftmost element is the LARGEST
//* The rightmost element is the SMALLEST
//* While the current element is LARGER than the "top" of the queue (right)
//* Keep popping elements, this ensures that we remove the minimum elements
//* If i - k + 1 >= 0, then the window size is "k"
//* Push the leftmost element to the window
//* Then, check if the leftmost element is the current element matches the start of the window
//* Then popleft.
//* With the while loop, and the last if statement, we ensure that the leftmost is ALWAYS the largest
function slidingWindowMax(nums, k) {
  //* Monotonically Decreasing Queue
  const deque = new Deque();

  const results = [];

  for (let i = 0; i < nums.length; i++) {
    //* Repeatedly elements that are LESS than what we want to add
    while (deque.size() > 0 && nums[i] > deque.getTail()) {
      deque.pop();
    }

    //* Add the current element to the right (tail)
    deque.enqueue(nums[i]);

    //* If the window size is "k"
    if (i - k + 1 >= 0) {
      //* The leftmost element (head) is the maximum
      results.push(deque.getHead());

      //* If the head matches the start of the window element
      //* Dequeue, because it is leaving the window
      if (nums[i - k + 1] === deque.getHead()) {
        deque.dequeue();
      }
    }
  }

  return results;
}

console.log(slidingWindowMax([8, 7, 6, 7], 2)); //* [8, 7, 7]
console.log(slidingWindowMax([1, 1, 1, 1, 1, 4, 5], 6)); //* [4, 5]
console.log(slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)); //* [3, 3, 5, 5, 6, 7]
