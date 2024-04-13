function KMP(s, p) {
  const dp = new Array(p.length).fill(0); //* Failure function
  let j = 0;

  //* Failure Function (start at i = 1 because that is the first index of p)
  for (let i = 1; i < p.length; i++) {
    //* While the characters do not match
    while (j > 0 && p[j] !== p[i]) {
      j = dp[j - 1];
    }

    //* Update the failure function
    if (p[j] === p[i]) {
      dp[i] = j + 1;
      j++;
    }
  }

  //* Reset j, it is supposed to track the progress through "p"
  j = 0;

  //* Find substrings
  for (let i = 0; i < s.length; i++) {
    while (j > 0 && s[i] !== p[j]) {
      j = dp[j - 1];
    }

    if (s[i] === p[j]) {
      j++;
    }

    if (j === p.length) {
      return i - j + 1; //* +1 handles the offset
    }
  }

  return -1;
}

console.log(KMP("aaabaab", "aab")); //* [1, 4]

console.log(KMP("aasonic", "sonic")); //* [2]
console.log(KMP("abc", "aab")); //* []
console.log(KMP("xyzxyzaabaab", "aab")); //* [6, 9]
console.log(KMP("my name is mario", "mario")); //* [11]
console.log(KMP("mississippi", "issip")); //* [4]

//* Time: O(n + m) - It takes O(m) time to build the failure function
//* Then it takes O(n) time to iterate over "s"

//* Space: O(m) - We have to build the failure function that is proportional to the length of "p"
