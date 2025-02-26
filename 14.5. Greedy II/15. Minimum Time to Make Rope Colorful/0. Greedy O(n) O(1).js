//* One important observation to make is that removing balloons does NOT set off a chain reaction
//*     - That is, removing one set NEVER means another set must be removed also
//*     - "aabbba" -> Here, we'd remove TWO "b" at most, not all 3
//*         - So we never get into a situation that leaves us with "aaa"
//* In other words, the current subproblem only depends on the past, not the future
//*     - Each decision can be made in isolation from one another
//*     - Removing one set of balloons has no bearing on a later set of balloons
//* Ultimately, we want to sum up all of the costs of each group of colors
//*     - Then, we want to KEEP the balloon that costs the MOST (maximum cost in group)
//*     - This ensures we minimize the cost overall
//* For example, if we have [3, 4, 5] in one group, removing the 4 and 5 is a bad idea
//*     - So we should remove the 3 and 4, which leaves us with the 5 (minimizing the cost)
//* Whenever we find a new set of elements (colors[i] !== colors[i-1])
//*     - Reset the group variables (groupCost, maxCostInGroup)
//* Do this for every group that exists in a greedy manner
function minCost(colors, neededTime) {
  let totalCost = 0;
  let groupCost = 0;
  let maxCostInGroup = 0;

  for (let i = 0; i < colors.length; i++) {
    //* We want to keep the balloon that costs the most
    //* Group has changed, so also reset group variables
    if (i > 0 && colors[i] !== colors[i - 1]) {
      totalCost += groupCost - maxCostInGroup;
      groupCost = maxCostInGroup = 0;
    }

    groupCost += neededTime[i]; //* Add the current cost to the group
    maxCostInGroup = Math.max(maxCostInGroup, neededTime[i]);
  }

  //* In the case of something like "aaa", the balloons weren't removed yet
  totalCost += groupCost - maxCostInGroup;
  return totalCost;
}

console.log(minCost("abaac", [1, 2, 3, 4, 5])); //* 3
console.log(minCost("abc", [1, 2, 3])); //* 0
console.log(minCost("aabaa", [1, 2, 3, 4, 1])); //* 2
console.log(minCost("aaaa", [5, 1, 3, 2])); //* 6

//* Time: O(n) - We need to iterate over the entire "colors" string

//* Space: O(1) - The memory usage remains constant regardless of input size
