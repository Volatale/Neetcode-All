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

  compare(a, b) {
    //* If dequeueTimes are the same, compare indices
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }

    //* Otherwise just compare dequeueTimes
    return a[0] - b[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.compare(this.heap[i], this.heap[parent]) < 0) {
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
        this.compare(this.heap[leftChild], this.heap[smallest]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.compare(this.heap[rightChild], this.heap[smallest]) < 0
      ) {
        smallest = rightChild;
      }

      if (i === smallest) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

//* Add "i" to each of the task arrays
//*     - This lets us track the ORIGINAL index before we sort
//* Sort in order of enqueue time (first value)
//*     - Ensures tasks that should start earlier are seen earlier
//* If time >= current task's enqueue time, enqueue it to the PQ
//*     - Enqueue tuple of [procTime, indexOftask]
//*         - procTime tells us when the task is finished
//*         - In other words, how much time has passed
//*     - Do this as a loop, because multiple tasks may need procesing
//* If there are no tasks (empty pq)
//*     - Fast forward time to the time of the current task
//*     - Otherwise you have to increment by 1 which is bad if time = 1 and enqueueTime = 1_000_000
//* Else, pq is not empty, Dequeue [procTime, index]
//*     - procTime tells us how much time has passed since task started
//*         - Nothing else could happen during this time, so time += procTime
//*     - index tells us the "id" of the task itself
function getOrder(tasks) {
  const taskOrder = [];
  const pq = new MinHeap();

  //* Preserve the ORIGINAL index of each task
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].push(i);
  }

  //* Sort tasks by enequeueTime (index 0)
  tasks.sort((a, b) => a[0] - b[0]);

  //* Time is set to the minimum time in all tasks
  let time = tasks[0][0];
  let i = 0;

  while (!pq.isEmpty() || i < tasks.length) {
    //* CPU has a backlog of tasks that need enqeueing
    while (i < tasks.length && time >= tasks[i][0]) {
      pq.enqueue([tasks[i][1], tasks[i][2]]); //* [processingTime, index]
      i++;
    }

    if (pq.isEmpty()) {
      //* Fast Forward time to next task
      time = tasks[i][0];
    } else {
      //* CPU can't do anything while processing
      //* Time is incremented by how long the task took to finish
      const [processingTime, index] = pq.dequeue();
      time += processingTime;
      taskOrder.push(index);
    }
  }

  return taskOrder;
}

console.log(
  getOrder([
    [1, 2],
    [2, 4],
    [3, 2],
    [4, 1],
  ])
); //* [0, 2, 3, 1]

console.log(
  getOrder([
    [7, 10],
    [7, 12],
    [7, 5],
    [7, 4],
    [7, 2],
  ])
); //* [4, 3, 2, 0, 1]

console.log(
  getOrder([
    [19, 13],
    [16, 9],
    [21, 10],
    [32, 25],
    [37, 4],
    [49, 24],
    [2, 15],
    [38, 41],
    [37, 34],
    [33, 6],
    [45, 4],
    [18, 18],
    [46, 39],
    [12, 24],
  ])
);

//* Time: O(n log n) - It takes O(n log n) to sort the tasks
//* Iterating over the tasks array takes O(n) itself
//* Enqueuing and Dequeuing take O(log n) each and this can happen "n" times

//* Space: O(n) - In the worst case, every task is stored in the min heap
