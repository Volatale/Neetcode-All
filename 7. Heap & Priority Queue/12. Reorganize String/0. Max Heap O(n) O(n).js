class MyMaxHeap {
  constructor(values = [], func = (a, b) => b - a) {
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

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
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
//* Use a max heap
//* Consistently take the highest frequency character
//* This gives us the highest chance to form a valid string
//* Track the last used character so we don't use it twice
//* If prev is not null and the pq is empty, you can't use this character
//* So we return false
function reorganizeString(s) {
  const freqArray = new Array(26).fill(0);
  const characters = [];
  const newString = [];

  //* Get frequencies of characters
  for (let i = 0; i < s.length; i++) {
    freqArray[s[i].charCodeAt(0) - 97]++;
  }

  //* Add frequencies to each character
  for (let i = 0; i < 26; i++) {
    if (freqArray[i] > 0) {
      characters.push([String.fromCharCode(i + 97), freqArray[i]]);
    }
  }

  //* Heapify the array
  const pq = new MyMaxHeap(characters, (a, b) => b[1] - a[1]);

  //* So we don't use the same char twice
  let prev = null;

  //* Build the new string
  while (!pq.isEmpty() || prev !== null) {
    //* There is no other most frequent, and we can't add the previous
    if (prev && pq.isEmpty()) return "";

    const [char, freq] = pq.dequeue();
    newString.push(char);

    //* We don't want to use the same character twice
    if (prev !== null) {
      pq.enqueue(prev);
      prev = null;
    }

    //* If there are more occurrences left, enqueue them back
    if (freq > 1) {
      prev = [char, freq - 1];
    }
  }

  return newString.join("");
}

console.log(reorganizeString("aab"));
console.log(reorganizeString("aaabb"));
console.log(reorganizeString(""));
console.log(reorganizeString("aabbbcccccc"));

//* Time: O(n)
//* Getting the frequency of characters takes O(n)
//* Creating the character array takes O(1) (26 characters)
//* Building the maxHeap takes O(1) (26 characters)
//* Main loop takes O(n) since enqueue/dequeue are O(1) (26 characters)

//* Space: O(n)
//* The frequency array, character array and max heap all use O(26) -> O(1) space
//* The string array takes O(n) since that scales with the number of characters in the input
