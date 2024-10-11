//! Instead of trying every possible starting position
//*     - We can instead iterate through the array a single time
//*     - A greedy approach can work here
//* We know it is only possible to complete the trip if
//!     - Sum(gas) >= Sum(cost)
//*         - This implies that there is at least one way to complete the cycle
//*     - If this is NOT the case, there is no valid start index
//* Otherwise, it is definitely possible to find a valid start
//* Accumulate both the total gas and total costs respectively
//*     - This is how we'll check if a round-trip is plausible
//* Track the gas we CURRENTLY have across all iterations
//*     - currGas += gas[i] - cost[i]
//*     - If this results in a NEGATIVE number, starting here won't work
//*         - We can't move to the current index because it costs too much gas
//*         - Thus, we need to try starting from the NEXT index (i + 1)
//*     - Set currGas = 0 because we can't KEEP the current state (gas)
//*         - We are choosing to start from another index now
//* if totalCost > totalGas, the trip is impossible
//*     - Return -1
function canCompleteCircuit(gas, cost) {
  //* We have no cost to pay, so immediately return
  if (gas.length === 1) return 0;

  let start = 0;
  let totalGas = 0;
  let totalCost = 0;
  let currGas = 0; //* Represents accumulated gas - cost

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    currGas += gas[i] - cost[i]; //* Accumulated gas

    //* If currGas < 0, we can't complete the trip
    //* Try starting from the next index (this one failed)
    if (currGas < 0) {
      start = i + 1;
      currGas = 0;
    }
  }

  //* Round trip is only possible if gas >= cost
  return totalGas >= totalCost ? start : -1;
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); //* 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); //* -1
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])); //* 2
console.log(canCompleteCircuit([1], [1])); //* 0

//* Time: O(n) - We iterate through the entire array once
//* Each operation takes constant time since we're doing arithmetic and comparisons

//* Space: O(1) - We are only using constant space variables
