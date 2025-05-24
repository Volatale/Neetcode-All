//* We are given an array of players where players[i] represents the ability of the ith player
//* We are also given an array of trainers where trainers[j] represents the training capacity of the jth trainer
//* The goal is to match players with trainers, but we can only match them if the player's ability is <= the trainer's capacity
//* Additionally, each player can only be matched with ONE trainer
//* The goal is to MAXIMIZE the number of matchings between players and trainers
//*     - In other words, we want to optimize our player-to-trainer pairings
//! The key here is that we want to minimize the training capacity at every given point
//*     - We don't want to match a player with a trainer that far exceeds their ability
//* So logically speaking, we should sort BOTH the players AND the trainers
//* This allows us to start with the minimum-ability player AND the trainer who is the best fit
//! By giving each player the minimum trainer necessary, we increase the chance that LATER players can be matched
//* We are applying a greedy approach, and using two pointers to track the next player/trainer pairing
//* There are only two cases that can occur:
//*     - Player accepts the trainer, in which case increment both pointers (each player gets ONE trainer)
//*     - Player does NOT accept the trainer, increment the trainer pointer to find a better trainer
//! Since the array exhibits monotonicity (it is sorted), we can potentially find a better trainer to the right of this one
function matchPlayersAndTrainers(players, trainers) {
  //* There are no cookies to hand out
  if (players.length === 0) return 0;

  //* Sorting in ascending order ensures we always assign the MINIMUM-ability trainer necessary
  players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);

  let matched = 0;
  let i = 0; //* Track next playeer
  let j = 0; //* Tracks next trainer

  while (i < players.length && j < trainers.length) {
    if (players[i] <= trainers[j]) {
      matched++; //* Player accepts trainer
      i++, j++;
    } else {
      j++; //* We need a better trainer
    }
  }

  return matched;
}

console.log(matchPlayersAndTrainers([4, 7, 9], [8, 2, 5, 8])); //* 2
console.log(matchPlayersAndTrainers([1, 1, 1], [10])); //* 1
console.log(matchPlayersAndTrainers([4, 2, 3], [5, 8, 4])); //* 3
console.log(matchPlayersAndTrainers([6, 6, 5, 2], [1, 1, 1])); //* 0

//* Time: O(n log n + m log m)) - Both input arrays can have a different size
//* Thus, the time needed scales with the time needed to sort both arrays

//* Space: O(sort) - The memory usage scales with the sorting algorithm used
