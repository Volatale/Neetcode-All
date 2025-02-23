//* We want to MAXIMIZE the amount of cookies given out
//* And we can ONLY give a single cookie to each child
//* So we want to give each child the MINIMUM-sized cookie they'll accept
//* This gives us the highest chance of having larger cookies for later children
//* Sort both arrays and use two pointers
//*     - If the current cookie doesn't work, it will NEVER work
//*         - So in that case, move to the next cookie
//*     - Else, move to the next child AND cookie
function findContentChildren(g, s) {
  //* There are no cookies to hand out
  if (s.length === 0) return 0;

  //* We want each child to get the MINIMUM sized cookie possible
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let cookiesGiven = 0;
  let i = 0; //* Tracks current child
  let j = 0; //* Tracks current cookie

  while (i < g.length && j < s.length) {
    if (g[i] <= s[j]) {
      //* Child accepts current cookie
      cookiesGiven++;
      i++, j++;
    } else {
      //* We need a larger cookie
      j++;
    }
  }

  return cookiesGiven;
}

console.log(findContentChildren([1, 2, 3], [1, 1])); //* 1
console.log(findContentChildren([1, 2], [1, 2, 3])); //* 2
console.log(findContentChildren([10, 10, 10], [9, 9, 9, 9])); //* 0
console.log(findContentChildren([4, 5, 6], [7, 8, 9])); //* 3

//* Time: O(n log n + m log m) - We have to sort the arrays to ensure greedy works
//* Then, iterating over the arrays takes O(max(n, m))

//* Space: O(max(n, m)) - The built-in sorting array probably uses merge sort
//* So the memory usage scales with the length of the larger of the two arrays
