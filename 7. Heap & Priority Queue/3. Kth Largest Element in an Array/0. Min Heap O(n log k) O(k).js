class MinHeap {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    let temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  peek() {
    if (this.heap.length === 0) return;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.heap[i] < this.heap[parent]) {
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
      (leftChild < length && this.heap[i] > this.heap[leftChild]) ||
      this.heap[i] > this.heap[rightChild]
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild] < this.heap[rightChild]
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

//* Use a Min Heap
//* The min heap holds the K LARGEST ELEMENTS
//* If the size of the queue is === "k" and you try to enqueue
//* Compare the value you want to add vs the top of the queue
//* If "val" > peek(), we have a new "larger" element
//* And we are tracking the K LARGEST elements, so this works for us
//* We ensure that there are only ever "k" elements on the heap at once
function findKthLargest(nums, k) {
  //* Hold the top "k" elements within the min heap
  const pq = new MinHeap();

  for (let i = 0; i < nums.length; i++)
    //* Ensure there are ONLY "k" elements at once
    if (pq.size() < k) {
      pq.enqueue(nums[i]);
    } else if (nums[i] > pq.peek()) {
      //* When we find an element > peek(), replace that element
      pq.dequeue();
      pq.enqueue(nums[i]);
    }

  return pq.peek();
}

console.log(findKthLargest([1, 2, 3], 2)); //* 2
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); //* 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); //* 4
console.log(findKthLargest([5, -10], 1)); //* 5

//* Time: O(n log k) - It takes O(log k) to enqueue an element
//* The queue is limited to a size of "k"
//* It takes O(n) to iterate through the entire array
//* In the worst case, we enqueue every element

//* Space: O(k) - The size of the Min Heap is limited to "k"
