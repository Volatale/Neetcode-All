//* All we have to do is perform addition (but with binary instead of decimal numbers)
//! This version is better because it has zero risk of an overflow
//*     - The brute force version DOES have a risk of overflow, which makes it unreliable
function addBinary(a, b) {
  const result = [];

  let i = a.length - 1; //* Tracks progress through a
  let j = b.length - 1; //* Tracks progress through b
  let carry = 0;

  //* Process all of the digits in both a and b, and handle the (potential) remaining carry
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry;

    if (i >= 0) {
      sum += parseInt(a[i--]);
    }

    if (j >= 0) {
      sum += parseInt(b[j--]);
    }

    //* Calculate binary digit and carry
    result.push(String(sum & 1)); //* (1 & 1) = 1
    carry = sum >> 1; //* (2 / 2) = 1
  }

  return result.reverse().join("");
}

console.log(addBinary("11", "1")); //* "100"
console.log(addBinary("1010", "1011")); //* "10101"
console.log(addBinary("1", "1")); //* "10"
console.log(addBinary("11", "11")); //* "110"

//* Time: O(max(a, b)) - The time taken scales with the maximum length between a and b
//* If a = 0b1 and b = 0b10000, then there are 5 digits to process (max(1, 16))

//* Space: O(max(a, b)) - The result's size scales with the max length between a and b
