//* We need to get a prefix AND a suffix simultaneously
//* This entails checking TWO characters at the same time
//* So why not just use a Two pointer Approach?
//*     - left starts at index 0 and tracks prefixes
//*     - right starts from s.length - 1 and tracks suffixes
//* Ultimately, the goal is to ensure both left and right point to the same character
//* We can match any number of the same character consecutively
//* So if we had "abbaa"
//*     - Then left would point to index 1 after the first loop iteration
//*     - And right would point to index 2 (because we found TWO "a")
function minimumLength(s) {
  //* We can't remove any characters
  if (s.length <= 1) return s.length;

  let left = 0; //* For prefix characters
  let right = s.length - 1; //* For suffix characters
  let char = ""; //* The current char both pointers must equal

  while (left < right && s[left] === s[right]) {
    char = s[left]; //* Both pointers must point to this character

    while (left < right && s[left] === char) left++;
    while (left < right && s[right] === char) right--;
  }

  //* If s[left] === last deleted char, you deleted the entire string (xyx)
  return s[left] === char ? 0 : right - left + 1;
}

console.log(minimumLength("aaaa")); //* 0
console.log(minimumLength("ca")); //* 2
console.log(minimumLength("cabaabac")); //* 0
console.log(minimumLength("aabccabba")); //* 3
console.log(minimumLength("w")); //* 1
console.log(minimumLength("")); //* 0
console.log(minimumLength("aa")); //* 0
// console.log(minimumLength("cac")); //* 1
