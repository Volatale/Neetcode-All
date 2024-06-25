class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    const temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  peek() {
    if (this.length === 0) return;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    //* Compare the FREQUENCIES (index 1)
    while (i !== 0 && this.heap[i][1] < this.heap[parent][1]) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);
    return popped;
  }

  sinkDown(i) {
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    let length = this.heap.length;

    while (
      //* Compare the FREQUENCIES (index 1)
      (leftChild < length && this.heap[i][1] > this.heap[leftChild][1]) ||
      (rightChild < length && this.heap[i][1] > this.heap[rightChild][1])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][1] < this.heap[rightChild][1]
      ) {
        this.swap(i, leftChild);
        i = leftChild;
      } else {
        this.swap(i, rightChild);
        i = rightChild;
      }

      leftChild = 2 * i + 1;
      rightChild = 2 * i + 2;
    }
  }
}

function findLeastNumOfUniqueElements(arr, k) {
  const freqMap = new Map();
  const pq = new MinHeap();

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
