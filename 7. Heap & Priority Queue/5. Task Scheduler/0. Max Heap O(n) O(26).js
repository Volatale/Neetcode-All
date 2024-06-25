class MaxHeap {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  length() {
    return this.heap.length;
  }

  getValues() {
    return this.heap;
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

    //* Compare the FREQUENCY (index 1)
    while (i !== 0 && this.heap[i][1] > this.heap[parent][1]) {
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
      //* Compare the FREQUENCY (index 1)
      (leftChild < length && this.heap[i][1] < this.heap[leftChild][1]) ||
      (rightChild < length && this.heap[i][1] < this.heap[rightChild][1])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][1] > this.heap[rightChild][1]
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

//* We want to consistently take the highest frequency task
//* So create a frequency array of all of the tasks
//* A Max Heap / Priority Queue allows us to have fast access to the top element
//* Enqueue everything with a frequency of > 0 to the queue
//* The max heap uses the frequency to compare values
//* Lastly, we need to calculate the number of intervals
//* Every iteration, intervals is incremented
//* When a task should come OFF cooldown, enqueue the task
//* If pq is not empty, dequeue the top element (most frequent)
//* If the task's frequency is > 1, this task needs to be repeated again
//* But we should apply a COOLDOWN to the task
//* Use a map to track the tasks that are on cooldown

//* Handling Cooldowns:
//* ["A", "A", "A"], n = 2
//* A -> wait -> wait -> A -> wait -> wait A (so 7 intervals)
//* If the first is interval 1, then the earliest A can be done again is interval 4
//* intervals + n + 1. 1 + 2 + 1 = 4
function taskScheduler(tasks, n) {
  //* There is no delay but we still have to process every task
  if (n === 0) return tasks.length;

  const pq = new MaxHeap(); //* Puts the most frequent tasks on top [task, freq]
  const freq = new Array(26).fill(0); //* Frequency of each task
  const cooldown = new Map(); //* Tracks the tasks that are on cooldown

  let intervals = 0;

  //* Get the frequency of every task
  for (let i = 0; i < tasks.length; i++) {
    freq[tasks[i].charCodeAt(0) - 65]++;
  }

  //* Populate Max Heap / Priority Queue
  for (let i = 0; i < freq.length; i++) {
    if (freq[i] > 0) {
      pq.enqueue([String.fromCharCode(i + 65), freq[i]]);
    }
  }

  //* Calculate the intervals
  while (!pq.isEmpty() || cooldown.size > 0) {
    //* Every iteration counts as an interval (even if nothing happens)
    intervals++;

    //* If enough time has passed for something to be off cooldown
    //* Enqueue the task back to the priority queue (since we can do it again)
    if (cooldown.has(intervals)) {
      pq.enqueue(cooldown.get(intervals));
      cooldown.delete(intervals);
    }

    if (!pq.isEmpty()) {
      const [task, freq] = pq.dequeue();

      //* This task needs to be processed again, but maybe with a cooldown
      if (freq > 1) {
        cooldown.set(intervals + n + 1, [task, freq - 1]);
      }
    }
  }

  return intervals;
}

console.log(taskScheduler(["A", "A", "A", "B", "C"], 2)); //* 7
console.log(taskScheduler(["A", "B", "A", "C"], 1)); //* 4
console.log(taskScheduler(["A", "A", "A", "B", "B", "B"], 2)); //* 8
console.log(taskScheduler(["A"], 5)); //* 1
console.log(taskScheduler(["A", "A", "A"], 2)); //* 7

//* Time: O(n)
//* It takes O(n) to count the frequency of every task
//* We iterate over each element in the freq array (in the worst case)
//*     - O(26) -> (1) since A-Z is 26 chars
//*     - Enqueuing to the PQ takes O(log 26) since there will be 26 elements in pq
//* Finally, we calculate the intervals
//*     - Enqueuing and Dequeuing take O(log k) (k = unique tasks)
//*     - Each task is processed ONCE and there are "n" tasks
//*     - O(n log k)
//* k <= n (there can't be more than n unique tasks)
//* Therefore the time complexity simplifies to O(n log k)
//*     - The number of unique tasks is limited to 26 (a constant)
//* So ultimately, we simplify to O(n + 26) -> O(n)

//* Space: O(26) -> O(1)
//* There are only 26 possible characters in A-Z
//* The frequency array ALWAYS has 26 length
//* The priority queue has 26 length in the worst case (if at least one of every task exists)
//* The map in the worst case will store every character (O(26))
//* So O(26) + O(26) + O(26) = O(72) -> O(1)
