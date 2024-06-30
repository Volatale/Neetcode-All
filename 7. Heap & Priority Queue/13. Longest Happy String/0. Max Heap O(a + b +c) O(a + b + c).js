class MaxHeap {
  constructor(values = [], func = (a, b) => a[1] - b[1]) {
    this.heap = values;
    this.func = func;
    this.heapify();
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.func(this.heap[parent], this.heap[i]) < 0) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);
    return popped;
  }

  sinkDown(i) {
    let length = this.heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let largest = i;

      if (
        leftChild < length &&
        this.func(this.heap[largest], this.heap[leftChild]) < 0
      ) {
        this.swap(largest, leftChild);
      }

      if (
        rightChild < length &&
        this.func(this.heap[largest], this.heap[rightChild]) < 0
      ) {
        this.swap(largest, rightChild);
      }

      if (i === largest) break;

      this.swap(i, largest);
      i = largest;
    }
  }
}

//* Always use the highest frequency character
//* If the last two added characters are the same as this one
//* Take the NEXT highest frequency character instead
//*     - If it doesn't exist, break out of the loop
//* After pushing the character to results
//*     - Enqueue the character back if the frequency > 0
function longestHappyString(a, b, c) {
  const results = [];
  const characters = [];

  //* Only include characters that have a frequency > 0
  for (let [char, count] of [
    ["a", a],
    ["b", b],
    ["c", c],
  ]) {
    if (count > 0) {
      characters.push([char, count]);
    }
  }

  const pq = new MaxHeap(characters);

  while (!pq.isEmpty()) {
    let [char, count] = pq.dequeue();

    //* If the last two characters added are the same as THIS character
    //* Get the SECOND most frequent character instead
    if (
      results.length > 1 &&
      results.at(-1) === char &&
      results.at(-2) === char
    ) {
      if (pq.isEmpty()) break; //* No second most common char to use instead

      let [char2, count2] = pq.dequeue();
      results.push(char2);
      count2--;

      //* If there are still more occurrences Enqueue the ORIGINAL character
      if (count2 > 0) {
        pq.enqueue([char2, count2]);
      }
    } else {
      //* We CAN add the most common character
      results.push(char);
      count--;
    }

    //* Only enqueue back if there are still occurrences
    if (count > 0) {
      pq.enqueue([char, count]);
    }
  }

  return results.join("");
}

console.log(longestHappyString(1, 1, 7)); //* "ccaccbcc"
console.log(longestHappyString(7, 1, 0)); //* "aabaa"

//* Time: O(a + b + c)
//* There are only 3 characters, and in the worst case they all have > 0 frequency
//* Heapifying takes O(1) since there are only 3 characters max
//* Enqueuing and Dequeuing take O(log 3) (effectively O(1))

//* Space: O(a + b + c)
//* There will only be 3 elements within the priority queue at max
