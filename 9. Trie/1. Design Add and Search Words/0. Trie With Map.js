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
      //* Create a node for this character
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }

      //* Move to the node for this character
      curr = curr.children.get(char);
    }

    //* Mark as end of word
    curr.isEndOfWord = true;
  }

  //* We need to be able to START from the root
  //* Search itself does not accept a "node" parameter, so use a helper
  search(word) {
    return this.findWords(word, this.root);
  }

  //* If char is a ".", we need to start a DFS from the current node
  //* Call findWords recursively, but from the NEXT character
  //* This effectively lets us SKIP the current character (it is a wildcard)
  findWords(word, node) {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      //* DFS from this node looking for any matches
      //* Start searching from the NEXT (i + 1) character (exclude this one)
      if (char === ".") {
        for (let [_, child] of node.children) {
          if (this.findWords(word.substring(i + 1), child)) return true;
        }

        return false; //* DFS found no matches
      }

      //* Node for this character does not exist
      if (!node.children.has(char)) return false;

      node = node.children.get(char);
    }

    //* This node may not mark the end of a word
    return node.isEndOfWord;
  }
}

const dictionary = new WordDictionary();
console.log(dictionary.addWord("pan"));
console.log(dictionary.addWord("gan"));
console.log(dictionary.addWord("tan"));
console.log(dictionary.search("pan")); //* True
console.log(dictionary.search("gan")); //* True
console.log(dictionary.search("tan")); //* True
console.log(dictionary.search("ran")); //* False
console.log(dictionary.search(".an")); //* True
console.log(dictionary.search("..n")); //* True
