class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function sortedArrayToBST(nums) {
  return divideAndConquer(nums, 0, nums.length - 1);
}

//* Use divide and conquer to split the array into halves at each step
//* Repeatedly use the middle element's value as the node value
//* Eventually we hit the base case of left > right, in which case return null
//* This handles the null nodes
function divideAndConquer(nums, left, right) {
  //* Add the null nodes
  if (left > right) return null;

  const mid = left + ((right - left) >> 1); //* Right-biased Mid
  const node = new TreeNode(nums[mid]); //* Create a node using the mid value

  node.left = divideAndConquer(nums, left, mid - 1); //* From left to mid (exclude mid)
  node.right = divideAndConquer(nums, mid + 1, right); //* From mid + 1 to the right (exclude mid)

  return node;
}

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
console.log(sortedArrayToBST([1, 3]));
console.log(sortedArrayToBST([10, 20, 30]));
console.log(sortedArrayToBST([50]));
console.log(sortedArrayToBST([1, 2, 3, 4, 5, 6, 7]));

//* Time: O(n) - Each element in the array is processed once
//* The number of elements in the array halves with each subsequent recursive call

//* Space: O(n) - We have to create a node for every element in the nums array - O(n)
//* A balanced tree uses at most O(log n) space to traverse using recursion
//* So if we don't count the nodes themselves, then the space usage is O(log n)
