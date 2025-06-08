class ListNode {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class MyDeque {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  getValues() {
    if (this.length === 0) return [];

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
      return undefined;
    }

    return this.head.val;
  }

  getTail() {
    if (this.tail === null) {
      return undefined;
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
      return undefined;
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
    if (this.head === null || this.tail === null) {
      return undefined;
    }

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

//* We are given an int[], and there is a sliding window of size `k` moving from left to right
//* Since the window size is `k`, we can only see `k` numbers in the window
//* "Max sliding window" really means "return an array of the maximum value in each window of size k"
//* Since we potentially require a range of values, we can't just use a regular sliding window
//! The same `max` value in a window could potentially be used over a range of indices
//* So it is not as simple as just tracking the current max
//* If the current max is leaving the window, then we need to use a previous max, or the current value
//* Since we need to retain all possible valid elements, we can use a monotonic queue
//* The leftmost element will be considered the "maximum" in the window
//* At the very start of each iteration, we remove all of the elements whose value is < nums[i]
//*     - Why? Those values are going to be removed earlier, and they are also useless if they are smaller
//* If the leftmost element is going to be leaving the window (nums[i - k + 1] === head)
//*     - Then we need to dequeue the leftmost element (deque.dequeue)
function maxSlidingWindow(nums, k) {
  //* Monotonically non-increasing deque
  const deque = new MyDeque();
  const results = [];

  for (let i = 0; i < nums.length; i++) {
    //* Remove all of the elements that are less than nums[i] (we want the maximum)
    while (deque.size() > 0 && nums[i] > deque.getTail()) {
      deque.pop();
    }

    //* Add the current element to the right (tail). Can't add to left because it might NOT be larger
    deque.enqueue(nums[i]);

    //* If the window size is "k", then we can begin processing windows
    if (i - k + 1 >= 0) {
      //* The leftmost element is the maximum
      results.push(deque.getHead());

      //* If the head matches the start of the window, dequeue (it is leaving the window)
      if (nums[i - k + 1] === deque.getHead()) {
        deque.dequeue();
      }
    }
  }

  return results;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); //* [3, 3, 5, 5, 6, 7]
console.log(maxSlidingWindow([1, 2, 3], 1)); //* [1, 2, 3]
console.log(maxSlidingWindow([1, 3, -1], 3)); //* [3]

//* Time: O(n * k) - There are "n" elements, and we are doing "k" iterations within each outer loop iteration

//* Space: O(n) - The memory usage scales with the input size
//* However, if we do not consider the output memory usage to be part of the space complexity, then it is O(1) space
