class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;

    //* Iterate over all characters in the word
    for (let char of word) {
      //* If we don't already have a node with this char
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }

      //* Move to the child node
      curr = curr.children[char];
    }

    //* Mark it as the final node in the word
    curr.isEndOfWord = true;
  }

  search(word) {
    let curr = this.root;

    //* Try to find a node for each character in the word
    for (let char of word) {
      //* A node for this character does not exist in the trie
      if (!curr.children[char]) return false;

      //* Move to the next node
      curr = curr.children[char];
    }

    //* This node might not actually be the end of a word
    return curr.isEndOfWord;
  }

  startsWith(prefix) {
    let curr = this.root;

    //* Traverse to the last character in prefix
    for (let char of prefix) {
      //* There are no words with this chain of characters
      if (!curr.children[char]) return false;

      //* Move to the next node
      curr = curr.children[char];
    }

    return true;
  }
}
