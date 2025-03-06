class MyListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

class MyDeque {
  #head = null;
  #tail = null;
  #length = 0;

  constructor(values = []) {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;

    for (let val of values) {
      this.push(val);
    }
  }

  isEmpty() {
    return this.#length === 0;
  }

  getSize() {
    return this.#length;
  }

  getValues() {
    const results = [];
    let curr = this.#head;

    while (curr !== null) {
      results.push(curr.val);
      curr = curr.next;
    }

    return results;
  }

  peek() {
    if (this.#length === 0) throw new Error("Deque is empty");
    return this.#tail.val;
  }

  peekLeft() {
    if (this.#length === 0) throw new Error("Deque is empty");
    return this.#head.val;
  }

  push(val) {
    const newNode = new MyListNode(val);

    if (this.#head === null && this.#tail === null) {
      this.#head = newNode;
      this.#tail = newNode;
    } else if (this.#head && this.#tail) {
      newNode.prev = this.#tail;
      this.#tail.next = newNode;
      this.#tail = newNode;
    }

    this.#length++;
    return this.#length;
  }

  pushLeft(val) {
    const newNode = new MyListNode(val);

    if (this.#head === null && this.#tail === null) {
      this.#head = newNode;
      this.#tail = newNode;
    } else if (this.#head && this.#tail) {
      newNode.next = this.#head;
      this.#head.prev = newNode;
      this.#head = newNode;
    }

    this.#length++;
    return this.#length;
  }

  pop() {
    if (this.#head === null || this.#tail === null) {
      throw new Error("Deque is empty.");
    }

    const dequeued = this.#tail;

    if (this.#tail.prev === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }

    this.#length--;
    return dequeued.val;
  }

  popLeft() {
    if (this.#head === null || this.#tail === null) {
      throw new Error("Deque is empty.");
    }

    const dequeued = this.#head;

    if (this.#head.next === null) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }

    this.#length--;
    return dequeued.val;
  }
}

//* At first, it seems like a regular fixed-size sliding window will work
//* But since we need to get the maximum value within EVERY window, that becomes a problem
//* Generally speaking, we'd use a variable to track what the current max is
//* But this only works when we consider the entire array as a whole
//*     - For example, if we had to track the maximum when considering the entire array
//*     - But of course, in that case you wouldn't even need a sliding window
//* There are (n - k + 1) sliding windows in the nums array
//*     - Thus, we can also say there are (n - k + 1) maximum values
//* We can't use a single variable to track all of the possible maximums that exist in the array
//* Instead, we need to handle this another way
//* The same value could be the maximum for MULTIPLE different windows
//* So we need to retain values somehow, but also exclude useless values
//* We can use a Monotonically decreasing Deque
//*     - The leftmost element in the Deque is the current MAXIMUM value that exists in the window
//*     - Thus, any element further to the right is SMALLER
//! At the start of each iteration, we remove any element from the Deque that is < nums[i]
//*     - Why? Because that indicates that nums[i] is a new maximum
//*     - So we want to remove all of the SMALLER elements to ensure that the leftmost is the maximum
//* If nums[i] < the current max (deque.peekLeft()), then just add it to the right
//*     - We already know it is smaller, so it isn't interfering with anything
//* If the window size is "k", then we need to push the current maximum to the results array
//*     - results.push(deque.peekLeft()) gives us the current maximum
//!     - Note that we don't REMOVE the element because there is a chance it could be used again
//* If nums[i - k + 1] === deque.peekLeft()
//!     - This indicates that our current maximum is LEAVING the window
//*     - So we need to remove it from the Deque (deque.popLeft())
//* Essentially, the Deque is used to ensure we have fast access to the MAXIMUM value in the window
//*     - When the current maximum is LEAVING the window, we remove it from the Deque
function maxSlidingWindow(nums, k) {
  //* Monotonically decreasing deque -> The LEFTMOST element is the maximum
  const deque = new MyDeque();

  //* There are n - k + 1 windows, thus result.length = n - k + 1
  const results = [];

  for (let i = 0; i < nums.length; i++) {
    //* We have a new max, so remove all elements < nums[i] from the Deque
    while (!deque.isEmpty() && deque.peek() < nums[i]) {
      deque.pop(); //* Elements on rightside are smaller
    }

    //* Current element is added to the window
    deque.push(nums[i]);

    //* If there are "k" elements in the window
    if (i - k + 1 >= 0) {
      results.push(deque.peekLeft()); //* Push the maximum value in the window

      //* If nums[i - k + 1] === peekLeft(), then our current max is LEAVING the window
      if (nums[i - k + 1] === deque.peekLeft()) {
        deque.popLeft();
      }
    }
  }

  return results;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); //* [3, 3, 5, 5, 6, 7]
console.log(maxSlidingWindow([1], 1)); //* [1]
console.log(maxSlidingWindow([7, 4, 6, 5], 3)); //* [7, 6]
console.log(maxSlidingWindow([1, 1, 1, 1], 3)); //* [1, 1]
console.log(maxSlidingWindow([7, 4, 9, 6], 2)); //* [7, 9, 9]

//* Time: O(n) - We have to iterate over every element in the array
//* So the time taken scales with the input size

//* Space: O(k) - The deque stores at most "k" elements
