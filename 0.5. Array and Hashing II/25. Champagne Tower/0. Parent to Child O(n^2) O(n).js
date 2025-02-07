//* Similar to Pascal's Triangle, we work TOP DOWN, not BOTTOM UP
//*     - It is a lot easier to build the relationship from parent to child
//* Each parent has a child of "i" and "i + 1"
//* We only need to look at the previous row and current row, so only keep two rows in memory
//*     - prevRow represents the flow going INTO the prevRow[i]-th cup
//*     - currRow represents the current row
//* The children of the current node receive 0.5 times the flow from the parent
//* Calculate the EXTRA flow minus 1 (because the 1 cup is used here)
//* If extra > 0, then let the extra flow over into the children
function champagneTower(poured, query_row, query_glass) {
  //* How much flowed through ith glass
  let prevRow = [poured];

  for (let row = 1; row <= query_row; row++) {
    //* ith row has row + 1 glasses (row 0 has 1 glass, row 1 has 2 glasses etc)
    let currRow = new Array(row + 1).fill(0);

    //* Each glass has has at most two parents
    for (let i = 0; i < row; i++) {
      //* Subtract 1 because the 1 is used by THIS cup
      const extra = prevRow[i] - 1;

      //* The left and right children get HALF of the extra
      if (extra > 0) {
        currRow[i] += extra * 0.5;
        currRow[i + 1] += extra * 0.5;
      }
    }

    prevRow = currRow;
  }

  //* prevRow[i] = FLOW, not the actual amount there, clamp the value to (0, 1)
  return Math.min(1, prevRow[query_glass]);
}

console.log(champagneTower(1, 1, 1)); //* 0
console.log(champagneTower(4, 2, 2)); //* 0.25
console.log(champagneTower(2, 1, 1)); //* 0.5
console.log(champagneTower(100000009, 33, 17)); //* 1
console.log(champagneTower(1, 0, 0)); //* 1

//* Time: O(query_row^2) - The number of iterations scales with n * (n + 1) / 2

//* Space: O(query_row) - The memory used scales with the query row
