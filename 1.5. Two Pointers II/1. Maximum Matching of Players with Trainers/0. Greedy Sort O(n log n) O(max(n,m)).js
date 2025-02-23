//* Apply a greedy approach
//* We want to MAXIMIZE the amount of matches possible
//* So realistically, we should MINIMIZE the difference between player[i] and trainer[j]
//* In other words, if we SORT the arrays in ascending order
//* If a match DOES happen, we know we're matching with the lowest possible candidate
//* Which means the later matches have the highest chance to be possible
function matchPlayersAndTrainers(players, trainers) {
  let matched = 0;

  //* Sort the arrays to ensure we match with the MINIMUM necessary
  players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);

  let i = 0; //* Tracks current player
  let j = 0; //* Tracks current trainer

  while (i < players.length && j < trainers.length) {
    if (players[i] <= trainers[j]) {
      matched++; //* Successfully matched player and trainer
      i++, j++;
    } else {
      j++; //* Need a better trainer
    }
  }

  return matched;
}

console.log(matchPlayersAndTrainers([4, 7, 9], [8, 2, 5, 8])); //* 2
console.log(matchPlayersAndTrainers([1, 1, 1], [10])); //* 1
console.log(matchPlayersAndTrainers([4, 2, 3], [5, 8, 4])); //* 3
console.log(matchPlayersAndTrainers([6, 6, 5, 2], [1, 1, 1])); //* 0

//* Time: O(n log n + m log m) - We have to sort the arrays to ensure greedy works
//* Then, iterating over the arrays takes O(max(n, m))

//* Space: O(max(n, m)) - The built-in sorting array probably uses merge sort
//* So the memory usage scales with the length of the larger of the two arrays
