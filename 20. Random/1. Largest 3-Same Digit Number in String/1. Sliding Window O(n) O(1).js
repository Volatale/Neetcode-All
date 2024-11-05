function largestGoodInteger(num) {
  //* There aren't three characters
  if (num.length < 3) return "";

  let goodString = "";
  let start = 0;
  let end = 0;

  const uniqueDigits = new Set(); //* Tracks unique digits
  const freq = {}; //* Tracks frequency of digits in window

  while (end < num.length) {
    //* Add 1 to frequency of occurrences
    freq[num[end]] = (freq[num[end]] || 0) + 1;

    //* Add digit to unique digits
    if (freq[num[end]] > 0) {
      uniqueDigits.add(num[end]); //* {7}
    }

    if (end - start + 1 === 3) {
      if (uniqueDigits.size === 1) {
        const value = num.substring(start, end + 1);

        //* Found new largest good string (also handles "000" case)
        if (value > goodString || value.length > goodString.length) {
          goodString = value;
        }
      }

      //* Decrement ocurrence of start of window
      freq[num[start]]--;

      //* Remove it from the hashtable & set
      if (freq[num[start]] === 0) {
        delete freq[num[start]];
        uniqueDigits.delete(num[start]);
      }

      start++;
    }

    end++;
  }

  //* If goodString is "", we didn't find a good string
  return goodString !== "" ? goodString.toString(10) : "";
}

console.log(largestGoodInteger("6777133339")); //* "777"
console.log(largestGoodInteger("2399918")); //* "999"
console.log(largestGoodInteger("3222444555888")); //* "888"
console.log(largestGoodInteger("42352338")); //* ""
console.log(largestGoodInteger("230001119")); //* "111"
console.log(largestGoodInteger("000")); //* "000"

//* Time: O(n) - We iterate through the entire string once
//* Within each iteration, in the worst case, we do an O(3) (O(1)) substring() call
//* Since 3 is a constant, it simplifies to O(1)

//* Space: O(1) - The frequency map and set cannot store more than 3 characters each
//* And the string(s) created via substring() will always be of length 3
