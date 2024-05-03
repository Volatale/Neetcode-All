//* We want to find the Next Smaller Element (k times in total)
//* So we should use a stack
//* We want to remove the most significant numbers FIRST
//* Convert the current element to an integer so we can compare it with the peek element
//* While stack is not empty, and the current element < what is on top of the stack
//* Pop the stack and increment count - We can ONLY pop "k" elements total
//* This lets us find the Next Smaller Element - [4], element to add = 1
//* Pushing this would mean leading with a zero, which is forbidden
//* 1 < 4, so we pop 5, which leaves us with []. Then we add 1 -> [1]
//* If stack is empty, and digit is 0, continue
//* At the end, if we STILL haven't removed k elements
//* We need to pop from the end until count === k
//* The solution is optimal going left to right
//* So now we remove the remaining digits from the right
//* 12345, count = 2, k = 3 -> pop the 5 === 1234
//* The key here is that the inner while loop won't activate, so WE do it by force
function removeKDigits(num, k) {
  //* Because removing every digit results in 0
  if (num.length <= k) return "0";

  const stack = []; //* Monotonically Increasing Stack
  let count = 0;

  for (let i = 0; i < num.length; i++) {
    const digit = parseInt(num[i]);

    //* Find the Next Smaller Element, but we can only remove "k" elements
    while (stack.length > 0 && digit < stack[stack.length - 1] && count < k) {
      stack.pop();
      count++;
    }

    //* Leading zeroes are forbidden
    if (stack.length === 0 && digit === 0) continue;

    stack.push(digit);
  }

  //* If count < k, we haven't removed K elements yet- Remove them from the END
  //* This will ALWAYS result in a smaller number (less digits)
  while (stack.length > 0 && count < k) {
    stack.pop();
    count++;
  }

  //* If the stack is empty, we want to return "0" instead of ""
  return stack.length > 0 ? stack.join("") : "0";
}

console.log(removeKDigits("1432219", 3)); //* "1219"
console.log(removeKDigits("10200", 1)); //* "200"
console.log(removeKDigits("10", 2)); //* "0"

//* Time: O(n) - The time taken scales with the input size
//* At worst, we process every element twice, so that would be O(2n)
//* But O(2n) simplifies to O(n)

//* Space: O(n) - The space complexity also scales with the input size
//* At worst, the stack contains the same number of elements as the input
//* "12345" -> [1, 2, 3, 4, 5], both with length of 5
//* We didn't manage to find the Next Smaller Element, so the while loop was never triggered
