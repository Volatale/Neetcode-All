//* Track the number of people "person" trusts
//* Track the number of people "person" is trusted by
//*     - These relationships are representable using indegree and outdegree arrays respectively
//* Whenever personB is trusted BY someone, trustedBy[personB]++
//* Whenever personA trusts someone, trustCount[personA]++
//* To find a judge, iterate over every person
//*     - If they are trusted by everyone except themself (trustedBy[person] === n - 1)
//*     - AND they trust no one (trustCounts[person] === 0)
//*         - This person is the judge
function findTownJudge(n, trust) {
  //* indegree array (person [0.=n] is trusted by person[i] people)
  //* outdegree array (person [0.=n] trusts person[i] people)
  const trustedBy = new Array(n + 1).fill(0);
  const trustCounts = new Array(n + 1).fill(0);

  for (let [personA, personB] of trust) {
    //* Update indegree/trustCounts array
    //* personA cannot be the judge as they have placed their trust in someone
    trustedBy[personB]++;
    trustCounts[personA]++;
  }

  //* Check for the existence of a judge
  //* They have to be trusted by everybody EXCEPT THEMSELF (so -1) and trust no one
  for (let person = 1; person <= n; person++) {
    if (trustedBy[person] === n - 1 && trustCounts[person] === 0) {
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

//* Space: O(n) - Both the trustCount and trustedBy arrays scale with "n"
