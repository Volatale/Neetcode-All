class MyMaxHeap {
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
//* Sort projects based on their capital required (in ascending)
//* Then enqueue the "valid" projects to a maxHeap
function maximizeProfit(k, w, profits, capital) {
  const pqProfits = new MyMaxHeap([], (a, b) => b - a); //* Max Heap

  //* Enqueue all of the projects to the capital
  const projects = [];

  for (let i = 0; i < profits.length; i++) {
    projects.push([profits[i], capital[i]]);
  }

  //* Sort project based on the CAPITAL required (in ascending order)
  projects.sort((a, b) => a[1] - b[1]);

  let i = 0;

  //* Choose "k" projects
  while (k > 0) {
    //* Add ALL of the "valid" projects to the profits pq
    //* We prioritize the HIGHEST profit projects out of the valid ones
    while (i < projects.length && projects[i][1] <= w) {
      pqProfits.enqueue(projects[i][0]);
      i++;
    }

    //* There are no projects to finish
    if (pqProfits.isEmpty()) break;

    //* Complete the highest profit project and receive the profits
    w += pqProfits.dequeue();
    k--;
  }

  return w;
}

console.log(maximizeProfit(2, 0, [1, 2, 3], [0, 1, 1])); //* 4
console.log(maximizeProfit(3, 0, [1, 2, 3], [0, 1, 2])); //* 6

//* Time: O(n log n) - We enqueue and dequeue every project in the worst case
//* Enqueuing and Deqeueing take O(log n) and we do this "n" times

//* Space: O(n) - Both priority queues store all "n" projects in the worst case
