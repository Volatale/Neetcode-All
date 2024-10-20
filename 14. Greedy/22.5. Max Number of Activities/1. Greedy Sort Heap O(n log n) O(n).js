class PriorityQueue {
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

//! This is a geeksforgeeks problem
//* This is an activity selection / Unweighted interval scheduling problem
//*     - All of the intervals have the same weight (or value)
//*     - We simply want to maximize the number of intervals we can include
//* Create tuples / pairs out of the data for each task
//* Sort the tasks based on their FINISH time (in ascending order)
//*     - We want to see tasks that END sooner earlier
//*     - Strictly speaking, we are more likely to be able to include tasks that END sooner
//* Imagine we have [1, 5, 10, 1] and [3, 8, 15, 20]
//*     - Obviously we don't want to choose the task that ENDS at 20
//*         - Choosing that task means we can't do the OTHER tasks that end a lot sooner
//!         - These tasks HAVE NO WEIGHT
//*             - There is no value in choosing tasks that end later
//*     - Instead, we can choose the first three tasks since they don't overlap
function maxNumberOfActivities(start, finish) {
  //* There are no tasks to consider
  if (start.length === 0) return 0;

  //* Pair up each task's start and end time and sort them by FINISH time
  const tasks = start.map((val, i) => [start[i], finish[i]]);

  //* Heapify tasks in O(n)
  const PQ = new PriorityQueue(tasks, (a, b) => a[1] - b[1]);
  let activites = 0;
  let taskEnd = -Infinity;

  //* Try to perform as many tasks as possible
  while (!PQ.isEmpty()) {
    const dequeued = PQ.dequeue();

    //* We can do the task if its startTime > last task's end time
    if (dequeued[0] >= taskEnd) {
      activites++;
      taskEnd = dequeued[1];
    }
  }

  return activites;
}

console.log(maxNumberOfActivities([10, 12, 20], [20, 25, 30])); //* 1
console.log(maxNumberOfActivities([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9])); //* 4
console.log(maxNumberOfActivities([1, 5, 10, 1], [3, 8, 15, 20])); //* 3
console.log(maxNumberOfActivities([1, 1], [3, 5])); //* 1

//* Time: O(n log n) - We are using a priority queue to sort (heapify) in O(n) time
//* It also takes O(n) time to map create the tasks array
//* Each dequeue takes O(log n) time

//* Space: O(n) - We create a tasks array to group the data for each task (the array has n length)
//* The priority queue itself uses O(n) space
