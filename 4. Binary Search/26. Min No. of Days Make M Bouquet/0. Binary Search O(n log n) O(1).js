//* We are told we need to return the MINIMUM number of days needed to make `m` bouquets using `k` flowers each
//* bloomDay[i] indicates when the ith flower has bloomed (and is thus usable in a bouquet)
//* Thus, we need to optimize our "day" by deciding when the best time to create bouquets is
//* There is an added constaint in that for each bouquet, we can only use ADJACENT flowers
//*     - If we had 2 flowers out of 3 and the next (immediate) flower hasn't bloomed, we have to discard the current ones
//! We can immediately tell if there aren't EVER going to be enough flowers using math
//*     - We need to create `m` bouquets using `k` flowers each
//*         - Which means the total number of flowers needed is (m * k)
//*     - If bloomDay.length (n) < (m * k), then there will NEVER be enough flowers regardless of how many days pass
//*         - Hence we return -1 in those cases
//* Per bouquet, we count the number of flowers and if that number is ever equal to k, we can form a bouquet
//*     - At which point we increment bouquets and set flowers back to 0
//! Binary search will work here since we are optimizing the number of days we need to wait
//*     - 1 <= bloomDay[i] <= 2^31 - 1
//*     - The minimum number of days needed to wait is 1
//*     - The maximum number of days needed to wait is max(bloomDay)
//* Thus, the range of possible days is [1, max(bloomDay)]
//* This range is monotonically increasing, and thus we can binary search over this search space
function minDays(bloomDay, m, k) {
  function canMake(mid) {
    let flowers = 0; //* No. of flowers in current set
    let bouquets = 0; //* Total no. of created bouquets

    for (let i = 0; i < bloomDay.length && bouquets < m; i++) {
      //* The flower has not yet bloomed
      if (bloomDay[i] > mid) {
        flowers = 0; //* Adjacency constraint is broken; discard current flowers
        continue;
      }

      //* Add this flower to the current bouquet
      flowers++;

      if (flowers === k) {
        bouquets++;
        flowers = 0;
      }
    }

    //* Whether or not we were able to form `m` bouquets
    return bouquets >= m;
  }

  //* There aren't enough flowers to form `m` bouquets using `k` flowers each
  if (bloomDay.length < m * k) return -1;

  //* Our search space is the range of possible days ([1, max(bloomDay)])
  let left = 1;
  let right = Math.max(...bloomDay);

  while (left < right) {
    //* `mid` represents the number of days we are trying
    const mid = left + ((right - left) >> 1);

    if (canMake(mid)) {
      right = mid; //* Found a candidate; don't eliminate from search space
    } else {
      left = mid + 1; //* We need more days to form `m` bouquets
    }
  }

  //* `left` indicates the minimum no. of days
  return left;
}

console.log(minDays([1, 10, 3, 10, 2], 3, 1)); //* 3
console.log(minDays([1, 1, 1], 1, 4)); //* -1: We don't have enough flowers
console.log(minDays([1], 1, 1)); //* 1
console.log(minDays([2], 1, 1)); //* 2
console.log(minDays([50, 50, 50], 1, 3)); //* 50
console.log(minDays([1, 10, 2, 9, 3, 8, 4, 7, 5, 6], 4, 2)); //* 9

//* Time: O(r log(n)) - The search space scales with the range of possible days ([1, max(bloomDay])
//* Within each while loop iteration, we iterate over the entire bloomDay array in the worst case (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
