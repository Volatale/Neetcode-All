function minStickers(stickers, target) {
  function findMin(target) {
    //* Base Case: Successfully made word using stickers
    if (target.length === 0) return 0;

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
      const stickersNeeded = findMin(newTarget);

      //* Update minimum if possible
      if (stickersNeeded !== -1) {
        stickers = Math.min(stickers, stickersNeeded + 1);
      }
    }

    //* Return -1 if we couldn't make target
    return stickers !== Infinity ? stickers : -1;
  }

  //* Precompute the frequency of each word
  const wordFreq = stickers.map((sticker) => {
    const freq = {};

    for (const char of sticker) {
      freq[char] = (freq[char] || 0) + 1;
    }

    return freq;
  });

  return findMin(target);
}

console.log(minStickers(["with", "example", "science"], "thehat")); //* 3
console.log(minStickers(["notice", "possible"], "basicbasic")); //* -1
console.log(minStickers(["baby"], "ab")); //* 1

//* Time: O(n^m * m^2) - Where "m" is the length of target and "n" is the number of stickers
//* In the absolute worst case, there is a call for every sticker
//* And in each sticker, we can assume that we progress the state by "1" unit each call
//* The depth of the recursion tree in that case would be O(m)
//* Within each call, we perform string concatentation, which can become quadratic complexity
//* We also need to get the frequency of characters each call

//* Space: O(m^2) - Where "m" is the length of the target string
//* The depth of the recursion tree is at worst "m"
//* Within each recursive call, we create a "new" target
//* Each of these strings can be up to "m" characters long
