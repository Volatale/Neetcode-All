//* Compute the difference in cost for sending to B vs A for every person
//*     - SMALLER values indicate that we should send that person to B instead of A
//*     - Conversely, larger values hint that this person should be sent to A
//* HALF of the people must be send to A and the other half to B
//*     - Thus, we can SORT the arrays in ASCENDING order
//*     - This allows us to send the first n / 2 people to B
//*     - And then the final n / 2 people to A
function twoCitySchedCost(costs) {
  const diffs = [];
  let minCost = 0;
  let half = Math.floor(costs.length / 2);

  //* Compute cost difference to send each person to B vs A (cost2 - cost1)
  //* LOWER values mean it is cheaper to send them to B than A
  for (const [cost1, cost2] of costs) {
    diffs.push([cost1, cost2, cost2 - cost1]);
  }

  //* Sort in ASCENDING order based on cost difference
  diffs.sort((a, b) => a[2] - b[2]);

  //* Send the first half to B and the rest to A
  for (let i = 0; i < diffs.length; i++) {
    if (i < half) {
      minCost += diffs[i][1]; //* Send to city B
    } else {
      minCost += diffs[i][0]; //* Send to city A
    }
  }

  return minCost;
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
    [10, 100],
    [10, 1000],
    [50, 500],
    [1, 100],
  ])
); //* 260

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

//* Time: O(n log n) - It takes O(n) to compute the difference of sending to B vs A
//* Then, the time taken to sort the triplets scales with O(n log n)
//* Finally, we iterate over the entire array one more time to compute the minCost

//* Space: O(n) - We create a new array of triplets to store all of the relevant information
//* Sorting generally uses O(n) space due to merge sort being the default
