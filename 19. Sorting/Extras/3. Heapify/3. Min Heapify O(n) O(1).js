function sinkDown(nums, i, func) {
  let length = nums.length;

  while (true) {
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    let largest = i;

    if (leftChild < length && func(nums, leftChild, largest)) {
      largest = leftChild;
    }

    if (rightChild < length && func(nums, rightChild, largest)) {
      largest = rightChild;
    }

    if (largest === i) break;

    swap(nums, i, largest);
    i = largest;
  }
}

function swap(arr, x, y) {
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function heapify(nums, func) {
  for (let i = Math.floor((nums.length - 2) / 2); i >= 0; i--) {
    sinkDown(nums, i, func);
  }

  return nums;
}

const isSmaller = (nums, a, b) => nums[a] < nums[b];

console.log(heapify([7, 7, 9, 2, 15, 10, 5, 12], isSmaller)); //* [15, 12, 10, 7, 7, 9, 5, 2]
console.log(heapify([1, 2, 3], isSmaller)); //* [3, 2, 1]
console.log(heapify([1], isSmaller)); //* [3, 2, 1]
