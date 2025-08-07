//* We are given chunks of chocolate whose sweetness is given by the int[] `sweetness`
//* The goal is to share the chocolate with `k` friends so we cut the chocolate bar into `k + 1` pieces (k cuts)
//* "We" eat the piece of the MINIMUM total sweetness and give the other pieces to our friends
//* Then, we need to find the MAXIMUM total sweetness we can get by cutting optimally
//! In other words, maximize the minimum
//* We know that the chocolate bar pieces are "consecutive chunks", which implies that they are subarrays
//*     - "Total sweetness" implies that we need to sum the values in each subarray
//* Since we are trying to do something "optimally", we have a range of possibilities
//* Regardless of our choice, there must be `k + 1` subarrays at the end of each
//*     - This implies that `k` < sweetness.length
//*         - if sweetness.length = 5, then k = [0, 4]
//*         - Because there must be `k + 1` (5) subarrays at the end, which means each subarray holds a single value
//*     - Why? Because there must be `k + 1` subarrays at the end
//*         - If `n` = 5, and `k` = 6, then there must be 7 subarrays after each split, which is impossible
//*         - There aren't enough pieces to cut up
//* In our case we want to "optimize" the total sweetness (over each of the chunks)
//! The values exists in the range [max(sweetness), sum(sweetness)]
//*     - imagine we have [1, 2, 3], k = 2
//*         - Here, we can only have single element subarrays: [1], [2], [3] (k + 1 = 3 subarray)
//*         - So the minimum sweetness value is then therefore min(sweetness)
//*     - Alternatively, we could have [1, 2, 3], k = 0
//*         - Which means we have [1, 2, 3] for a subarray (k + 1 = 1 subarray)
//*         - The maximum sweetness would then have to be then sum of all elements in the subarray
//* Since we know we have a "range" of possible sweetnesses, that is our search space
//* We also know we need to optimize something (the maximnum sweetness that should exist per subarray)
//! Thus, binary search will work perfectly here
//*     - left = min(sweetness)
//*     - right = sum(sweetness)
//*     - `mid` represents the maximum sweetness we will allow per subarray
function divideChocolate(sweetness, k) {
  function canSplit(maxSweetness) {
    const maxCuts = k + 1;
    let cuts = 0;
    let totalSweetness = 0; //* Sweetness of current subarray

    for (let i = 0; i < sweetness.length && cuts < maxCuts; i++) {
      //* Add current chunk to current subarray (greedily)
      totalSweetness += sweetness[i];

      //* If sweetness is too much, add this chunk to the next subarray
      if (totalSweetness > maxSweetness) {
        cuts++;
        totalSweetness = 0;
      }
    }

    //* There must be exactly k + 1 subarrays at the end
    return cuts < maxCuts;
  }

  //* Our search space is the range of possible sweetness values
  let left = Math.min(...sweetness);
  let right = sweetness.reduce((acc, curr) => acc + curr, 0);

  while (left < right) {
    //* `mid` represents the maximum sweetness each subarray can have
    const mid = left + ((right - left) >> 1);

    if (canSplit(mid)) {
      right = mid; //* Potential candidate; don't eliminate from search space
    } else {
      left = mid + 1; //* Need a larger sweetness value
    }
  }

  //* The minimized maximum sweetness we will accept
  return left;
}

console.log(divideChocolate([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)); //* 6
console.log(divideChocolate([5, 6, 7, 8, 9, 1, 2, 3, 4], 8)); //* 1
console.log(divideChocolate([1, 2, 2, 1, 2, 2, 1, 2, 2], 2)); //* 5
console.log(divideChocolate([1, 5, 10, 50, 20], 1)); //* 20
console.log(divideChocolate([1, 2, 3, 4], 1)); //* 4
console.log(divideChocolate([100], 1)); //* 1
console.log(divideChocolate([100], 0)); //* 100

//* Time: O(n log r) - Where `r` is the range of possible sweetness values [min(sweetness), sum(sweetness)]
//* Within each while loop iteration (log r), we iterate over the entire array in the worst case (n)

//* Space: O(1) - The memory usage remains constant regardless of input size
