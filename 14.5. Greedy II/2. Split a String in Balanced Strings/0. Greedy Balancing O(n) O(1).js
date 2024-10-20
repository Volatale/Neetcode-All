//* We want to use the MINIMUM amount of characters for each split
//*     - Maximizing string length when splitting would leave us with LESS characters
//*     - Minimizing the length means we have more characters overall to split later
//* If we can split at index 2 and at index 6
//*     - We should split at BOTH of those indices
//*         - Splitting ONLY at 6 means we only managed to split once
//*         - Whereas splitting at 2 lets us ALSO split at 2 (so we get two splits instead of one)
//* Instead of using two variables to track the number of R and L
//*     - We can use a single variable count - increment on R and decrement on L
//*     - Whenever the count is 0, we know the string is balanced
//*         - So we can split here
function balancedStringSplit(s) {
  let substrings = 0;
  let balance = 0; //* Increment on R, decrement on R

  for (let i = 0; i < s.length; i++) {
    s[i] === "R" ? balance++ : balance--;

    //* Substring is balanced, so split here
    if (balance === 0) {
      substrings++;
    }
  }

  return substrings;
}

console.log(balancedStringSplit("RLRRLLRLRL")); //* 4
console.log(balancedStringSplit("RLRRRLLRLL")); //* 2
console.log(balancedStringSplit("LLLLRRRR")); //* 1
console.log(balancedStringSplit("LRLRLLR")); //* 2
console.log(balancedStringSplit("LRLRLR")); //* 3

//* Time: O(n) - We iterate through the entire string once
//* So the time taken scales with the input size

//* Space: O(1) - We are only using constant space variables
