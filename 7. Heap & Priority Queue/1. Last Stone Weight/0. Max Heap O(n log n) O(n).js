class MyPriorityQueue {
  constructor(nums = [], func = (a, b) => a - b) {
    this.heap = nums;
    this.func = func;
    this.#heapify();
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  #heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.#sinkDown(i);
    }
  }

  enqueue(val) {
    this.heap.push(val);
    this.#bubbleUp(this.heap.length - 1);
  }

  #bubbleUp(i) {
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
    this.#sinkDown(0);

    return popped;
  }

  #sinkDown(i) {
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

//* Since we always want to smash the two heaviest stones, we can use a Max Heap
//* Using the Max Heap, whenever we dequeue (pop), we know that we'll have the HEAVIEST stone
//* The game continues until there are <= 1 stones left
//*     - Thus, keep looping while the size of the max heap is > 1
//*     - This ensures that we always have TWO or more stones to smash if we ever need to
//* Get the two heaviest stones via a dequeue
//* Then, if (x - y > 0), push a new "stone" with the DIFFERENCE
//*     - We effectively assume neither stone will remain in the heap
//*     - And if the heaviest stone still exists (albiet in a smaller form), we push the difference
//* This works because we know for sure that only two cases exist:#
//*     - Either x === y, which means a new stone is not added to the heap
//*     - Or, x !== y, which means a new stone that has the weight of the difference will be added
//*         - So we can get away with dequeueing both and not enqueuing both afterwards; one stone is guaranteed to be destroyed
//*         - In other words, if we start with 2 stones, we'll either end up with 0 or 1; the number of stones never stays the same
function lastStoneWeight(stones) {
  //* There is only one stone, so just return that
  if (stones.length === 1) return stones[0];

  //* Use a Max Heap so we can always access the heaviest stones
  const PQ = new MyPriorityQueue(stones, (a, b) => b - a);

  //* Keep smashing stones while there are two stones
  while (PQ.size() > 1) {
    //* Dequeue the two heaviest stoens
    const x = PQ.dequeue();
    const y = PQ.dequeue();

    //* If the result is > 0, simply enqueue whatever is left
    if (x - y > 0) {
      PQ.enqueue(x - y);
    }
  }

  //* Return the final stone if it exists, else just return 0
  return !PQ.isEmpty() ? PQ.peek() : 0;
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeight([1])); //* 1
console.log(lastStoneWeight([4, 4, 4, 4])); //* 0
console.log(lastStoneWeight([4, 4, 4, 4, 5])); //* 3
