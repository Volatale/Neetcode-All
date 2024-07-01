class MyMinHeap {
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

function findLeastNumOfUniqueElements(arr, k) {
  const freqMap = new Map();
  const pq = new MyMinHeap([], (a, b) => a[1] - b[1]);

  //* Get the frequency of each number
  for (let i = 0; i < arr.length; i++) {
    freqMap.set(arr[i], (freqMap.get(arr[i]) || 0) + 1);
  }

  //* Add every element to the min heap
  for (let [num, freq] of freqMap) {
    pq.enqueue([num, freq]);
  }

  //* Remove "k" occurrences of the least frequent elements (in total)
  for (let i = 0; i < k; i++) {
    const [num, freq] = pq.dequeue();

    //* This number still has more occurrences, so keep processing it
    if (freq > 1) {
      pq.enqueue([num, freq - 1]);
    }
  }

  return pq.size();
}

console.log(findLeastNumOfUniqueElements([5, 5, 4], 1)); //* 1
console.log(findLeastNumOfUniqueElements([4, 3, 1, 1, 3, 3, 2], 3)); //* 2
console.log(findLeastNumOfUniqueElements([4], 1)); //* 0
console.log(findLeastNumOfUniqueElements([6, 6], 1)); //* 1
console.log(findLeastNumOfUniqueElements([1, 1, 1], 0)); //* 1
console.log(findLeastNumOfUniqueElements([2, 1, 1, 3, 3, 3], 3)); //* 1

//* Time: O(n log n)
//* There are "n" elements in the array
//* There are "m" unique elements (k <= n) (m <= n)
//* It takes O(n) to get the frequency of every element
//* Enqueuing and Dequeing from the priority queue is O(log m)

//* Space: O(n) - In the worst case, every element is unique
//* That means both the frequency map AND the pq hold "n" elements each
