class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* At each level, check if the current node is "null"
//* If it is, return curr
//* Otherwise, push curr.val to the results array (N)
//* Then recursively call preorder on curr.left (L)
//* Finally, recursively call preorder on curr.right (R)
//* At the end, return results
//* This works because objects are pass by reference
//* So we are essentially passing around the memory address of "results"
function preorderTraversal(root) {
  if (root === null) return null;

  const results = [];
  return preorder(root, results);
}

//* N L R
function preorder(curr, results) {
  //* Base Case
  if (curr === null) return curr;

  results.push(curr.val); //* N
  preorder(curr.left, results); //* L
  preorder(curr.right, results); //* R

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

console.log(preorderTraversal(root1));
console.log(preorderTraversal(root2));
console.log(preorderTraversal(root3));
console.log(preorderTraversal(root4));
console.log(preorderTraversal(null));

//* Time: O(n) - We have to process every node in the tree
//* Each node can have, at max, two children

//* Space: O(h) - The worst case space complexity scales with the height of the tree
//* If the input is a balanced tree, then it would be O(log n)
//* But the worst case scenario is a linked list style structure
//* So the space complexity scales with the height of the tree
