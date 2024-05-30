class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use divide and conquer to split the array into halves at each step
//* Repeatedly use the middle element's value as the node value
//* Eventually we hit the base case of left > right, in which case return null
//* This handles the null nodes
function sortedArrayToBST(nums) {
  if (nums.length <= 0) return null;

  const mid = Math.floor(nums.length / 2); //* Right-biased Mid
  const node = new TreeNode(nums[mid]); //* Create a node using the mid value

  node.left = sortedArrayToBST(nums.slice(0, mid)); //* From left to mid (exclude mid)
  node.right = sortedArrayToBST(nums.slice(mid + 1)); //* From mid + 1 to the right (exclude mid)

  return node;
}

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
console.log(sortedArrayToBST([1, 3]));
console.log(sortedArrayToBST([10, 20, 30]));
console.log(sortedArrayToBST([50]));
console.log(sortedArrayToBST([1, 2, 3, 4, 5, 6, 7]));

//* Time: O(n) - Each element in the array is processed once
//* The number of elements in the array halves with each subsequent recursive call

//* Space: O(n log n) - If the array has 8 nodes, we split the array in half each call
//* 8 > 4 -> 2 -> 1, so the depth of the call stack is O(log n)
//* But we create two arrays of n / 2 size each call
