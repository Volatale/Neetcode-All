//* We can try every possible configuration of envelopes
//* Try using each of the envelopes as the "base"
//* Then, try adding every OTHER envelope ontop of the previous
//* We can't reuse the same envelope, so track what we have already used
function maxEnvelopes(envelopes) {
  function backtracking(prevWidth, prevHeight) {
    let nested = 0;

    //* Try every possible configuration of envelopes
    for (let i = 0; i < envelopes.length; i++) {
      const [width, height] = envelopes[i];

      //* Only include the current envelope if its width and height are GREATER
      if (!used[i] && width > prevWidth && height > prevHeight) {
        used[i] = true;
        nested = Math.max(nested, backtracking(width, height) + 1);
        used[i] = false;
      }
    }

    return nested;
  }

  //* There is only 1 envelope
  if (envelopes.length === 1) return 1;

  //* Tracks what we have already used in this stack frame
  const used = new Array(envelopes.length).fill(false);

  //* We initially start with no "base" envelope
  return backtracking(-Infinity, -Infinity);
}

console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ])
); //* 3

console.log(
  maxEnvelopes([
    [1, 1],
    [1, 1],
    [1, 1],
  ])
); //* 1

console.log(
  maxEnvelopes([
    [1, 3],
    [4, 5],
  ])
); //* 2

console.log(maxEnvelopes([[6, 6]])); //* 1

//* Time: O(n!) - There are originally "n" choices for a base envelope
//* Then, at each successive level of recursion, the number of choices reduces by 1

//* Space: O(n) - The depth of the recursion stack is "n" at most
//* We also create a "used" array whose length scales with the input length (n)
