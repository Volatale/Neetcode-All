//* Try to start the journey from every possible starting point
//* If any of them are successful, just return "i"
//*     - We are told there is a UNIQUE solution
//*     - So there is only ONE possible starting point
//* currGas += gas[i] - cost[i]
//*     - This equation tells us if we have enough gas to make it to the next station
//* "cost" can be thought of as the "difference"
//*     - Which is why we subtract cost[i] from gas[i]
//* The important thing to note is we START at any of the stations
//*     - But we also have to GET BACK to the start
//*     - So ultimately, we still end up with "n" gas[i] - cost[i] iterations
//* In our case, we are summing the differences at each step
//*     - gas:  [2,  3,  7]
//*     - cost: [3,  4,  3]
//*     - diff: [-1, -1, 4]
//*         - 4 + -1 = 3
//*         - 3 + -1 = 2
//!             - So by starting at 2, we still have 2 gas leftover
//*             - And we knew it was possible because Sum(gas) >= Sum(cost)
function canCompleteCircuit(gas, cost) {
  //* We have no cost to pay, so immediately return
  if (gas.length === 1) return 0;

  const n = gas.length;

  //* "i" represents current starting index
  for (let i = 0; i < n; i++) {
    let currGas = 0;
    let stops = 0;

    //* Try making the round trip
    while (stops < n) {
      currGas += gas[(i + stops) % n] - cost[(i + stops) % n];

      //* It is not possible to move to this index
      if (currGas < 0) break;
      stops++;
    }

    //* We successfully made the round trip
    if (stops === n && currGas >= 0) return i;
  }

  //* Not possible to make a round-trip
  return -1;
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); //* 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); //* -1
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])); //* 2
console.log(canCompleteCircuit([1], [1])); //* 0

//* Time: O(n^2) - We iterate through the entire array "n" times in total
//* We have a nested for loop, so there are n * (n-1) iterations

//* Space: O(1) - We are only using constant space variables
