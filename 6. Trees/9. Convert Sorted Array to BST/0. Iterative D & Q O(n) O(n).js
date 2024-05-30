class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use DFS to perform an iterative Divide and Conquer
//* Start with a null root node (assume no value to start with)
//* The stack will hold a tuple of [node, startOfArray, endOfArray]
//* This is effectively how the recursive version operates
//* Grab the middle node in each iteration
//* Set the popped node's value to the corresponding element in the nums array
//* If we can still go left, set the left child to null as well
//* Then push that node for processing
//* Do the same for the right child
function sortedArrayToBST(nums) {
  //* Start with no value
  const root = new TreeNode(null);
  const stack = [];

  //* Node, Start of Array, End of Array
  stack.push([root, 0, nums.length - 1]);

  //* Perform a Divide and Conquer with DFS
  while (stack.length > 0) {
    const [curr, start, end] = stack.pop();

    const mid = start + ((end - start) >> 1); //* Find the middle point
    curr.val = nums[mid]; //* Set the node's value to the "mid" element's value in the array

    //* Left Child
    if (start <= mid - 1) {
      curr.left = new TreeNode(null); //* Assume no value
      stack.push([curr.left, start, mid - 1]); //* "Halve" the search space
    }

    //* Right Child
    if (mid + 1 <= end) {
      curr.right = new TreeNode(null); //* Assume no value
      stack.push([curr.right, mid + 1, end]); //* "Halve" the search space
    }
  }

  return root;
}

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
console.log(sortedArrayToBST([1, 3]));
console.log(sortedArrayToBST([10, 20, 30]));
console.log(sortedArrayToBST([50]));
console.log(sortedArrayToBST([1, 2, 3, 4, 5, 6, 7]));

//* Time: O(n) - Each element in the array is processed once
//* The number of elements in the array halves with each subsequent recursive call

//* Space: O(n) - The tree is guaranteed to be height balanced
//* So the stack will only ever hold log n elements at once
//* But we have to create a new node for every element in nums
