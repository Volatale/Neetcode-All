class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use a set to track the values we already have
//* If we already have a value, remove it from the set
//* If we DON'T have the value, add it to the set
//* Essentially, alternate between adding and removing
//* A valid palindrome in this case has at most 1 element with an odd occurrence
//* And every other node has an even number of occurrences
//* To check this is the case, we need to ensure set.size <= 1
//* This is similar to finding duplicates using XOR in an array of duplicates and 1 single ([1, 2, 2])
function pseudoPalindromicPaths(root) {
  function dfs(curr, set) {
    if (curr === null) return 0;

    //* Delete from set if we already have it, otherwise add
    set.has(curr.val) ? set.delete(curr.val) : set.add(curr.val);

    //* If node is a leaf and at most 1 digit has an odd occurrence
    const count = curr.left === curr.right && set.size <= 1 ? 1 : 0;
    const left = dfs(curr.left, set);
    const right = dfs(curr.right, set);

    //* Delete from set if we already have it, otherwise add (undo the change from earlier)
    set.has(curr.val) ? set.delete(curr.val) : set.add(curr.val);

    return count + left + right;
  }

  const set = new Set();
  return dfs(root, set);
}

const root1 = new TreeNode(2);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(1);
root1.right = new TreeNode(1);
root1.right.right = new TreeNode(1);

const root2 = new TreeNode(10);

const root3 = new TreeNode(2);
root3.left = new TreeNode(1);
root3.left.left = new TreeNode(1);
root3.left.right = new TreeNode(3);
root3.left.right.right = new TreeNode(1);
root3.right = new TreeNode(1);

console.log(pseudoPalindromicPaths(root1)); //* 2
console.log(pseudoPalindromicPaths(root2)); //* 1
console.log(pseudoPalindromicPaths(root3)); //* 1

//* Time: O(n) - We have to process every node in the tree
//* It takes Θ(1) to lookup, add and delete elements

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* The set also scales with the height of the tree
