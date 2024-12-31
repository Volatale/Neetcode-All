//* We can avoid the need to perform "carrying" by using simple addition
//* Then, since we are processing binary digits, we can get the LSB using "num & 1"
//* After which, we can right shift by 1 place to remove the recently processed LSB
//* Keep doing this until every digit has been processed
//* Lastly, reverse the array and convert the array into a string
//*     - Why reverse? Because we are processing digits right to left
//*     - When we should really be processing them left to right
function addBinary(a, b) {
  const result = [];

  let num = parseInt(a, 2) + parseInt(b, 2); //* Represents the value for a and b combined

  while (num > 0) {
    result.push(num & 1);
    num >>= 1;
  }

  return result.reverse().join("");
}

console.log(addBinary("11", "1")); //* "100"
console.log(addBinary("1010", "1011")); //* "10101"
console.log(addBinary("1", "1")); //* "10"
console.log(addBinary("11", "11")); //* "110"

//* Time: O(a + b) - parseInt() itself takes O(a), where a is the length of the string itself
//* Then, since we are processing "binary" digits, the number of times we can divide by 2 scales with log2(a + b)
//* We have two inputs, both of which can differ in length

//* Space: O(max(a, b)) - The result's size scales with the max length between a and b
