//* We can enumerate every possible decision at every step
//* Person "i" can either go to city A or city B
//*     - We can ONLY have n / 2 people travel to each city, however
//* So we need to track how many people have traveled to both cityA and cityB
//*     - If people can travel to EITHER city, then take the minimum of both
//*     - Otherwise, they can only travel to one of the two cities
//*         - So there is no minimum to contend with

//* Apply memoization to avoid redundant work
//*     - We have 2D state (aCount, bCount)
//*         - The "i" state is irrelevant since the (aCount, bCount) pair is unique
function twoCitySchedCost(costs) {
  function makeDecisions(i, aCount, bCount, memo) {
    //* Base Case: there are no more decisions to make
    if (i === costs.length) return 0;

    //* Utilize memoized value
    const key = `${aCount}-${bCount}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let minCost = 0;

    if (aCount < n && bCount < n) {
      //* Can go to either A or B
      minCost = Math.min(
        costs[i][0] + makeDecisions(i + 1, aCount + 1, bCount, memo), //* Go to A
        costs[i][1] + makeDecisions(i + 1, aCount, bCount + 1, memo) //* Go to B
      );
    } else if (aCount < n) {
      //* Can only go to A
      minCost = costs[i][0] + makeDecisions(i + 1, aCount + 1, bCount, memo);
    } else {
      //* Can only go to B
      minCost = costs[i][1] + makeDecisions(i + 1, aCount, bCount, memo);
    }

    return (memo[key] = minCost);
  }

  const n = costs.length / 2;
  return makeDecisions(0, 0, 0, {});
}

console.log(
  twoCitySchedCost([
    [10, 20],
    [30, 200],
    [400, 50],
    [30, 20],
  ])
); //* 110

console.log(
  twoCitySchedCost([
    [30, 150],
    [30, 10],
    [40, 25],
    [10, 50],
  ])
); //* 75

console.log(
  twoCitySchedCost([
    [259, 770],
    [448, 54],
    [926, 667],
    [184, 139],
    [840, 118],
    [577, 469],
  ])
); //* 1859

console.log(
  twoCitySchedCost([
    [515, 563],
    [451, 713],
    [537, 709],
    [343, 819],
    [855, 779],
    [457, 60],
    [650, 359],
    [631, 42],
  ])
); //* 3086

//* Time: O(n^2) - We are memoizing the results of each subproblem
//* There are n / 2 possible values for both aCount and bCount respectively
//* Thus, there are n^2 unique subproblems

//* Space: O(n^2) - There are n^2 unique subproblems, thus n^2 subproblems to cache
//* The height of the recursion tree scales with "n"
