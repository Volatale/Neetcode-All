//* All we have to do is simulate addition from right to left
//* If we have 6 + 7, then we know that should = 13
//* But in mathematics, usually we say that we have to "carry the 1"
//*     - In this case, the "1" represents an extra ten
//* And then in the units place, we place a 3
//* num = [6], k = 7
//*     - [1, 3] is what we should end up with
//* sum % 10 gives us the current digit
//*     - This is mainly because carry is being divided by 10 in each iteration
//*     - Thus, the digit we get from (sum % 10) is (also) changing each iteration
function addToArrayForm(num, k) {
  const result = [];
  let carry = k; //* The carry starts off as "k" itself

  //* Keep looping while we still have digits to process, or a carry is in process
  for (let i = num.length - 1; i >= 0 || carry > 0; i--) {
    const digit = i >= 0 ? num[i] : 0; //* If i = -1, then we are out of bounds
    const sum = digit + carry; //* 6 + 7 = 13, so we have a carry of 1 (in the 10s place)
    result.push(sum % 10); //* Get the rightmost digit (in the above case, that would be 3)
    carry = Math.floor(sum / 10); //* Calculate what the carry should be
  }

  return result.reverse();
}

console.log(addToArrayForm([1, 2, 0, 0], 34)); //* [1, 2, 3, 4] (1200 + 34 = 1234)
console.log(addToArrayForm([2, 7, 4], 181)); //* [4, 5, 5] (274 + 181 = 455)
console.log(addToArrayForm([2, 1, 5], 806)); //* [1, 0, 2, 1] (215 + 806 = 1021)
console.log(addToArrayForm([9, 9, 9], 9)); //* [1, 0, 0, 8] (999 + 9 = 1008)

//* Time: O(num + k) - In the worst case, we iterate through the entire array
//* Then, there is a possibility we have to perform one more iteration (for the final carry)

//* Space: O(num + k) - If we have num = 1, and k = 9999, then the final array would have 5 slots
