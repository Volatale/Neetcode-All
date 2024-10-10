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

    for (const val of values) {
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
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
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

//* It is only possible to move from indices that hold a "0"
//* We are allowed to make jumps in the range [minJump, maxJump]
//*     - So in other words, the number of jumps we can make is bounded on both ends
//* We can apply BFS style logic
//*     - Start at index 0
//*     - Make a number of jumps ahead in the range [minJump, maxJump]
//*         - If s[i] == "1", we can't jump to it, so skip it
//*         - Otherwise, it has to be a "0", so enqueue it
//*             - If it is index n - 1, just return true (we made it to the end)
//* The queue at each level holds the indices we can reach
//* Instead of tracking visited nodes
//*     - We can opt to ONLY travel to indices we HAVEN'T reached yet
//*     - Track the maximum index we can reach so far
//* If curr + minJump < farthest
//*     - Then the indices < farthest are already in the queue
//*     - So don't bother revisiting them, it will just waste time
function canReach(s, minJump, maxJump) {
  //* It is impossible to make it to the end
  if (s[s.length - 1] === "1") return false;

  //* We start at index 0
  const queue = new MyQueue([0]);
  const n = s.length;
  let farthest = 0;

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    //* Only explore indices we haven't already been to
    //* Starting at farthest means indices < farthest are already in the queue
    for (
      let i = Math.max(curr + minJump, farthest + 1); //* +1 to avoid re-visiting s[farthest]
      i <= Math.min(curr + maxJump, n - 1); //* Stay in bounds
      i++
    ) {
      //* We are only allowed to move to "0" positions
      if (s[i] === "0") {
        queue.enqueue(i);
        if (i === n - 1) return true;
      }
    }

    //* Potentially find new max index we can reach
    farthest = Math.max(farthest, curr + maxJump);
  }

  //* Failed to reach last index
  return false;
}

console.log(canReach("011010", 2, 3)); //* True
console.log(canReach("01101110", 2, 3)); //* False
console.log(canReach("01110", 4, 4)); //* True
console.log(canReach("00000", 1, 1)); //* True
console.log(canReach("01", 1, 1)); //* False
console.log(canReach("011", 1, 2)); //* False
console.log(canReach("00000001", 1, 7)); //* False

//* Time: O(n) - We only process each node once since
//* So in the worst case (if min/max are both 1), we process every element once

//* Space: O(n) - The size of the queue is bounded by the number of elements
