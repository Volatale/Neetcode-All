class MinHeap {
  constructor(values = [], func = (a, b) => a - b) {
    this.heap = values;
    this.func = func;
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

    while (i !== 0 && this.func(this.heap[i], this.heap[parent]) < 0) {
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
      let smallest = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[smallest]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[smallest]) < 0
      ) {
        smallest = rightChild;
      }

      if (i === smallest) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

//! Won't accept on leetcode, off by 1 error for some weird reason
//! Works in other languages
//* Pair the engineer's attributes in a tuple (speed, efficiency)
//* Sort the engineers based on their efficiency in DESCENDING order
//*     - Ensure the engineers with high efficiency are up first
//*     - This allows us to maximize the minimum efficiency up front
//* Iterate over all of the engineers, adding their speed (for the sum)
//* If the number of chosen engineers > k (pq.size() > k)
//* Remove the speed of the slowest engineer (min heap gives us the slowest on top)
//* If we have chosen "k" engineers (pq.size() === k)
//*     - Try to find a new maximum performance
//*     - currPerformance * efficiency
function maxPerformanceOfTeam(n, speed, efficiency, k) {
  const pq = new MinHeap(); //* Represents the chosen engineers
  const engineers = [];

  //* Pair the engineer's attributes
  for (let i = 0; i < n; i++) {
    engineers.push([speed[i], efficiency[i]]);
  }

  //* Sort in DESCENDING ORDER based on the efficiency
  engineers.sort((a, b) => b[1] - a[1]);

  let maxPerformance = 0;
  let currPerformance = 0;

  //* Iterate over every engineer
  for (let [speed, efficiency] of engineers) {
    currPerformance += speed;
    pq.enqueue(speed);

    //* Remove the lowest speed engineer from the team
    if (pq.size() > k) {
      currPerformance -= pq.dequeue();
    }

    //* Calculate the perormance of the current team
    maxPerformance = Math.max(maxPerformance, currPerformance * efficiency);
  }

  return maxPerformance % (10 ** 9 + 7);
}

console.log(
  maxPerformanceOfTeam(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 2)
); //* 60

console.log(
  maxPerformanceOfTeam(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 3)
); //* 68

console.log(
  maxPerformanceOfTeam(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 4)
); //* 72

console.log(maxPerformanceOfTeam(3, [2, 8, 2], [2, 7, 1], 2)); //* 20

//* Time: O(n log n) - We do "n" enqueues and dequeues in the worst case
//* Each takes O(log n) time and we do this "n" times

//* Space: O(n) - In the worst case we store every engineer's speed in the pq
