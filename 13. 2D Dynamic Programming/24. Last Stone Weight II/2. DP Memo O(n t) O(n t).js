//* We can smash ANY two stones, without regard for order
//*     - Based on this logic, we CANNOT use a greedy approach
//*         - Greedy would work if we always smashed the first 2 etc
//*         - Here, we'd need to track the state of what value each stone is
//*         - And also whether not the stone has been destroyed, which is a lot of work
//*     - Instead, we could just sum the weights for every stone
//*         - Then put them into two groups (we know we need to smash two at once)
//*             - Divide by 2 and take the ceil (as the weights are integers)
//*         - Then it becomes a bounded knapsack problem (equal partition subset sum etc)
//* At each step, we can choose to smash or not smash
//*     - Find the minimum possible weight of the leftover coin

//* Apply memoziation to avoid redundant work
//*     - There are "n" values for "i"
//*     - And "t" values for target
//*         - So we have 2D state
function lastStoneWeightII(stones) {
  function smashStones(i, total) {
    if (total >= target || i === stones.length) {
      //* sum - total gives us the OTHER pile, then find the difference between them
      return Math.abs(total - (sum - total));
    }

    //* Utilize memoized value
    const key = `${i}-${target}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    return (memo[key] = Math.min(
      smashStones(i + 1, total + stones[i], memo), //* Include stone
      smashStones(i + 1, total, memo) //* Exclude stone
    ));
  }

  //* Sum the weights and find the mid-way point
  const sum = stones.reduce((acc, curr) => acc + curr, 0);
  const target = Math.ceil(sum / 2);

  return smashStones(0, 0, {});
}

console.log(lastStoneWeightII([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeightII([31, 26, 33, 21, 40])); //* 5
console.log(lastStoneWeightII([2, 3])); //* 1
console.log(lastStoneWeightII([5, 5])); //* 0

//* Time: O(n * t) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for t -> O(n * t)

//* Space: O(n * t) - There are n * t unique states, and therefore that means there could be n * t keys/values
//* The depth of the recursion tree scales with the number of stones (n)
//* In the worst case, we don't smash any stones, so the depth will be "n"
