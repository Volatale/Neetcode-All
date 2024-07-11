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

//* Use BFS since we essentially want to find the SHORTEST PATH to target
//* Start at 0000 and travel to target
//* We can move each dial up 1 and down one each move
//* So for each lock, there are 8 different neighbor locks
//* If we HAVEN'T visited that neighbor
//* Enqueue it [neighbor, moves + 1]
//* Track the current neighbor and the moves within each state
//* We CANNOT use "moves" variable and increment each while loop iteration
//* Each lock may go to a dead end so we can't do it that way
function openTheLock(deadends, target) {
  const visited = new Set(deadends);

  //* Impossible to move from here; already at dead end
  if (visited.has("0000")) return -1;

  //* [lock, moves]
  const queue = new MyQueue([["0000", 0]]);

  while (!queue.isEmpty()) {
    const [lock, moves] = queue.dequeue();

    //* Base Case; reached the target
    if (lock === target) return moves;

    //* Check the neighbors
    for (let neighbor of getNeighbors(lock)) {
      if (!visited.has(neighbor)) {
        queue.enqueue([neighbor, moves + 1]);
        visited.add(neighbor);
      }
    }
  }

  //* Unable to make it to target
  return -1;
}

//* O(1) time since there are always 4 iterations
//* O(32) -> O(1) space; we ALWAYS create 8 substrings of 4 length
//* We ALWAYS create substrings of 4 length in each iteration
function getNeighbors(lock) {
  //* Stores each wheel modification
  const results = [];

  for (let i = 0; i < 4; i++) {
    const addOne = String((Number(lock[i]) + 1) % 10); //* Add 1 to current lock[i]
    const subOne = String((Number(lock[i]) - 1 + 10) % 10); //* Subtract 1 from lock[i]

    //* Create a substring with the ith char replaced by the +1 and -1
    results.push(lock.substring(0, i) + addOne + lock.substring(i + 1));
    results.push(lock.substring(0, i) + subOne + lock.substring(i + 1));
  }

  return results;
}

console.log(openTheLock(["0201", "0101", "0102", "1212", "2002"], "0202"));
console.log(openTheLock(["8888"], "0009"));
console.log(
  openTheLock(
    ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
    "8888"
  )
);

//* Time: O(10^4) - There are 10^4 possible combinations of locks (from 0000 to 9999)
//* There are 4 wheels and each has 10 possibilities (10 * 10 * 10 * 10)
//* getNeighbors takes O(1) since there are ALWAYS 8 generated neighbors from each lock
//* In the worst case we explore all 10^4 combinations

//* Space: O(10^4) - The visited set may contain all 10^4 possibilities
//* The queue scales depending on the number of elements still in the queue
//* But in the worst case is 10^4 / branching factor
