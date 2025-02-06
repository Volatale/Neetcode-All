//* Brute forcing means we have to try closing the shop on every day
//*     - Then we'd just close the shop on whatever day gave the minimum penalty
//* Instead of doing that, we can simply assume the shop is closed on EVERY day
//*     - Then, open the shop for every day
//* If customers[i] is "Y" when the shop is open
//!     - Subtract 1 from whatever the penalty is
//*     - The shop is OPEN, and we have customers visiting (so no penalty is applied)
//* Whenever we have a penalty LOWER than the current minimum, we update the variables
//*     - minPenalty becomes whatever the current is
//*     - And earliestDay is set to the next day
function bestClosingTime(customers) {
  let penalty = 0;
  let earliestDay = 0;

  //* Get the frequency of "Y": initial penalty is when shop stays CLOSED
  for (let i = 0; i < customers.length; i++) {
    penalty += customers[i] === "Y" ? 1 : 0;
  }

  let minPenalty = penalty;

  //* Then, open the shop for days [0, n) and update the penalty (i = day)
  for (let i = 0; i < customers.length; i++) {
    //* If there are customers visiting there is no penalty for this day
    penalty += customers[i] === "Y" ? -1 : 1;

    if (penalty < minPenalty) {
      minPenalty = penalty;
      earliestDay = i + 1;
    }
  }

  return earliestDay;
}

console.log(bestClosingTime("YYNY")); //* 2
console.log(bestClosingTime("NNNNN")); //* 0
console.log(bestClosingTime("YYYY")); //* 4
console.log(bestClosingTime("NNNN")); //* 0

//* Time: O(n) - We iterate through the entire input twice (O(n))

//* Space: O(1) - The memory usage is constant regardless of the input size
