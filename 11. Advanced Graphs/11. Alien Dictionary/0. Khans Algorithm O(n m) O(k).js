class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const front = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;
    return front.val;
  }
}

//* We need to find the TOPOLOGICAL ORDERING of characters
//*     - We can use Khan's Algorithm here
//* Iterate through pairs of words
//* Find the first DIFFERING character
//*     - Create keys for each unique character
//*     - Increment the indegree of char2
//*     - Create a DIRECTED edge from char1 to char2 (u, v)
//! If word1 starts with word2 and word1 is larger than word2
//!     - word2 is a PREFIX of word1
//!     - word2 should therefore appear BEFORE word1
function alienDictionary(words) {
  const graph = {};
  const indegree = {};
  const queue = new MyQueue();
  const path = [];

  const letters = new Set();
  let visited = 0;

  //* Create the edges to each letter
  //* Get the indegree of each node
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    //* Word2 is a prefix so it should appear lexicographically before word1
    if (word1.startsWith(word2) && word1.length > word2.length) {
      return "";
    }

    //* Find the first differing character
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] === word2[j]) continue;

      //* Create keys for word1's letter
      if (!graph[word1[j]]) {
        graph[word1[j]] = [];
        indegree[word1[j]] = 0;
        letters.add(word1[j]);
      }

      //* Create keys for char2
      if (!graph[word2[j]]) {
        graph[word2[j]] = [];
        indegree[word2[j]] = 0;
        letters.add(word2[j]);
      }

      //* Create directed edge from u to v
      graph[word1[j]].push(word2[j]);
      indegree[word2[j]]++;
      break; //* Already found the differing character
    }
  }

  //* Enqueue nodes with no prerequisite
  for (let char in graph) {
    if (indegree[char] === 0) {
      queue.enqueue(char);
    }
  }

  //! Khan's Algorithm
  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();

    //* Add to topological ordering
    path.push(vertex);
    visited++;

    //* Explore neighbors
    for (let neighbor of graph[vertex] || []) {
      indegree[neighbor] = indegree[neighbor] - 1;

      //* This char has no more prerequisites
      if (indegree[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  //* Unable to visit every char
  if (visited !== letters.size) return "";

  return path.join("");
}

console.log(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"])); //* "wertf"
console.log(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"])); //* "wretf"
console.log(alienDictionary(["z", "x"])); //* "zx"
console.log(alienDictionary(["z", "x", "z"])); //* ""
console.log(alienDictionary(["mario", "mario", "mario"])); //* ""
console.log(alienDictionary(["artf", "art"])); //* ""
console.log(alienDictionary(["a", "b", "c"])); //* "abc"

//* Time: O(n * m) - It takes O(n * m) to build the graph
//* Where "n" is words.length and "m" is the length of the longest word
//* Khan's Algorithm takes O(V+E) time, but this is not the dominant factor
//* Joining the array take O(k) time where "k" is the number of unique characters

//* Space: O(k) - In the worst case, the graph has a key and value for every unique character
//* visited, indegree, letters and the queue can all store up to "k" unique chars in the worst case
//* Joining the array technically creates an O(k) length string too
