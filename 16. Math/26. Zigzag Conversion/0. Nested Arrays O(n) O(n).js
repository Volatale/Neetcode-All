//* Store each row of characters in a different array
//* Bounce between these rows using a variable
//* Whenever the current row is 0 or row === numRows - 1
//*     - Change directions; the next character goes in the opposite row
//* At the end, simply convert each row into a string and combine all of the strings
function convert(s, numRows) {
  //* There is only 1 row, so return the input string
  if (numRows === 1) return s;

  const letters = new Array(numRows).fill(0).map(() => new Array());
  let row = 0;
  let increasing = true; //* Tells us whether to increase or decrease row

  //* Iterate over every character and determine where to put it
  for (let i = 0; i < s.length; i++) {
    letters[row].push(s[i]);

    increasing ? row++ : row--;

    //* Swap directions
    if (row === 0 || row === numRows - 1) {
      increasing = !increasing;
    }
  }

  //* Combine all of the characters into one string
  return letters.reduce((str, curr) => str + curr.join(""), "");
}

console.log(convert("PAYPALISHIRING", 3)); //* "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); //* "PINALSIGYAHRPI"
console.log(convert("A", 1)); //* "A"

//* Time: O(n) - It takes O(numRows) to create the letters array(s)
//* Them, we iterate over the entire input string (which takes O(n))
//* Finally, we call reduce and join() every array to create the final string
//* The number of join() calls scales with s.length / numRows, but numRows is a constant

//* Space: O(n) - Ultimately, we create a string of equal length to the input
//* We also create s.length / numRows nested arrays to hold each of these characters
