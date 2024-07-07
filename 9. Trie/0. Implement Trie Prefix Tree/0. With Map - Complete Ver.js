class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor(words = []) {
    this.root = new TrieNode();
    this.words = [];
    this.length = 0;

    for (let word of words || []) {
      this.insert(word);
    }
  }

  insert(word) {
    word = word.toLowerCase();

    let curr = this.root;

    //* Iterate over all characters in the word
    for (let char of word) {
      //* If we don't already have a node with this char
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }

      //* Move to the child node
      curr = curr.children.get(char);
    }

    //* Mark it as the final node in the word
    curr.isEndOfWord = true;
    this.words.push(word);
    this.length++;
  }

  search(word) {
    word = word.toLowerCase();

    let curr = this.root;

    //* Try to find a node for each character in the word
    for (let char of word) {
      //* A node for this character does not exist in the trie
      if (!curr.children.has(char)) return false;

      //* Move to the next node
      curr = curr.children.get(char);
    }

    //* This node might not actually be the end of a word
    return curr.isEndOfWord;
  }

  startsWith(prefix) {
    prefix = prefix.toLowerCase();

    let curr = this.root;

    //* Traverse to the last character in prefix
    for (let char of prefix) {
      //* There are no words with this chain of characters
      if (!curr.children.has(char)) return [];

      //* Move to the next node
      curr = curr.children.get(char);
    }

    //* DFS and build every word
    const words = [];
    this.findWords(prefix, curr, words);
    return words;
  }

  //* Depth-First Search
  findWords(prefix, node, words) {
    //* Base Case; At End of Word so we can stop recursion
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    //* Iterate over every node in a depth-first manner
    for (let [char, child] of node.children) {
      this.findWords(prefix + char, child, words);
    }
  }
}

const trie = new Trie(["son", "sonic", "solo", "sonia"]);
console.log(trie.startsWith("so"));
