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
      (rightChild < length && this.heap[i] > this.heap[rightChild])
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

//* Use a min heap to store the "k" largest elements
//* We want to MAXIMIZE the second value
//* That results in a larger value overall
//* Get all of the pairs and sort them descending based on the SECOND value
//* Iterate over all of the pairs and add n1 to the sum
//* Push that value to the min heap
//*     - This value may be removed when size > k
//*     - Since this is a MIN heap, the value removed will decrease the sum by the smallest amount
//* If size > k, pop the top element and subtract that value
//* This removes it from the rolling sum and also results in the MINIMUM
//* If size === k, we can update maxScore
//* The "min" (n2) decreases each iteration, so just do Math.max(masScore, n1Sum * n2)
function maxScore(nums1, nums2, k) {
  const pairs = [];
  const pq = new MinHeap();

  let n1Sum = 0; //* Tracks the sum
  let maxScore = 0;

  //* Get all of the pairs (nums1[i], nums2[i])
  for (let i = 0; i < nums1.length; i++) {
    pairs.push([nums1[i], nums2[i]]);
  }

  //* This sorts based on the nums2 value IN DESCENDING ORDER
  //* The "minimum" will therefore always be decreasing
  pairs.sort((p1, p2) => p2[1] - p1[1]);

  //* Iterate over every pair, get the sum, and calculate the maxScore
  for (let [n1, n2] of pairs) {
    n1Sum += n1;
    pq.enqueue(n1);

    //* Remove the smallest (minimum) value (results in the smallest subtrahend)
    if (pq.size() > k) {
      n1Sum -= pq.dequeue();
    }

    //* Update maxScore since we have selected "k" indices
    if (pq.size() === k) {
      maxScore = Math.max(maxScore, n1Sum * n2);
    }
  }

  return maxScore;
}

console.log(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3)); //* 12
console.log(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1)); //* 30 (10 * 3)
console.log(maxScore([1, 2, 3], [7, 5, 1], 1)); //* 10 (2 * 5)

//* Time: O(n log n)
//* It takes O(n) to create the pairs using both inputs
//* Sorting the pairs takes O(n log n) (depends on the sorting algorithm used)
//* We iterate over every pair (O(n)) and within each iteration:
//*     - We enqueue "n" times -> This takes O(k) since the pq is limited to "k" size
//*     - We dequeue when size > k -> In the worst case, "k" = 1, so we dequeue n - 1 times

//* Space: O(n) - We create "n" array pairs out of both inputs
//* The priority queue uses O(k) space
