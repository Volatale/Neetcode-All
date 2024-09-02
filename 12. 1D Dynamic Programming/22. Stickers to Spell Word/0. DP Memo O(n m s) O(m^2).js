function minStickers(stickers, target) {
  function findMin(target, memo) {
    //* Base Case: Successfully made word using stickers
    if (target.length === 0) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(target)) return memo[target];

    let stickers = Infinity;

    //* Try every sticker
    for (const word of wordFreq) {
      //* This sticker does not have the first character
      if (!word[target[0]]) continue;

      const targetFreq = {};
      let newTarget = "";

      //* Get the frequency of characters we NEED (to make target)
      for (const char of target) {
        targetFreq[char] = (targetFreq[char] || 0) + 1;
      }

      //* Create new string by applying the sticker to the target
      for (const char in targetFreq) {
        const remainingCount = targetFreq[char] - (word[char] || 0);

        if (remainingCount > 0) {
          newTarget += char.repeat(remainingCount);
        }
      }

      //* Find minimum number of stickers for the NEW target
      const stickersNeeded = findMin(newTarget, memo);

      //* Update minimum if possible
      if (stickersNeeded !== -1) {
        stickers = Math.min(stickers, stickersNeeded + 1);
      }
    }

    //* Return -1 if we couldn't make target
    return (memo[target] = stickers !== Infinity ? stickers : -1);
  }

  //* Precompute the frequency of each word
  const wordFreq = stickers.map((sticker) => {
    const freq = {};

    for (const char of sticker) {
      freq[char] = (freq[char] || 0) + 1;
    }

    return freq;
  });

  return findMin(target, {});
}

console.log(minStickers(["with", "example", "science"], "thehat")); //* 3
console.log(minStickers(["notice", "possible"], "basicbasic")); //* -1
console.log(minStickers(["baby"], "ab")); //* 1

//* Time: O(n * m * s) - Where "n" is the number of stickers
//* "m" is the length of target, and "s" is the number of unique substrings in target

//* Space: O(m^2) - We create a new string at each level of recursion that could potentially be "m" length
//* The depth of the recursion tree scales with the length of target
