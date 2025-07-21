//* There are `n` piles of bananas, and the ith pile has piles[i] bananas
//* The bananas need to be eaten within `h` hours
//* Our goal is to find the MINIMUM banana eating speed such that hoursTaken <= h
//* In a brute force manner, we could just increase the bananas per hour speed by 1 each iteration
//*     - Within each iteration, we can try to see if it is possible to eat all of the bananas in time
//*     - If not, simply increase the BPH (bananas per hour)
//* The "search space" can be considered to be the range [1, max(piles)]
//*     - Our "minimum" BPH exists somewhere in this range
//* Since the search space is technically "sorted", we can apply binary search
//* The formula for Bananas Per Second is (bananas / speed)
//*     - In our case, `speed` is represented by `mid` (the binary searched value)
//* If the result is a decimal, we'll round it up (ceil) because we need whole numbers
function minEatingSpeed(piles, h) {
  function canEat(speed) {
    let hours = 0;

    for (let bananas of piles) {
      hours += Math.ceil(bananas / speed);
    }

    return hours <= h;
  }

  //* The minimum/maximum banana pile sizes are 1 and max(piles)
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    //* `mid` represents the current bananas per hour (speed)
    const mid = left + ((right - left) >> 1);

    if (canEat(mid)) {
      right = mid; //* We were successful
    } else {
      left = mid + 1;
    }
  }

  return left;
}

//* Time: O(n log m) - Where `m` is the max(piles)
//* Our search space ranges from [1, max(piles)]
//* And within each binary search iteration, we perform an O(n) loop

//* Space: O(1) - The memory usage remains constant regardless of the input size
