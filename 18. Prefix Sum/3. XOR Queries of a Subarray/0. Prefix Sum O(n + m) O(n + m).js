//* This is a regular prefix sum problem
//* XOR is commutative and associative
//*     - So the order of XORs does not matter at all
//* Since we need to answer (multiple) queries, we should create a prefix sum array
//*     - Or, in this case, a XOR prefix array
//* Then, all we have to do is use the following formula:
//*     - query = prefix[right] - prefix[left - 1]
//!         - Left - 1 because we want to exclude everything BEFORE left
//*         - A prefix sum of prefix[right] - prefix[left] would exclude prefix[left] itself
//*           which is not what we want, hence we exclude left - 1
//! If left === 0, then we don't need to XOR anything at all
//*     - left - 1 when left is 0 would take us out of bounds
//*     - So we just default to XORing by 0 (because n ^ 0 = n)
function xorQueries(arr, queries) {
  const result = new Array(queries.length).fill(0);
  const XORPrefix = new Array(arr.length).fill(0);
  XORPrefix[0] = arr[0];

  //* Calculate the XOR prefix sum of every index
  //* XORPrefix[i] = XORPrefix[i - 1] ^ arr[i] (works the same as regular prefix sums)
  for (let i = 1; i < arr.length; i++) {
    XORPrefix[i] = XORPrefix[i - 1] ^ arr[i];
  }

  //* Answer all of the queries
  //* Calculating prefix sums: arr[right] - arr[left - 1] (include arr[left] in sum)
  for (let i = 0; i < queries.length; i++) {
    const [left, right] = queries[i];

    //* left - 1 would be out of bounds, so XOR by 0 (just take prefix[right] as is)
    if (left === 0) {
      result[i] = XORPrefix[right];
      continue;
    }

    //* We WANT to XOR everything in the range [left, right] (inclusive)
    //* Like with regular prefix sums, [left - 1] allows us to leave [left] in the calculation
    result[i] = XORPrefix[right] ^ XORPrefix[left - 1];
  }

  return result;
}

console.log(
  xorQueries(
    [1, 3, 4, 8],
    [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 3],
    ]
  )
); //* [2, 7, 14, 8]

console.log(
  xorQueries(
    [4, 8, 2, 10],
    [
      [2, 3],
      [1, 3],
      [0, 0],
      [0, 3],
    ]
  )
); //* [8, 0, 4, 4]

console.log(
  xorQueries(
    [16],
    [
      [0, 0],
      [0, 0],
      [0, 0],
    ]
  )
); //* [16, 16, 16]

//* Time: O(n + m) - It takes O(n) to create the prefix sum array where "n" is arr.length
//* And then it takes O(m) to answer all of the queries where "m" is queries.length

//* Space: O(n + m) - The result array's size scales with queries.length (m)
//* And the XORPrefix array scales with arr.length (n)
