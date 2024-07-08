class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor(words = []) {
    this.root = new TrieNode();

    for (let word of words) {
      this.insert(word);
    }
  }

  insert(word) {
    let curr = this.root;

    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }

      curr = curr.children[char];
    }

    curr.isEndOfWord = true;
  }
}

//* Either include or exclude the current character
//* Instead of using substrings
//* Check whether it is possible to create a string a string in the trie
//* From index "i"
//* If it is, and this is also the end of the word (node)
//* Then we can try the word
function minExtraChar(s, dictonary) {
  function dfs(index) {
    if (index === s.length) return 0; //* Base Case; at the end of the string
    if (memo.hasOwnProperty(index)) return memo[index]; //* Utilize memoization

    //* "+ 1" because this is an additional character we SKIP
    let extraChars = dfs(index + 1) + 1;

    //* Start traversing from the ROOT of the trie
    let curr = trie.root;

    //* Get every PREFIX starting at "index"
    for (let i = index; i < s.length; i++) {
      //* Can't create a word starting at "j" that exists in trie
      if (!curr.children.hasOwnProperty(s[i])) break;
      curr = curr.children[s[i]];

      //* Can only try the word if this node marked the end of the word
      if (curr.isEndOfWord) {
        extraChars = Math.min(extraChars, dfs(i + 1));
      }
    }

    memo[index] = extraChars; //* Set up memoization
    return extraChars;
  }

  //* Convert to set for Θ(1) lookup
  const trie = new Trie(dictonary);
  const memo = {};

  return dfs(0);
}

console.log(minExtraChar("abca", ["a", "b", "c"]));
console.log(minExtraChar("abcdef", ["abc", "bcdef"]));
console.log(minExtraChar("leetscode", ["leet", "code", "leetcode"]));
console.log(minExtraChar("sayhelloworld", ["hello", "world"]));

//* Time: O(n * m) - "n" is the length of the string
//* "m" is the length of the longest string in the dictionary

//* Space: O(n + k) - "n" is the length of the string "s"
//* And "k" is the total number of chars in the dictionary
