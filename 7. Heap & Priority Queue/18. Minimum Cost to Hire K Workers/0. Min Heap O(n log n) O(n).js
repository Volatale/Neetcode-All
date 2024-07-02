class MyMaxHeap {
  constructor(values = [], func = (a, b) => b - a) {
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

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
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

//* We want to minimize the ratio to keep costs low
//* Find each worker's rate (wage[i] / quality[i])
//*     - This gives the unit of work per quality
//* Sort the workers by their rates in ascending order
//* We want to remove the LARGEST quality worker if size > k
//*     - Use a max heap for this purpose
//* If size === k, we have chosen "k" workers
//*     - totalCost = Math.min(totalCost, totalQuality * rate)
//*     - This is the rate of the CURRENT worker
//*         - Later workers will have a higher ratio, so the number is increasing
//*         - This keeps workers happy since they get "overpaid"
function minCostToHireKWorkers(quality, wage, k) {
  let totalCost = Infinity;
  let totalQuality = 0;

  //* Calculate the "actual" rate of each potential employee (the RATIO)
  //* Rate per unit of work = wages[i] / quality[i]
  const pairs = []; //* [quality, rate]
  for (let i = 0; i < quality.length; i++) {
    pairs.push([quality[i], wage[i] / quality[i]]);
  }

  //* Sort them based on the RATE in ascending order
  pairs.sort((a, b) => a[1] - b[1]);

  //* MaxHeap itself sorts based on quality in DESCENDING order
  const pq = new MyMaxHeap([], (a, b) => b - a);

  for (let [quality, rate] of pairs) {
    pq.enqueue(quality);
    totalQuality += quality;

    //* Remove the "highest quality" employee
    if (pq.size() > k) {
      totalQuality -= pq.dequeue();
    }

    //* If we have chosen "k" employees
    if (pq.size() === k) {
      totalCost = Math.min(totalCost, totalQuality * rate);
    }
  }

  return totalCost;
}

console.log(minCostToHireKWorkers([10, 20, 5], [70, 50, 30], 2));
console.log(minCostToHireKWorkers([3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3));
console.log(minCostToHireKWorkers([10, 20, 30], [5, 10, 15], 1));

//* Time: O(n log n) + O(n log k)
//* It takes O(n log n) to sort the workers
//* Enqueuing and Dequeuing take O(log k) since the PQ has (at most) k + 1 size

//* Space: O(n)
//* k <= n, so at worst, every worker's attributes are stored in the pq
//* Also, the sort itself could use O(n) space depending on the algorithm used
