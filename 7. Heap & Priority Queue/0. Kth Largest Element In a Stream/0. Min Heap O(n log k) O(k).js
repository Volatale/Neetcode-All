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

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
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

//* Use a MIN heap - This gives us O(1) access to the SMALLEST element
//* If we limit the size of the priority queue to "k"
//* That means that the top element is the Kth Largest
//* Take this example: [4, 5, 6]. The top element is 4
//* The array in reverse (sorted) order is [6, 5, 4]
//* Therefore the 3rd (kth) smallest is 4
//* Which means if I find a value > 4, I pop 4 and replace it with the new val
//* Then you'd have [5, 6], after pushing we get [1, 4, 5]
//* So now the 3rd smallest is 1
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.pq = new MyMinHeap();

    //* Call add for every input element
    for (let val of nums) {
      this.add(val);
    }
  }

  //* Keep adding elements while the length < k
  //* If length === k, we can't add anymore elements
  //* Check if the new element > peek()
  //* If it is, replace the top with the new element
  //* We want the kth LARGEST elements
  //* Since we have O(1) access to the minimum
  //* We can pop the minimum and add the new element
  //* Therefore, the top element is always the kth largest
  add(val) {
    if (this.pq.size() < this.k) {
      this.pq.enqueue(val);
    } else if (val > this.pq.peek()) {
      //* Maintains the "k" largest elements
      this.pq.dequeue();
      this.pq.enqueue(val);
    }

    return this.pq.peek();
  }
}

//* Time: O(n log k) - We insert "n" elements into the the queue to initialize
//* It takes O(log k) for insertion and deletion and we do this at most "k" times
//* O(log k) because the heap is limited to "k" space so there will only be "k" elements at once

//* Space: O(k) - The heap will only contain up to "k" elements at once
