function rabinKarp(s, p) {
  let prime = 3;
  let pHash = 0;
  let sHash = 0;

  let m = p.length - 1;

  //* Build first hash
  for (let i = 0; i < p.length; i++) {
    pHash += p[i].charCodeAt(0) * prime ** i;
    sHash += s[i].charCodeAt(0) * prime ** i;
  }

  //* Find Matching Substrings
  for (let i = 0; i <= s.length - p.length; i++) {
    //* Even if they match, it could be a collision
    if (sHash === pHash) {
      let match = true;

      //* Check "j" characters ahead (check if substrings match)
      for (let j = 0; j < p.length; j++) {
        if (s[i + j] !== p[j]) {
          match = false;
          break;
        }
      }

      if (match) {
        return i;
      }
    }

    //* If we still have enough characters left
    if (i < s.length - p.length) {
      sHash -= s[i].charCodeAt(0);
      sHash /= prime;
      sHash += s[i + p.length].charCodeAt(0) * prime ** m;
    }
  }

  return -1;
}

console.log(rabinKarp("aaabaab", "aab")); //* 1
console.log(rabinKarp("aasonic", "sonic")); //* 2
console.log(rabinKarp("abc", "aab")); //* -1
console.log(rabinKarp("xyzxyzaabaab", "aab")); //* 6
console.log(rabinKarp("my name is mario", "mario")); //* 11
console.log(rabinKarp("mississippi", "issip")); //* 4

//* Time: O(n * m) - In the worst case, we get a lot of collisions, so we have to do a nested for loop a lot
//* It takes O(m) time to generate the first hash

//* Space: O(1) - We don't use any extra space, so the space complexity remains constant
