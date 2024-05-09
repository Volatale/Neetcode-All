//* Start of by checking if m * k > bloomDay.length
//* m * k gives us the total number of flowers we would need in optimal circumstances (an array of [1])
//* The minimum number of days we have to wait is 1
//* The maximum number of days would then be max(bloomDay)
//* So this is our search space; we DON'T search the array itself
//* Take "mid" to represent the number of days we are testing
//* Then call createBouquet using that mid value
//* Iterate over bloomDay and using adjacent flowers, try to create "m" bouquets
//* If it IS possible, don't eliminate the "mid" value, since that was correct
//* We DON'T know if this was the best or not, so don't be too hasty (right = mid)
//* If it WASN'T possible, then we know "mid" is useless, so left = mid + 1
function minimumDaysToMakeMBouquets(bloomDay, m, k) {
  if (m * k > bloomDay.length) return -1; //* We don't have enough flowers to make "m" bouquets

  function createBouquet(day) {
    let flowers = 0;
    let bouquets = 0;

    for (let i = 0; i < bloomDay.length; i++) {
      //* In this case you know the adjacency check failed (flower is not bloomed)
      if (bloomDay[i] > day) {
        flowers = 0; //* Reset the number of flowers you have
      } else {
        flowers++;

        if (flowers === k) {
          bouquets++;
          flowers = 0; //* Can't use this flower again
        }
      }
    }

    return bouquets >= m;
  }

  //* Minimum days to wait is 1, maximum is the largest value in bloomDay
  let left = 1;
  let right = Math.max(...bloomDay);

  while (left < right) {
    //* Mid represents the number of days we want to test
    let mid = left + ((right - left) >> 1);

    if (createBouquet(mid)) {
      right = mid; //* Don't eliminate the "mid" value
    } else {
      left = mid + 1; //* Need a larger number of days to test
    }
  }

  //* Minimum number of days to make "m" bouquets
  return left;
}

console.log(minimumDaysToMakeMBouquets([1, 10, 3, 10, 2], 3, 1)); //* 3
console.log(minimumDaysToMakeMBouquets([1, 1, 1], 1, 4)); //* -1: We don't have enough flowers
console.log(minimumDaysToMakeMBouquets([1], 1, 1)); //* 1
console.log(minimumDaysToMakeMBouquets([2], 1, 1)); //* 2
console.log(minimumDaysToMakeMBouquets([50, 50, 50], 1, 3)); //* 50
console.log(minimumDaysToMakeMBouquets([1, 10, 2, 9, 3, 8, 4, 7, 5, 6], 4, 2)); //* 9

//* Time: O(n log n) - The minimum number of days is 1
//* The maximum number of days is the largest value in bloomDay
//* For every binary search iteration (log n), we potentially do an O(n) loop
//* O(log n * n) === O(n log n) since multiplication is commutative (A * B) === (B * A)

//* Space: O(1) - The space complexity remains constant regardless of input size
