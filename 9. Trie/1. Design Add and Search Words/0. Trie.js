class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let curr = this.root;

    for (let char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }

      curr = curr.children.get(char);
    }

    curr.isEndOfWord = true;
  }

  search(word) {
    return this.findWords(word, this.root);
  }

  findWords(word, node) {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      //* Handle Wildcards
      if (char === ".") {
        for (let [_, child] of node.children) {
          if (this.findWords(word.substring(i + 1), child)) {
            return true;
          }
        }

        return false;
      }

      if (!node.children.has(char)) return false;
      node = node.children.get(char);
    }

    return node.isEndOfWord;
  }
}
