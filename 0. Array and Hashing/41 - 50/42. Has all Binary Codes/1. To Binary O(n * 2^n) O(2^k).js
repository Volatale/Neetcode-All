function hasAllBinaryCodes(s, k) {
  const set = new Set();

  //* Sliding Window
  let start = 0;
  let end = k - 1;

  for (let mask = 0; mask < 1 << k; mask++) {
    set.add(toBinary(mask, k));
  }

  while (end < s.length) {
    let substring = s.substring(start, end + 1);

    if (set.has(substring)) {
      set.delete(substring);
    }

    start++;
    end++;
  }

  return set.size === 0; //* All of the binary codes were removed
}

//* O(log n)
function toBinary(n, k) {
  let string = "";

  while (n > 0 || string.length < k) {
    string = (n % 2) + string;
    n = Math.floor(n / 2);
  }

  return string;
}

console.log(hasAllBinaryCodes("00110", 2)); //* True
console.log(hasAllBinaryCodes("00110110", 2)); //* True
console.log(hasAllBinaryCodes("0110", 1)); //* True
console.log(hasAllBinaryCodes("0110", 2)); //* False

//* Time: O(n * 2^n) - Long story short, combined, we are doing a lot of work
//* It takes O(log n) to convert to binary
//* The while loop runs n - k + 1 times (so scales linearly at worst)
//* 1 << k is equivalent to 2**k

//* Space: O(2^k) - We are storing ALL possible binary codes of length K
