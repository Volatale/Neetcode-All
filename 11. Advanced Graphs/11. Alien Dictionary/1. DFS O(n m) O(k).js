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
//*     - We can use DFS
//* Iterate through pairs of words
//* Find the first DIFFERING character
//*     - Create keys for each unique character
//*     - Increment the indegree of char2
//*     - Create a DIRECTED edge from char1 to char2 (u, v)
//! If word1 starts with word2 and word1 is larger than word2
//!     - word2 is a PREFIX of word1
//!     - word2 should therefore appear BEFORE word1
//* Perform a DFS on every char in the graph
//*     - Use Graph Coloring to detect cycles
//* Since recursion naturally uses a stack
//*     - Reverse the array and join at the end
function alienDictionary(words) {
  function dfs(vertex) {
    if (visited[vertex] === 1) return true; //* Graph has cycle
    if (visited[vertex] === 2) return false;

    visited[vertex] = 1; //* Mark as in DFS Tree (currently visiting)

    //* Explore neighbors
    for (const neighbor of graph[vertex] || []) {
      if (dfs(neighbor)) return true;
    }

    visited[vertex] = 2; //* Mark as finished processing
    path.push(vertex);
  }

  const graph = {};
  const path = [];
  const visited = {}; //* 0 = not visited, 1 = visiting, 2 = processed
  const letters = new Set();

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
        letters.add(word1[j]);
      }

      //* Create directed edge from u to v
      graph[word1[j]].push(word2[j]);
      break; //* Already found the differing character
    }
  }

  //* Call DFS on every char
  for (let char in graph) {
    if (dfs(char)) return ""; //* Graph has a cyclic dependancy
  }

  return path.reverse().join("");
}

console.log(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"])); //* "wertf"
console.log(alienDictionary(["wrt", "wrf", "er", "ett"])); //* "rwetf"
console.log(alienDictionary(["z", "x"])); //* "zx"
console.log(alienDictionary(["z", "x", "z"])); //* ""
console.log(alienDictionary(["mario", "mario", "mario"])); //* ""
console.log(alienDictionary(["artf", "art"])); //* ""
console.log(alienDictionary(["a", "b", "c"])); //* "abc"

//* Time: O(n * m) - It takes O(n * m) to build the graph
//* Where "n" is words.length and "m" is the length of the longest word
//* The DFS itself takes O(V+E) but this is not the dominant factor
//* Reversing and joining the array take O(k) time where "k" is the number of unique characters

//* Space: O(k) - In the worst case, the graph has a key and value for every unique character
//* The visited object also scales with "k"
//* The depth of the recursion is also "k" at most
