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

  search(prefix) {
    let curr = this.root;

    for (let char of prefix) {
      if (!curr.children[char]) {
        return false;
      }

      curr = curr.children[char];
    }

    return curr.isEndOfWord;
  }
}

//! This is a Dynamic Programming Problem
//*     - Optimal Substructure exists because we only need to find ONE path to the final index
//*         - The moment we find that, we can stop all searches (return true on every stack frame)

//* We essentially need to get to the end of the string
//*     - In which case, we can return true
//* Take substrings from the current index
//*     - If the substring exists in the dictionary, continue the search
//*     - Otherwise, we can't reach the end of the string

//* In this version we are using a Trie to avoid the need to generate substrings
//*     - We can do this by checking for PREFIXES that exist in the Trie
//*     - Start from the root node in each call
//*         - If the current char doesn't exist, the prefix also doesn't exist
//*             - Break, because there is no point in searching further
//*             -   There are no words in the wordDict (trie) that can progress our state
//*     - Otherwise, just continue the search
function wordBreak(s, wordDict) {
  const n = s.length;
  const trie = new Trie(wordDict);

  //* dp[i] = Whether or not it is possible to find words that take us to the i-th index
  const dp = new Array(n + 1).fill(false);

  //* It is always possible to get to the 0-th index
  dp[0] = true;

  for (let i = 0; i <= n; i++) {
    //* Can't reach this index
    if (!dp[i]) continue;

    let curr = trie.root;

    //* Try to find prefixes of words in the trie
    for (let j = i; j <= n; j++) {
      const char = s[j];

      //* No words with this prefix exist in the trie
      if (!curr.children[char]) break;

      curr = curr.children[char];

      //* Word / Prefix exists in Trie, transition the state
      if (curr.isEndOfWord) {
        dp[j + 1] = true;
      }
    }
  }

  return dp[n];
}

console.log(wordBreak("leetcode", ["leet", "code"])); //* True
console.log(wordBreak("applepenapple", ["apple", "pen"])); //* True
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //* False
console.log(wordBreak("catsanddog", ["cats", "dog", "sand", "and", "cat"])); //* True
console.log(wordBreak("sss", ["s"])); //* True
console.log(wordBreak("sonic", ["s", "o", "n", "i", "c"])); //* True
console.log(wordBreak("abc", ["a"])); //* False

//* Time: O(n * l + m * l)
//* To create the Trie itself, it takes O(m * l) where "m" is the number of words in wordDict
//* And "l" is the length of the longest word in wordDict
//* Within each iteration, it takes O(l) (in the worst case) to check if a word (prefix) exists in the trie

//* Space: O(m * l) - The Trie itself stores m * l nodes in the worst case
//* The DP array scales in size with the length of the input string
