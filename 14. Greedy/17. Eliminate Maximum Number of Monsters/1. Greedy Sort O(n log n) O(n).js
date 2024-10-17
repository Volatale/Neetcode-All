//* Each monster moves in ISOLATION
//*     - They cannot "catch up" to other monsters
//*     - Their speed will never change based on proximity or anything like that
//*         - Monsters travel at a CONSTANT rate
//* We need to know how long it'll take for each monster to reach us
//*     - dist[i] / speed[i] gives us the number of SECONDS needed for each monster to reach us
//! Logically speaking, we should SORT these times in ASCENDING order
//*     - A monster that will reach us in 10 seconds is irrelevant if there is one that'll reach us in 2 seconds
//* Then, we iterate through the array to find the number of monsters we can kill
//*     - "i" represents the number of seconds that have passed
//*     - And it technically ALSO represents the number of monsters we have killed
//* If secondsNeeded[i] <= i
//*     - It means the monster reached us before we were ready
//*     - So we return "i" (since this also represents the number of monsters killed)
//* Take a seconds array of [2, 2, 2, 3]
//*     - i = 0 for the first 2, so we can kill it
//*     - i = 1 for the second 2, so we can also kill it
//*     - i = 2 for the third 2, but we ran out of time, so we die
//!         - We still die if a recharge happens AND a monster reaches us at the same time
//*     - Thus, we return 2 since we managed to kill 2 monsters
//*     - If "i" = 0 and we ran out of time, we'd return 0 (since we managed to kill 0 monsters)
function eliminateMaximum(dist, speed) {
  //* There are no monsters to kill
  if (dist.length === 0) return 0;

  //* Calculate how many seconds are needed for each monster to reach us
  const secondsNeeded = dist
    .map((val, i) => dist[i] / speed[i])
    .sort((a, b) => a - b); //* Sort in Ascending order (closer monsters will reach us first)

  //* "i" represents how many seconds have passed (and also how many monsters we killed)
  for (let i = 0; i < secondsNeeded.length; i++) {
    //* The monster reached us before we could charge
    if (secondsNeeded[i] <= i) {
      return i;
    }
  }

  //* We managed to kill every monster
  return dist.length;
}

console.log(eliminateMaximum([1, 3, 4], [1, 1, 1])); //* 3
console.log(eliminateMaximum([1, 1, 2, 3], [1, 1, 1, 1])); //* 1
console.log(eliminateMaximum([3, 2, 4], [5, 3, 2])); //* 1
console.log(eliminateMaximum([1, 3, 4], [1, 1, 1])); //* 3
console.log(eliminateMaximum([5], [5])); //* 1
console.log(eliminateMaximum([1, 2, 3, 4], [1, 1, 1, 1])); //* 4
console.log(eliminateMaximum([52, 59, 32], [100, 100, 100])); //* 1
console.log(eliminateMaximum([4, 2, 8], [2, 1, 4])); //* 2

//* Time: O(n log n) - There are "n" monsters so it takes O(n) to create the new "seconds" array
//* Then, it takes O(n log n) to sort the array (assuming Quick, Merge or Heap sort are used)
//* Finally, it takes O(n) time in the worst case to play the game (we could potentially kill every monster)

//* Space: O(n) - There are "n" monsters, so the "seconds" array scales with n
//* Assuming merge sort is used, that will also use O(n) space
