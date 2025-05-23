//* We need to hand out cookies to children, but each child should get AT MOST one cookie
//* Each child has a greed factor greed[i], which indicates the MINIMUM size cookie the ith child is fine with
//* Each cookie has a size size[j], which indicates the size of the jth cookie
//* We want to MAXIMIZE the number of `content` children
//*     - In other words, we want to optimize our cookie choices
//! The key here is that ideally, we minimize the size of each cookie given out
//* We don't want to give a child a larger cookie than need be
//* So logically speaking, we should sort BOTH the children AND the cookies
//* This allows us to start with the minimum sized cookie AND the child who is most likely to want it
//! By giving each child the minimum cookie necessary, we increase the chance that LATER children can receive a cookie
//* We are applying a greedy approach, and using two pointers to track the next child/cookie pairing
//* There are only two cases that can occur:
//*     - Child accepts the cookie, in which case increment both pointers (each child gets ONE cookie)
//*     - Child does NOT accept the cookie, increment the cookie pointer to find a larger cookie
//! Since the array exhibits monotonicity (it is sorted), we can potentially find a larger cookie to the right of this one
function findContentChildren(g, s) {
  //* There are no cookies to hand out
  if (s.length === 0) return 0;

  //* Sorting in ascending order ensures we always give the MINIMUM cookie each time
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let cookies = 0;
  let i = 0; //* Track next child
  let j = 0; //* Tracks next cookie

  while (i < g.length && j < s.length) {
    if (g[i] <= s[j]) {
      cookies++; //* Child accepts the cookie
      i++, j++;
    } else {
      j++; //* We need a larger cookie
    }
  }

  return cookies;
}

console.log(findContentChildren([1, 2, 3], [1, 1])); //* 1
console.log(findContentChildren([1, 2], [1, 2, 3])); //* 2
console.log(findContentChildren([10, 10, 10], [9, 9, 9, 9])); //* 0
console.log(findContentChildren([4, 5, 6], [7, 8, 9])); //* 3

//* Time: O(n log n + m log m)) - Both input arrays can have a different size
//* Thus, the time needed scales with the time needed to sort both arrays

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
