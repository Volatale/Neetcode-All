class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* At each level, check if the current node is "null"
//* If it is, return curr
//* Otherwise recursively call preorder on curr.left (L)
//* Then, recursively call preorder on curr.right (R)
//* Eventually we hit a base case of a null node
//* So we pop the call stack
//* push curr.val to the results array (N)
//* At the end, return results
//* This works because objects are pass by reference
//* So we are essentially passing around the memory address of "results"
function postorderTraversal(root) {
  if (root === null) return [];

  const results = [];
  return postorder(root, results);
}

function postorder(curr, results) {
  //* Base Case
  if (curr === null) return curr;

  postorder(curr.left, results); //* L
  postorder(curr.right, results); //* R
  results.push(curr.val); //* N

  return results;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
root2.right.left = new TreeNode(3);

const root3 = new TreeNode(10);

const root4 = new TreeNode(5);
root4.left = new TreeNode(10);
root4.left.left = new TreeNode(15);
root4.left.left.left = new TreeNode(20);
root4.left.left.left.left = new TreeNode(25);

console.log(postorderTraversal(root1));
console.log(postorderTraversal(root2));
console.log(postorderTraversal(root3));
console.log(postorderTraversal(root4));
console.log(postorderTraversal(null));

//* Time: O(n) - We have to process every node in the tree

//* Space: O(h) - The worst case space complexity scales with the height of the tree
//* If the input is a balanced tree, then it would be O(log n)
//* But the worst case scenario is a linked list style structure
//* So the space complexity scales with the height of the tree
