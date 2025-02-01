//* Instead of explicitly sorting the array
//* We can use a counting sort based approach
//* freq[i] = The frequency of number "i"
//* Then, track the cumulative number of numbers >= x
//* If there are exactly "x", then we return whatever "x" currently is
//* We work backwards because iterating from the left would mean we count the number of elements < x
function specialArray(nums) {
  //* Get the upper bound for counting sort
  let maxVal = nums.reduce((acc, curr) => Math.max(acc, curr), 0);

  //* freq[i] = Frequency of number i
  const freq = new Array(maxVal + 1).fill(0);

  //* Get the frequency of each number (effectively sorting the array)
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]]++;
  }

  //* Get REVERSE cumulative count
  let count = 0;

  for (let x = maxVal; x >= 0; x--) {
    //* There are freq[x] elements >= x
    count += freq[x];

    //* There are exactly "x" values >= x
    if (count === x) {
      return x;
    }
  }

  return -1;
}

console.log(specialArray([3, 5])); //* 2
console.log(specialArray([0, 0])); //* -1
console.log(specialArray([0, 4, 3, 0, 4])); //* 3
console.log(specialArray([4, 4, 4, 9, 1])); //* 4
console.log(specialArray([0])); //* -1

//* Time: O(n + maxVal) - It takes O(n) to get the maximum value in nums, O(n) to create the freq array
//* Then it takes O(n) to get teh frequency of elements in nums and O(n) to get the reverse cumulative count

//* Space: O(maxVal) - The space usage scales with the maximum value in nums
