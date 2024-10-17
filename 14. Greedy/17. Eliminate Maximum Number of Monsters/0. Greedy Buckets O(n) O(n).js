//* Track the number of monsters that will be attacking at each second
//! We only really care about the monsters whose arrivalTime < n
//*     - We can kill a monster every second, so "n" technically tells us our max no. of shots
//*     - If "i" === n
//*         - We are either already dead
//*         - Or every monster will be guaranteed to be killed
//* The greedy nature comes from the fact that we don't have to EXPLICITLY sort
//*     - By keeping "buckets" of monsters and their attack times, we still end up with the sorted order
//*     - The logic is similar to counting sort
//*         - Everything is IMPLICITLY sorted due to how indices work (monotonically increasing numbers)
//* If kills + monsters[i] > i
//*     - It means to kill all of the monsters here, we'd need more seconds
//*     - Since we can't GET any more seconds, the game ends here
//* Think of it this way
//*     - Any monster whose arrivalTime > n is far enough away that we can kill them from afar
//*     - The only monsters that actually pose a threat are the ones whose arrivalTime < n
//*         - Those are the ones that will get to us the fastest
//* Take this example monsters array: [2, 2, 3, 3]
//*     - 2 monsters attack at second 2, and 2 attack at second 3
//*         - There could be MORE that we are not counting, but they won't get to us
//*     - At i = 0, we can kill the first
//*     - At i = 1, we can kill the second
//*     - At i = 2 we can kill the third
//*     - At i = 3, we can't kill the last, because i === 3
//*         - Like I said, after the last monster, we are either dead or THEY will all die eventually
function eliminateMaximum(dist, speed) {
  //* There are no monsters to kill
  if (dist.length === 0) return 0;

  const n = dist.length;

  //* monsters[i] = Number of monsters attacking at the "ith" second
  const monsters = new Array(n).fill(0);
  let kills = 0;

  //* Determine how many monsters are attacking at each second
  for (let i = 0; i < n; i++) {
    //* No. of seconds for monster to reach us (ceil because seconds are integers)
    const arrivalTime = Math.ceil(dist[i] / speed[i]);

    //* Only monsters whose arrivalTime < n actually pose a threat
    if (arrivalTime < n) {
      monsters[arrivalTime]++;
    }
  }

  //* Determine how many monsters we can kill
  for (let i = 0; i < n; i++) {
    //* We don't have enough shots left
    if (kills + monsters[i] > i) {
      return i;
    }

    kills += monsters[i];
  }

  //* We managed to kill every monster
  return n;
}

console.log(eliminateMaximum([1, 3, 4], [1, 1, 1])); //* 3
console.log(eliminateMaximum([1, 1, 2, 3], [1, 1, 1, 1])); //* 1
console.log(eliminateMaximum([3, 2, 4], [5, 3, 2])); //* 1
console.log(eliminateMaximum([1, 3, 4], [1, 1, 1])); //* 3
console.log(eliminateMaximum([5], [5])); //* 1
console.log(eliminateMaximum([1, 2, 3, 4], [1, 1, 1, 1])); //* 4
console.log(eliminateMaximum([52, 59, 32], [100, 100, 100])); //* 1
console.log(eliminateMaximum([4, 2, 8], [2, 1, 4])); //* 2
console.log(eliminateMaximum([4, 4, 9, 9], [2, 2, 3, 3])); //* 3

//* Time: O(nn) - There are "n" monsters so it takes O(n) to create the new "monsters" array
//* We then iterate through the array to determine how many monsters are arriving at each second (O(n))
//* And finally we iterate again to count how many monsters we can kill

//* Space: O(n) - There are "n" monsters, so the "monsters" array scales with n
