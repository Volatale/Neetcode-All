//* The number of matches played is always n - 1
//* If there are 6 teams, ultimately, regardless of the pairs, 5 matches must be played
function numberOfMatches(n) {
  return n - 1;
}

console.log(numberOfMatches(7)); //* 6
console.log(numberOfMatches(14)); //* 13
console.log(numberOfMatches(1)); //* 0
console.log(numberOfMatches(6)); //* 5
console.log(numberOfMatches(18)); //* 17
console.log(numberOfMatches(101)); //* 100
console.log(numberOfMatches(23)); //* 22

//* Time: O(1) - We only do one unit of work

//* Space: O(1) - The space usage remains constant regardless of the input size
