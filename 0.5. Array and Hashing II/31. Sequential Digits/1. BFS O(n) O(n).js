class ListNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class MyQueue {
  #length = 0;

  constructor(values = []) {
    this.front = new ListNode();
    this.back = new ListNode();
    this.#length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.#length === 0;
  }

  size() {
    return this.#length;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.#length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.#length++;
    return this.#length;
  }

  dequeue() {
    if (this.#length === 0) return undefined;

    const front = this.front;

    if (this.#length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.#length--;
    return front.val;
  }
}

//* We can ONLY add numbers within the boundary
//* Thus, we should determine how many digits exist in both low and high
//*     - Any number that has a SMALLER amount of digits than low
//*     - Or, a larger amount of digits than high is invalid
//* We can try to form literally every possibility using BFS and a queue
//* Dequeue each number, multiply it by 10 and add 1 to whatever the previous number was
//*     - This is how we can simulate the add 1
//* If this number is still within the boundary, we can enqueue it back
//! Using a stack instead of a queue would give us a result that is NOT sorted
//! Also, if the ones place is 9, we can't enqueue the next number
//*     - 9 is followed by 0 (in terms of place value)
//*     - But 0 !== (9 + 1), because that gives us 10
//*         - So for example, if we have 9, then the next number is 10
//*         - But 10 is NOT a valid digit
function sequentialDigits(low, high) {
  const result = [];
  const queue = new MyQueue([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  //* Perform a BFS and try to form every number
  while (!queue.isEmpty()) {
    let number = queue.dequeue();

    //* Number is out of bounds
    if (number > high) continue;

    //* Found a sequential number
    if (low <= number && number <= high) {
      result.push(number);
    }

    const ones = number % 10;

    //* 9 is followed by 0, but 0 !== (9 + 1), so skip
    if (ones < 9) {
      queue.enqueue(number * 10 + (ones + 1));
    }
  }

  return result;
}

console.log(sequentialDigits(100, 300));
console.log(sequentialDigits(1000, 13000));
console.log(sequentialDigits(100, 123));

//* Time: O(n) - We are bounded by the number of digits (10), which is constant

//* Space: O(n) - Also bounded by the number of digits
