//* We could do this in a brute force manner, but that would increase the constant factor
//* Since we specifically need a substring of length 3
//*     - We can start iterating from index 2 and check the previous 2 characters
//* If all three characters are the same, we know we found a triplet
//*     - If that is the case, update "largest" if num[i] > largest
//*     - Then, mark "found" as true
//* We intially assume the largest digit found is 0
//*     - Then, if "found", we know can simply convert "largest" to a string
//*     - And from there, repeat the string 3 times to get our triplet number
//! We check if largest is 0 AS WELL as !found because:
//*     - Simply checking for !found, means we may run into some edge cases
function largestGoodInteger(num) {
  //* There aren't 3 consecutive digits to test
  if (num.length < 3) return "";

  let found = false; //* Helps handle "000" case
  let largest = 0; //* Assume 0 has been found (so we can handle "000")

  //* Check the previous 2 characters for triplets
  for (let i = 2; i < num.length; i++) {
    if (num[i - 2] === num[i - 1] && num[i - 1] === num[i]) {
      largest = Math.max(largest, num[i]);
      found = true;
    }
  }

  return largest === 0 && !found ? "" : largest.toString().repeat(3);
}

console.log(largestGoodInteger("6777133339")); //* "777"
console.log(largestGoodInteger("2300019")); //* "000"
console.log(largestGoodInteger("123456789")); //* ""
console.log(largestGoodInteger("42352338")); //* ""
console.log(largestGoodInteger("111222333444555")); //* "555"
console.log(largestGoodInteger("999888999888999")); //* "999"
console.log(largestGoodInteger("101010010110")); //* ""

//* Time: O(n) - We have to iterate through the entire string
//* So the time taken scales with the size of the input (num)

//* Space: O(1) - We are either returning an empty string, or a string of length 3
//* So we can simply say the space complexity does not scale with the input size
