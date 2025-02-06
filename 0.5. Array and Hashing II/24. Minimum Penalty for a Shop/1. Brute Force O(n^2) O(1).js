//* Try closing the shop on each of the "j" days
function bestClosingTime(customers) {
  let earliestHour = 0;
  let minOverall = Infinity;

  //* "i" represents hour we stopped at, try stopping at every hour
  for (let i = 0; i <= customers.length; i++) {
    let penalty = 0;

    //* "j" represents the current day
    for (let j = 0; j < customers.length; j++) {
      if (j >= i && customers[j] === "Y") {
        //* Shop closed when customers arrive
        penalty++;
      } else if (j < i && customers[j] === "N") {
        //* Shop open when no customers are here
        penalty++;
      }
    }

    if (penalty < minOverall) {
      minOverall = penalty;
      earliestHour = i;
    }
  }

  return earliestHour;
}

console.log(bestClosingTime("YYNY")); //* 2
console.log(bestClosingTime("NNNNN")); //* 0
console.log(bestClosingTime("YYYY")); //* 4
console.log(bestClosingTime("NNNN")); //* 0

//* Time: O(n^2) - Since we attempt to close the shop on all of the "j" days
//* We need to determine the penalty for each of them (which requires a nested loop)

//* Space: O(1) - The memory usage is constant regardless of the input size
