//* Given a string `num` and an integer `k`, we need to remove `k` digits from `num`
//* The goal is to return the SMALLEST possible integer (as a string) after the removals
//* Therefore, this is an optimization problem
//* Mathematically, we know that 1 < 2 < 3 < ... < 9 etc
//* However, we also know that when comparing numbers, whichever one has a smaller PRECEDING digit is smaller
//* Thus, we want to keep the smaller preceding digits, and remove the larger subsequent digits
//* Remove the most significant numbers first
//! Ideally, we find the NEXT SMALLER ELEMENT of everything
//*     - Finding the NSE of the current element means we KNOW that it is smaller than what's ontop of the stack
//* This involves using a monotonically increasing stack
//* Pop the top while we have a number < top of stack and count < k
//* Why? Because if we find a SMALLER number than what's on top, we can make the value smaller
//*     - By popping the top of the stack (the larger value), we end up with a smaller number overall
//* There is an edge case where after adding everything to the stack, we still haven't removed all "k" digits
//* In which case, just keep popping the stack until we have removed everything
//*     - This mainly works because we have a monotonically INCREASING stack
//*     - Therefore we know that the elements on TOP of the stack are greater, so removing them reduces the value more
//! Additionally, avoid adding leading zeroes to the stack
//*     - If the stack's length is 0, and the digit is 0, don't add the 0 to the stack
//*     - This would result in a leading 0
//* If we were converting the string into a number at the end, this wouldn't be a big problem
//*     - For example, "00123" would be turned into "123"
//*     - However, we are keeping a string, so the leading 0s would be included
function removeKDigits(num, k) {
  if (num.length <= k) return "0";

  const stack = []; //* Monotonically increasing stack
  let removed = 0;

  for (let i = 0; i < num.length; i++) {
    const digit = parseInt(num[i]);

    //* Find the Next Smaller Element for exactly "k" digits
    while (stack.length > 0 && digit < stack[stack.length - 1] && removed < k) {
      stack.pop();
      removed++;
    }

    //* Avoid adding leading zeroes
    if (stack.length === 0 && digit === 0) continue;

    stack.push(digit);
  }

  //* If removed < k, there haven't yet been "k" removals
  while (stack.length > 0 && removed < k) {
    stack.pop();
    removed++;
  }

  return stack.length > 0 ? stack.join("") : "0";
}

console.log(removeKDigits("1432219", 3)); //* "1219"
console.log(removeKDigits("10200", 1)); //* "200"
console.log(removeKDigits("10", 2)); //* "0"
console.log(removeKDigits("54321", 4)); //* "1"

//* Time: O(n + k) - The time taken scales with the input size + k, in the worst case
//* If we iterate through the string and the numbers are sequentially decreasing
//* Then we still have to do "k" iterations to pop the top "k" elements

//* Space: O(n) - The memory usage scales with the input size; in the worst case, we don't remove anything
//* Plus, we may end up creating a string of equal size to the input
