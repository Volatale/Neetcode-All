//* Push non-stars to the array
//* Pop when we find a star
function removingStarsFromAString(s) {
  //* String Builder
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join("");
}

console.log(removingStarsFromAString("leet**cod*e")); //* "lecoe"
console.log(removingStarsFromAString("leet**")); //* "le"
console.log(removingStarsFromAString("le*ll*w")); //* "llw"
console.log(removingStarsFromAString("erase*****")); //* ""

//* Time: O(n) - We iterate over the entire string, so the time taken scales with "n"

//* Space: O(n) - In the worst case, every character is a non-star
//* So for example: ["s", "o", "n", "i", "c"] returns "sonic"
