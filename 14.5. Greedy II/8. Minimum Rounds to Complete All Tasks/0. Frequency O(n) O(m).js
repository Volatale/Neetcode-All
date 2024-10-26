//* Each group of tasks needs to be decomposed into groups of 2 or 3
//*     - Ideally, we want to use as many 3 groups as possible
//*     - Then form a 2 group using the remainder
//* Get the frequency of every task
//*     - If the frequency of the current task is 1, return -1
//*         - It is impossible to solve all of the tasks in this case
//*     - Otherwise, it is definitely possible to decompose the frequency
//* If freq % 3 === 0
//*     - Then we can evenly split this task into groups of 3
//*     - This results in the minimum number of "rounds" needed
//*         - rounds += freq / 3
//* Else
//*     - We will need one extra round of 2
//*     - rounds += Math.floor(freq / 3) + 1
//*         - For example, 5 can be built using (3 + 2) = 5
//*         - 8 can be built using (3 + 3 + 2) = 8
//*         - 11 can be built using (3 + 3 + 3 + 2) = 11
//*     - 8 % 3 = 2, so there is two left over
//*         - Hence we need one extra round to handle these tasks
function minimumRounds(tasks) {
  //* There needs to be 2 tasks minimum
  if (tasks.length < 2) return -1;

  const freqMap = {};
  let rounds = 0;

  for (let i = 0; i < tasks.length; i++) {
    freqMap[tasks[i]] = (freqMap[tasks[i]] || 0) + 1;
  }

  //* Try to solve as many tasks as we can 3 at a time
  for (let [_, freq] of Object.entries(freqMap)) {
    if (freq === 1) return -1; //* Can't complete this task

    if (freq % 3 === 0) {
      //* We can solve task in 3s
      rounds += freq / 3;
    } else {
      //* We need one additional round to handle excess
      rounds += Math.floor(freq / 3) + 1;
    }
  }

  return rounds;
}

console.log(minimumRounds([3, 3, 3, 3, 3])); //* 2
console.log(minimumRounds([2, 2, 3, 3, 2, 4, 4, 4, 4, 4])); //* 4
console.log(minimumRounds([2, 3, 3])); //* -1
console.log(minimumRounds([1])); //* -1
console.log(minimumRounds([5, 2, 1])); //* -1
console.log(minimumRounds([5, 5])); //* 1

//* Time: O(n) - Building the frequency map takes O(n) where "n" is the number of tasks
//* Processing the frequency map takes O(n) in the worst case, but will generally be less than "n"

//* Space: O(m) - The frequency map uses O(m) space where "m" is the number of unique task difficulties
//* The temporary array created by Object.entries also uses O(m) space
