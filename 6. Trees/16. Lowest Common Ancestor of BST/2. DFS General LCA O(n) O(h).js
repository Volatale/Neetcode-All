class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//! This does NOT take into account the BST properties
//! It is a general LCA algorithm
//* We should use Postorder Traversal
//* Check the left and right subtrees for p and q
//* THEN we can check if we found both
//* We also need to check if the CURRENT node is either p or q
//* If left + right + mid >= 2, then we found BOTH p AND q
function lowestCommonAncestor(root, p, q) {
  if (root === null) return null;

  const results = { lca: null };

  postorder(root, p, q, results);
  return results.lca;
}

function postorder(curr, p, q, results) {
  if (curr === null || results.lca) return false;

  const left = postorder(curr.left, p, q, results); //* L
  const right = postorder(curr.right, p, q, results); //* R
  const mid = curr === p || curr === q; //* Check if the CURRENT node is either p or q

  //* If at least two are true
  if (left + right + mid >= 2) {
    results.lca = curr;
  }

  //* Return true if at least one is true
  return left || right || mid;
}

const root1 = new TreeNode(6);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(0);
root1.left.right = new TreeNode(4);
root1.left.right.left = new TreeNode(3);
root1.left.right.right = new TreeNode(5);
root1.right = new TreeNode(8);
root1.right.left = new TreeNode(7);
root1.right.right = new TreeNode(9);

const p1 = root1.left;
const q1 = root1.right;

const root2 = new TreeNode(6);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(0);
root2.left.right = new TreeNode(4);
root2.left.right.left = new TreeNode(3);
root2.left.right.right = new TreeNode(5);
root2.right = new TreeNode(8);
root2.right.left = new TreeNode(7);
root2.right.right = new TreeNode(9);

const p2 = root2.left.right.left;
const q2 = root2.left.right.right;

const root3 = new TreeNode(100);
root3.left = new TreeNode(4);
root3.right = new TreeNode(9);

const p3 = root3;
const q3 = root3.left;

console.log(lowestCommonAncestor(root1, p1, q1)); //* 6
console.log(lowestCommonAncestor(root2, p2, q2)); //* 4
console.log(lowestCommonAncestor(root3, p3, q3)); //* 100

//* Time: O(n) - In the worst case, we have to traverse the entire tree

//* Space: O(h) - The tree is not guaranteed to be balanced
//* So the space usage scales with the height of the tree
//* If the tree IS balanced, it scales at a rate of O(log n)
