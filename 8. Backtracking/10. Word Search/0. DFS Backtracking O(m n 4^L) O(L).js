//* Call DFS on every element in the board array
//* Track the current element we are searching for
//* If they match, continue the search, if not, backtrack
//* Mark visited nodes as "#" so we don't use it twice
//* At each step, travel in all 4 directions
//*     - We are told we can move horizontally or vertically
function wordSearch(board, word) {
  function dfs(row, col, index) {
    //* Base Case; successfully found a path to word
    if (index === word.length) return true;

    if (
      isOutOfBounds(row, col) ||
      board[row][col] !== word[index] || //* Characters don't match
      board[row][col] === "#" //* Character already used
    ) {
      return false;
    }

    //* Save the character before marking as used
    const char = board[row][col];
    board[row][col] = "#";

    //* Explore every possible neighbor
    let res =
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row + 1, col, index + 1) ||
      dfs(row, col - 1, index + 1);

    //* Un-mark as used
    board[row][col] = char;
    return res;
  }

  function isOutOfBounds(row, col) {
    return row < 0 || row >= ROWS || col < 0 || col >= COLS;
  }

  const ROWS = board.length;
  const COLS = board[0].length;

  //* Try every possible character
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      //* Only explore that path if the initial char matches
      if (board[row][col] === word[0]) {
        if (dfs(row, col, 0)) {
          return true;
        }
      }
    }
  }

  return false;
}

console.log(
  wordSearch(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
);

console.log(
  wordSearch(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "SEE"
  )
);

console.log(
  wordSearch(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCB"
  )
);

//* Time: O(m * n * 4^L)
//* We iterate through every element in the array whether DFS is called or not
//* That alone takes O(m * n)
//* In the worst case, within each iteration, we call DFS
//* The DFS itself has a branching factor of 4 since we travel in all 4 directions
//* The depth of the recursion scales with the length of the word

//* Space: O(L) - The space is primarily used by the depth of the recursion
//* There can only be "L" consecutive recursive calls
