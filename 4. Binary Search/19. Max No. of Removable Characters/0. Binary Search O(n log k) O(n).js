//* We are given two strings `s` and `p`, where `p` is a SUBSEQUENCE of `s`
//* We are also given an int[] `removable` containing a subset of indices of `s`
//* The goal is to remove the MAXIMUM number of characters `k` from `s`, such that `p` is STILL a subsequence of `s`
//* So this is an optimization problem that involves checking the validity of subsequences
//*     - To check for subsequences, we can simply use a two pointer approach
//*     - Match each character in `s` against characters in `p`
//* Removable essentially tells us how many characters we have to remove in the worst case
//* So all we have to do is perform a binary search on the range [0, removable.length]
//*     - We already know the range of possible `k` is within this
//*     - 0 <= k <= removable.length
//* Therefore, we can say that each of the indices of removable follows this ideology:
//*     - 0 <= k <= removable.length
//*     - 0 <= i < removable.length -> represents `k` and subsequently `mid`
//* Essentially, we can binary search on the indices of removable because they map directly to `k`
function maximumRemovals(s, p, removable) {
  function isSubsequence(s, p, k, letters) {
    //* Remove the first `k` characters from s
    for (let i = 0; i < k; i++) {
      letters[removable[i]] = "#";
    }

    //* Two pointers to validate subsequence (p -> s)
    let j = 0;

    for (let i = 0; i < s.length && j < p.length; i++) {
      if (letters[i] === p[j]) {
        j++;
      }
    }

    //* Validate potential success
    if (j === p.length) return true;

    //* Failed, so reverse the removals
    for (let i = 0; i < k; i++) {
      letters[removable[i]] = s[removable[i]];
    }

    return false;
  }

  //* Allows us to pass the "string" by reference in JS
  const letters = s.split("");

  //* The search space of possible `k` is in the range 0 <= k <= removable.length
  let left = 0;
  let right = removable.length;

  while (left < right) {
    //* `mid` represents the number of removals (`k`)
    const mid = left + ((right - left + 1) >> 1);

    if (isSubsequence(s, p, mid, letters)) {
      left = mid; //* We were successful, don't eliminate current candidate
    } else {
      right = mid - 1; //* We need a fewer number of removals
    }
  }

  //* The optimal number of removals
  return left;
}

console.log(maximumRemovals("abcd", "ad", [1, 2, 3])); //* 2
console.log(maximumRemovals("abcacb", "ab", [3, 1, 0])); //* 2
console.log(maximumRemovals("abcbddddd", "abcd", [3, 2, 1, 4, 5, 6])); //* 1
console.log(maximumRemovals("abcab", "abc", [0, 1, 2, 3, 4])); //* 0

//* Time: O(s log(r)) - Where `s` = s.length, and `r` = removable.length
//* The search space is halved in each iteration and within each iteration, we do O(n) work

//* Space: O(r) - The memory used scales with the `removable` input length (we used `split()`)
//* In a language that has mutable strings (C, C++, Rust etc.) this would be O(1) memory usage
