//* The trust relationship is ONE WAY
//* personA can trust personB but it doesn't have to be mutual
//*     - This implies a DIRECTED graph
//* Track the number of people who trust each person
//*     - Thus we can use this as an INDEGREE ARRAY
//*     - The town judge is trusted by everybody but themselves
//*         - trustCounts[person] === n - 1 (everybody - 1))
//* Iterate through every person
//*     - If they are trusted by everybody (n - 1)
//*     - AND they trust nobody
//*         - This person is the judge
//! By decrementing people who trust, they can never meet the "n - 1" requirement
//*     - So we can avoid creating an outdegree array
//* Imagine personA trusts 4 people,
//*     - Even if everyone ELSE trusts them, they are "4" away from the n-1 requirement
//*         - Because THEIR trustCount was decremented each time they trusted someone else
//*         - So it is MATHEMATICALLY IMPOSSIBLE for this person to be the judge
function findTownJudge(n, trust) {
  //* indegree array (person [0.=n] is trusted by person[i] people)
  const trustCounts = new Array(n + 1).fill(0);

  for (let [personA, personB] of trust) {
    //* Update indegree/trustCounts array
    //* personA cannot be the judge as they have placed their trust in someone
    trustCounts[personA]--;
    trustCounts[personB]++;
  }

  //* Check for the existence of a judge
  //* They have to be trusted by everybody EXCEPT THEMSELF (so -1) and trust no one
  for (let person = 1; person <= n; person++) {
    if (trustCounts[person] === n - 1) {
      return person;
    }
  }

  //* No judge found
  return -1;
}

console.log(findTownJudge(2, [[1, 2]])); //* 2

console.log(
  findTownJudge(3, [
    [1, 3],
    [2, 3],
  ])
); //* 3

console.log(
  findTownJudge(3, [
    [1, 3],
    [2, 3],
    [3, 1],
  ])
); //* -1

console.log(findTownJudge(1, [[1, 1]])); //* -1, self cycle, we trust ourself

//* Time: O(E + n) - It takes O(E) time to iterate through the trust array
//* Then it takes O(n) to iterate through each person and validate whether they are a judge

//* Space: O(n) - The trust count array scales in size with the number of villagers (n)
