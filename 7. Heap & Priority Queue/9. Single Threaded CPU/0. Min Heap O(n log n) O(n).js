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

    while (i !== 0 && this.heap[i][0] < this.heap[parent][0]) {
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
      (leftChild < length && this.heap[i][0] > this.heap[leftChild][0]) ||
      (rightChild < length && this.heap[i][0] > this.heap[rightChild][0])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][0] < this.heap[rightChild]
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

function singleThreadedCPU(tasks) {
  const taskOrder = [];

  //* Priority Queue compares the dequeueTime
  const pq = new MinHeap();

  //* Sort (by the FIRST value) to minimize time to wait for tasks
  //* Time is set to the MINIMUM enqueue time
  tasks.sort((a, b) => a[0] - b[0]);
  let time = tasks[0][0];

  //* Begin processing tasks
  for (let i = 0; i < tasks.length; i++) {
    const [enqueueTime, dequeueTime] = tasks[i];

    //* Task is ready to be processed, enqueue [dequeueTime, index]
    if (time === enqueueTime) {
      pq.enqueue([dequeueTime, i]); //* Index tells us what task it was
    }

    //* If time === peek()[0], it is time to dequeue the element (task processed)
    if (time >= pq.peek()[0]) {
      taskOrder.push(pq.dequeue()[1]);
    }

    time++;
  }

  return taskOrder;
}

console.log(
  singleThreadedCPU([
    [1, 2],
    [2, 4],
    [3, 2],
    [4, 1],
  ])
); //* [0, 2, 3, 1]

// console.log(
//   singleThreadedCPU([
//     [7, 10],
//     [7, 12],
//     [7, 5],
//     [7, 4],
//     [7, 2],
//   ])
// ); //* [4, 3, 2, 0, 1]

console.log(
  singleThreadedCPU([
    [1, 2],
    [0, 3],
  ])
); //* [0, 2, 3, 1]

//* Time: O(n log n) - We sort the array
//* Enqueuing and Dequeuing takes O(log n), and we do this "n" times at worst

//* Space: O(n) - The sorting algorithm could use O(n) space (merge sort)
//* The size of the priority queue also scales with "n"
