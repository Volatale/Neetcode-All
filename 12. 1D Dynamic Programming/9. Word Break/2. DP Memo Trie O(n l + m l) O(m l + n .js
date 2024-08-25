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
//*         - Break, because there is no point in searching further
//*             - There are no words in the wordDict (trie) that can progress our state
//*         - Otherwise, recursively call breakWord again and perform the state transition
function wordBreak(s, wordDict) {
  function breakWord(index, memo) {
    //* Base case has been hit
    if (index === s.length) return true;

    //* Utilize memoized value
    if (memo.hasOwnProperty(index)) return memo[index];

    //* Start from the root node
    let curr = trie.root;

    for (let i = index; i < s.length; i++) {
      const char = s[i];

      //* Prefix does not exist in trie, stop searching
      if (!curr.children[char]) break;

      curr = curr.children[char];

      //* Word exists in trie
      if (curr.isEndOfWord && breakWord(i + 1, memo)) {
        memo[index] = true;
        return true;
      }
    }

    //* No valid segmentation found from this index
    memo[index] = false;
    return false;
  }

  //* Try lets us avoid making substrings
  const trie = new Trie(wordDict);

  return breakWord(0, {});
}

console.log(wordBreak("leetcode", ["leet", "code"])); //* True
console.log(wordBreak("applepenapple", ["apple", "pen"])); //* True
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //* false
console.log(wordBreak("catsanddog", ["cats", "dog", "sand", "and", "cat"])); //* true
console.log(wordBreak("sss", ["s"])); //* true
console.log(wordBreak("sonic", ["s", "o", "n", "i", "c"])); //* true
console.log(wordBreak("abc", ["a"])); //* False

//* Time: O(n * l + m * l) - There are "n" recursive calls made at most
//* To create the Trie itself, it takes O(m * l) where "m" is the number of words in wordDict
//* And "l" is the length of the longest word in wordDict
//* Within each call, it takes O(l) (in the worst case) to check if a word (prefix) exists in the trie
//* So breakWord itself takes O(n * l) and Trie creation takes O(m * l)

//* Space: O(m * l + n) - The Trie itself stores m * l nodes in the worst case
//* The depth of the recursion tree scales with the length of the string O(n)
