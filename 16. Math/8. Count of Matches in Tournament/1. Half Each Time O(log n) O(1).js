//* Matches Played in a round = teamsLeft / 2
//* The number of teams left is always either matches played or matches played + 1
function numberOfMatches(n) {
  if (n === 1) return 0;

  let teamsLeft = n;
  let matches = 0;

  while (teamsLeft > 1) {
    //* Matches played is always n / 2
    const matchesPlayed = teamsLeft >> 1;

    if (teamsLeft % 2 === 0) {
      teamsLeft = matchesPlayed;
    } else {
      teamsLeft = matchesPlayed + 1; //* Add the team that wasn't paired
    }

    matches += matchesPlayed;
  }

  return matches;
}

console.log(numberOfMatches(7)); //* 6
console.log(numberOfMatches(14)); //* 13
console.log(numberOfMatches(1)); //* 0
console.log(numberOfMatches(6)); //* 5
console.log(numberOfMatches(18)); //* 17
console.log(numberOfMatches(101)); //* 100
console.log(numberOfMatches(23)); //* 22

//* Time: O(log(n)) - We are continuously dividing by 2 each iteration
//* The calculations happening within each iteration take constant time

//* Space: O(1) - The space usage remains constant regardless of the input size
