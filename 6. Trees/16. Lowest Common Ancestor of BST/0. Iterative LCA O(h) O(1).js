class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We want to return the highest node that fulfils our condition
//* A BST is sorted from left to right
//* If we know our nodes are on the LEFT of the current node
//* Then move left, we can check this by comparing the current value against p and q's values
//* If root.val < p.val && root.val < q.val, the current value is TOO LARGE, so go to the left node
//* Do the inverse for checking if the current value is too small (then go right)
//* If neither are true, this MUST be the LCA
function lowestCommonAncestor(root, p, q) {
  if (root === null) return null;

  let curr = root;

  while (curr !== null) {
    if (curr.val < p.val && curr.val < q.val) {
      curr = curr.right; //* Find a LARGER number
    } else if (curr.val > p.val && curr.val > q.val) {
      curr = curr.left; //* Find a SMALLER number
    } else {
      return curr; //* The LCA Node
    }
  }
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

//* Time: O(h) - The time taken scales with the height of the tree
//* p, q, and the LCA are all guaranteed to exist within the tree somewhere

//* Space: O(1) - We just use a pointer to traverse the tree
//* The space usage does not scale with the input size
