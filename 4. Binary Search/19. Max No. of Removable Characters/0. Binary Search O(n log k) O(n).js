//* We want to find the MAXIMUM "k" that allows us to still fulfill the condition
//* Removables tells us how many elements we can remove in the worst case (every element in removables)
//* So if we binary search from 0 to removables.length
//* Then we can use that as the search space
//* To remove elements from the string, we should create an array from "s"
//* Use THAT to remove the elements themselves (by setting that character to "#")
//* "mid" represents the number of elements we are trying to remove
//* Remove "mid" (k) elements by iterating over "letters" BEFORE checking for a subsequence
//* Removable is NOT sorted, so [3, 1, 0] and skipping each index would be odd
//* By setting characters to "#" beforehand, we ensure that we remove the first "k" characters
//* If that number is successful, we found a new "best"
//* Else, you removed too many so p was not a subsequence anymore
//* Regardless, after testing, we reverse the removals using "s" (which was un-modified)
function maximumNoOfRemovableChars(s, p, removable) {
  function isSubsequence(s, p, k, letters) {
    //* Remove the first "k" characters from the string
    for (let i = 0; i < k; i++) {
      letters[removable[i]] = "#";
    }

    //* Check whether p is a subsequence of s
    let j = 0;

    for (let i = 0; i < s.length; i++) {
      if (letters[i] === p[j]) {
        j++;

        if (j === p.length) break;
      }
    }

    //* If true, p is a subsequence of s
    if (j === p.length) return true;

    //* Otherwise, reverse the removals
    for (let i = 0; i < k; i++) {
      letters[removable[i]] = s[removable[i]];
    }

    return false;
  }

  //* Strings are immutable so we need
  const letters = s.split("");

  //* The search space is the number of removals we can do
  //* The maximum number of removals is the number of elements in removable
  let left = 0;
  let right = removable.length;

  while (left < right) {
    //* Mid represents the number of removals we will do
    //* Right-biased mid because we want the MAXIMUM, not the minimum
    let mid = left + ((right - left + 1) >> 1);

    if (isSubsequence(s, p, mid, letters)) {
      left = mid;
    } else {
      right = mid - 1; //* Too many removals being made, decrease search space
    }
  }

  return left;
}

console.log(maximumNoOfRemovableChars("abcd", "ad", [1, 2, 3])); //* 2
console.log(maximumNoOfRemovableChars("abcacb", "ab", [3, 1, 0])); //* 2
console.log(maximumNoOfRemovableChars("abcbddddd", "abcd", [3, 2, 1, 4, 5, 6])); //* 1
console.log(maximumNoOfRemovableChars("abcab", "abc", [0, 1, 2, 3, 4])); //* 0

//* Time: O(n log k) - We do a binary search that ranges from 0 to n (removables.length)
//* In each iteration of binary search, we call a function
//* This function causes an O(n) loop through s in the worst case
//* There are also two O(k) loops within the call, but n is always > k

//* Space: O(n) - We have to create an array out of "s" beause strings are immutable
//* So this array scales in size linearly with s itself
