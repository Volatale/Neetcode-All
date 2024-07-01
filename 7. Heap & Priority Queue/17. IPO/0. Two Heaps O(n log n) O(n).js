class MyPriorityQueue {
  constructor(values = [], func = (a, b) => a - b) {
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

  getValues() {
    return this.heap;
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
      let swapIndex = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

//* We want to see the SMALLER capital projects first
//* And once we have seen them, we want to choose the projects with HIGHER profits
//* So it is a good idea to use two different priority queues
//* pqCapital compares based on the capitals (min heap)
//* pqProfits compares based on the profits (max heap)
function maximizeProfit(k, w, profits, capital) {
  const pqCapital = new MyPriorityQueue([], (a, b) => a[1] - b[1]); //* Min Heap
  const pqProfits = new MyPriorityQueue([], (a, b) => b[0] - a[0]); //* Max Heap

  //* Enqueue all of the projects to the capital
  for (let i = 0; i < profits.length; i++) {
    pqCapital.enqueue([profits[i], capital[i]]);
  }

  //* Choose "k" projects
  for (let i = 0; i < k; i++) {
    //* Add ALL of the "valid" projects to the profits pq
    //* We prioritize the HIGHEST profit projects out of the valid ones
    while (!pqCapital.isEmpty() && pqCapital.peek()[1] <= w) {
      pqProfits.enqueue(pqCapital.dequeue());
    }

    //* There are no more projects to finish
    if (pqProfits.isEmpty()) break;

    //* Complete the project and receive the profits
    w += pqProfits.dequeue()[0];
  }

  return w;
}

console.log(maximizeProfit(2, 0, [1, 2, 3], [0, 1, 1])); //* 4
console.log(maximizeProfit(3, 0, [1, 2, 3], [0, 1, 2])); //* 6

//* Time: O(n log n) - We enqueue and dequeue every project in the worst case
//* Enqueuing and Deqeueing take O(log n) and we do this "n" times

//* Space: O(n) - Both priority queues store all "n" projects in the worst case
