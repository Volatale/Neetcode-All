class PriorityQueue {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.insert(val);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

  values() {
    return this.heap;
  }

  peek() {
    return this.heap[0];
  }

  swap(x, y) {
    let temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  insert(val) {
    this.heap.push(val);

    if (this.heap.length === 1) return this.heap;
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

  pop() {
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
    this.queue = new PriorityQueue();

    //* Call add for every input element
    for (let num of nums) {
      this.add(num);
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
    if (this.queue.length() < this.k) {
      this.queue.insert(val);
    } else if (val > this.queue.peek()) {
      //* Ensures we maintain the "k" LARGEST elements
      this.queue.pop();
      this.queue.insert(val);
    }

    return this.queue.peek();
  }
}

//* Time: O(n log k) - We insert "n" elements into the the queue to initialize
//* It takes O(log k) for insertion and deletion and we do this at most "k" times
//* O(log k) because the heap is limited to "k" space so there will only be "k" elements at once

//* Space: O(k) - The heap will only contain up to "k" elements at once
