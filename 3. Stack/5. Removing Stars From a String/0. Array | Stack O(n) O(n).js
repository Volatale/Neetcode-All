//* We are given a string of stars (*) and characters
//* In one operation, we can choose a star, then remove the closest non-star to its left
//* Ultimately, we need to return the string after all of the stars have been removed
//*     - So we need to track the string as we go and perform the "deletions" on the spot
//* The easiest thing to do is simply remove the most recent character whenever we encounter a *
//! We can use a stack to get the "most recent" character since they support LIFO operations
function removeStars(s) {
  //* Use an array as a string builder
  const string = [];

  for (let char of s) {
    char !== "*" ? string.push(char) : string.pop();
  }

  return string.join("");
}

console.log(removeStars("leet**cod*e")); //* "lecoe"
console.log(removeStars("leet**")); //* "le"
console.log(removeStars("le*ll*w")); //* "llw"
console.log(removeStars("erase*****")); //* ""

//* Time: O(n) - We iterate over every character in the input string

//* Space: O(n) - The "stack" size grows linearly with the size of the input
