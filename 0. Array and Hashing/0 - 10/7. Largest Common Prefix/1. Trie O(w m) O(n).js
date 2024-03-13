class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor(words) {
    this.root = new TrieNode();
    this.words = [];
    this.length = 0;

    for (let word of words || []) {
      this.addWord(word);
    }
  }

  addWord(word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
        curr.char = char;
      }

      curr = curr.children.get(char);
    }

    curr.isEndOfWord = true;
    this.words.push(word);
    this.length++;
  }
}

//* Add every word to the trie O(w * m) where w is the length of the average word, and m is the number of words
//* Keep iterating while we have a node that has a children property of size 1
//* If the size is greater, we have a diverging path, and therefore this is the final "common" node
function longestCommonPrefix(strs) {
  const trie = new Trie(strs);

  const prefix = [];

  let node = trie.root;

  while (node.children.size === 1 && !node.isEndOfWord) {
    const nextKey = [...node.children.keys()][0]; // There will only be 1 key (which exists in an array)
    prefix.push(node.char);
    node = node.children.get(nextKey);
  }

  return prefix.join("");
}

console.log(longestCommonPrefix(["sonic", "sonia", "solar"])); // "so"
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix(["a", "a", "a"])); // a
console.log(longestCommonPrefix(["woo", "woom", "woof"])); // woo

//* Time: O(w * m) - "w" is the average length of each word, and we add "m" words to the trie
//* Then, it takes O(w) time to iterate through all of the nodes we need

//* Space: O(n) - Where "n" is the number of nodes in the trie
//* Each node contains: a map and a boolean flag
