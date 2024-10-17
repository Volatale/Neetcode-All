//* We can enumerate every possible decision at every step
//* Person "i" can either go to city A or city B
//*     - We can ONLY have n / 2 people travel to each city, however
//* So we need to track how many people have traveled to both cityA and cityB
//*     - If people can travel to EITHER city, then take the minimum of both
//*     - Otherwise, they can only travel to one of the two cities
//*         - So there is no minimum to contend with
function twoCitySchedCost(costs) {
  function makeDecisions(i, aCount, bCount) {
    //* Base Case: there are no more decisions to make
    if (i === costs.length) return 0;

    let minCost = 0;

    if (aCount < n && bCount < n) {
      //* Can go to either A or B
      minCost = Math.min(
        costs[i][0] + makeDecisions(i + 1, aCount + 1, bCount), //* Go to A
        costs[i][1] + makeDecisions(i + 1, aCount, bCount + 1) //* Go to B
      );
    } else if (aCount < n) {
      //* Can only go to A
      minCost = costs[i][0] + makeDecisions(i + 1, aCount + 1, bCount);
    } else {
      //* Can only go to B
      minCost = costs[i][1] + makeDecisions(i + 1, aCount, bCount);
    }

    return minCost;
  }

  const n = costs.length / 2;
  return makeDecisions(0, 0, 0);
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

//* Time: O(2^n) - At each step, person "i" can either to to A or B
//* So in the worst case, each call leads to 2 more calls
//* There are "n" possible decisions to make in total so the height of the recursion tree is "n"

//* Space: O(n) - The height of the recursion tree scales with "n"
