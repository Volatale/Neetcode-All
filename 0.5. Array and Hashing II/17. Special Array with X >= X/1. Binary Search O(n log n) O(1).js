//* Sort the array and then binary search to find "x"
//* There is no point in testing every possible value
//* Simply calculate how many elements are >= x (mid)
//*     - If we have too many, increase left (which effectively decreases the no. of elements >= x)
//*     - Else if we don't have enough, decrease right (increase no. of elements >= x)
//* If count === mid, then "nums" is special
//*     - There are exactly "mid" (x) elements >= x
function specialArray(nums) {
  //* Sort the array so we can binary search
  nums.sort((a, b) => a - b);

  //* Binary Search pointers
  let left = 0;
  let right = nums.length;

  while (left <= right) {
    //* Mid represents the value of "x" we are testing
    let mid = left + ((right - left) >> 1);

    //* "n" - No. of Elements >= mid
    let count = nums.length - nums.findIndex((num) => num >= mid);

    if (count === mid) {
      return mid; //* There are exactly x elements >= x
    } else if (count > mid) {
      left = mid + 1; //* Decreases no. of elements >= x
    } else {
      right = mid - 1; //* Increases no. of elements >= x
    }
  }

  //* Nums is not special
  return -1;
}

console.log(specialArray([3, 5])); //* 2
console.log(specialArray([0, 0])); //* -1
console.log(specialArray([0, 4, 3, 0, 4])); //* 3
console.log(specialArray([4, 4, 4, 9, 1])); //* 4
console.log(specialArray([0])); //* -1

//* Time: O(n log n) - Sorting takes O(n log n), and we are binary searching within each while loop iteration
//* On top of that, we are doing O(n) work to find the first index of an element >= mid in the array

//* Space: O(n) - Assuming merge sort is used under the hood, the memory usage scales with nums.length
