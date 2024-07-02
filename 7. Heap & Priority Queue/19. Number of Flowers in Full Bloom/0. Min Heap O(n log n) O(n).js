class MyMinHeap {
  constructor(values = [], func = (a, b) => a[1] - b[1]) {
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
      let smallest = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[smallest]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[smallest]) < 0
      ) {
        smallest = rightChild;
      }

      if (i === smallest) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

function flowersInFullBloom(flowers, people) {
  const result = [];

  //* Store the index of the person since we are going to sort them later
  people = people.map((person, i) => [person, i]);

  //* Sort PEOPLE based on their "visit time" (the number)
  people.sort((a, b) => a[0] - b[0]);

  //* Sort FLOWERS based on their START time (earlier people see those flowers)
  flowers.sort((a, b) => a[0] - b[0]);

  //* Stores the flower's end time (and pq.size() tells us how many flowers are in bloom)
  //* We need to know the EARLIEST end time for each flower to remove it later
  const pq = new MyMinHeap([], (a, b) => a - b);
  let index = 0;

  //* Iterate over every flower
  for (let [arrivalTime, i] of people) {
    //* Add all the flowers that "should" be blooming to the PQ
    while (index < flowers.length && flowers[index][0] <= arrivalTime) {
      pq.enqueue(flowers[index][1]); //* Enqueue the END TIME (so we know when they STOP blooming)
      index++;
    }

    //* Remove those flowers; their bloom has ended
    while (!pq.isEmpty() && pq.peek() < arrivalTime) {
      pq.dequeue();
    }

    //* The SIZE of the PQ tells us how many flowers are still in bloom
    result[i] = pq.size();
  }

  return result;
}

console.log(
  flowersInFullBloom(
    [
      [1, 6],
      [3, 7],
      [9, 12],
      [4, 13],
    ],
    [2, 3, 7, 11]
  )
);

console.log(
  flowersInFullBloom(
    [
      [1, 10],
      [3, 3],
    ],
    [3, 3, 2]
  )
);

//* Time: O(n log n) + O(n log k)
//* It takes O(n log n) to sort the flowers array and the people array respectively
//* Insertion and Dequeuing take O(log n)
//* In the worst case, every flower is in bloom at the same time, so insertion takes O(log n)
//* We may enqueue/dequeue every flopwer at least once each

//* Space: O(n) - Sorting takes O(n) usually
//* We store each person's index in the person array
//* In the worst casek, each flower is stored in the pq at the same time
