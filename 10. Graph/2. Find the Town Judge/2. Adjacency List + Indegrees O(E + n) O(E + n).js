//* The trust relationship is ONE WAY
//* personA can trust personB but it doesn't have to be mutual
//*     - This implies a DIRECTED graph
//* Track the number of people who trust each person
//*     - Thus we can use this as an INDEGREE ARRAY
//*     - The town judge is trusted by everybody but themselves
//*         - So if trustCounts[person] === n - 1 (everybody - 1))
//*         - That person is probably the judge (if they also trust nobody)
//* Iterate through every person
//*     - If they are trusted by everybody (n - 1)
//*     - AND they trust nobody (no trustList array)
//*         - This person is the judge
function findTownJudge(n, trust) {
  const trustList = {}; //* Adjacency List

  //* indegree array (person [0.=n] is trusted by person[i] people)
  const trustCounts = new Array(n + 1).fill(0);

  //* Build adjacency list
  for (let [personA, personB] of trust) {
    //* Ensure personA can trust people
    if (!trustList[personA]) {
      trustList[personA] = [];
    }

    //* personA now trusts personB
    trustList[personA].push(personB);

    //* Update indegree/trustCounts array
    //* personA cannot be the judge as they have placed their trust in someone
    trustCounts[personB]++;
  }

  //* Check for the existence of a judge
  //* If they are trusted by everybody EXCEPT THEMSELF (so -1)
  //* And they also don't have a trust list array, THEY are the judge
  for (let person = 1; person <= n; person++) {
    if (trustCounts[person] === n - 1 && !trustList[person]) {
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

//* Time: O(E + n) - Where "e" is the number of edges (length of trust)
//* It takes O(E) time to populate the adjacency list
//* Iterating through each person to check their status takes O(n)

//* Space: O(E + n) - trustList takes O(E) space to store (where "E" is the length of trust)
//* trustCounts takes O(n) space where "n" is the input "n"
//* Thus the total space complexity is O(E + n)
