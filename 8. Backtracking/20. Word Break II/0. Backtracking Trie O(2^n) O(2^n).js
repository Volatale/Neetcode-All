class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor(words = []) {
    this.root = new TrieNode();

    for (const word of words) {
      this.insert(word);
    }
  }

  insert(word) {
    let curr = this.root;

    for (const char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }

      curr = curr.children[char];
    }

    curr.isEndOfWord = true;
  }

  search(word) {
    let curr = this.root;

    for (const char of word) {
      if (!curr.children[char]) return false;

      curr = curr.children[char];
    }

    return curr.isEndOfWord;
  }
}

//* We need to generate EVERY possible valid solution
//*     - Therefore backtracking is probably the way forward
//* Instead of generating every substring at each index
//!     - Use a Trie to check if the current "prefix" exists in the Trie
//!     - If it doesn't exist, just break out of the loop; extending the prefix won't help
function wordBreak(s, wordDict) {
  function breakWord(index, curr) {
    if (index === s.length) {
      results.push(curr.join(" "));
      return;
    }

    let node = trie.root;
    let prefix = [];

    //* Try every word as a candidate
    for (let i = index; i < s.length; i++) {
      const char = s[i];

      //* Current prefix does not exist in trie
      if (!node.children[char]) break;

      prefix.push(char);
      node = node.children[char];

      if (node.isEndOfWord) {
        curr.push(prefix.join("")); //* Explore candidate
        breakWord(i + 1, curr);
        curr.pop(); //* Un-explore candidate
      }
    }
  }

  const results = [];
  const trie = new Trie(wordDict);

  breakWord(0, []);

  return results;
}

console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
console.log(
  wordBreak("pineapplepenapple", [
    "apple",
    "pen",
    "applepen",
    "pine",
    "pineapple",
  ])
);
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));

//* Time: O(2^n) - At each index, we have two options
//* Break the string (if it is valid), or don't break; continue expanding substrings
//* There are 2^n possible ways to break the string
//* It takes O(n * m) in the worst case to add every word to the Trie
//* But the Trie allows us to cut down on the time taken to find substrings

//* Space: O(2^n) - There are 2^n possible ways to break the string
//* Each of these strings can potentially be a string of length "n"
//* The depth of the recursion tree scales with "n"
//* The number of nodes stored in the trie is n * m in the worst case (where every character is unique)
