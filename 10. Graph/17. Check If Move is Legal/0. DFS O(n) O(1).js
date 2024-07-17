//* We have to keep traveling in the SAME DIRECTION
//* If we encounter a cell that is the OPPOSITE, keep going
//* If we encounter the SAME color cell
//*     - return length >= 3
//!         - VALID good lines are lnegth 3 or longer
//!         - Thus, if a line is LESS than 3 length, it cannot be considered a good line
//* The FIRST cell is automatically counted since we START there
function checkMove(board, rMove, cMove, color) {
  function legal(row, col, color, direction) {
    //* We already know what color the FIRST is, so we have length 1
    const [r, c] = direction;
    row += r;
    col += c;

    //* Track the length of the line
    let length = 1;

    //* Keep traveling in the same direction
    while (inBounds(row, col)) {
      length++;

      if (board[row][col] === ".") return false; //* We broke our line
      if (board[row][col] === color) return length >= 3; //* Found a valid good line

      //* Move to the next cell in the same direction
      row += r;
      col += c;
    }

    //* No good lines
    return false;
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = board.length;
  const COLS = board[0].length;

  const directions = [
    [-1, 0], //* Up
    [-1, 1], //* Up Right
    [0, 1], //* Right
    [1, 1], //* Down Right
    [1, 0], //* Down
    [1, -1], //* Down Left
    [0, -1], //* Left
    [-1, -1], //* Up Left
  ];

  //* Explore every direction
  for (const d of directions) {
    if (legal(rMove, cMove, color, d)) return true;
  }

  return false;
}

console.log(
  checkMove(
    [
      [".", ".", ".", "B", ".", ".", ".", "."],
      [".", ".", ".", "W", ".", ".", ".", "."],
      [".", ".", ".", "W", ".", ".", ".", "."],
      [".", ".", ".", "W", ".", ".", ".", "."],
      ["W", "B", "B", ".", "W", "W", "W", "B"],
      [".", ".", ".", "B", ".", ".", ".", "."],
      [".", ".", ".", "B", ".", ".", ".", "."],
      [".", ".", ".", "W", ".", ".", ".", "."],
    ],
    4,
    3,
    "B"
  )
);

//* Time: O(n) - In the worst case, we explore the entire line
//* A line's max lengthb is 8 (8 x 8 grid)
//* We do this 8 times in the worst case (O(8 * n) === O(n))

//* Space: O(1) - The directions array is always 8 length
//* There is only 1 call to the "legal" function, so the depth of the recursion is 1
