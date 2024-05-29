class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* There are four different cases to consider at each node
//* p and q are BOTH null, in which case the structure is the same
//* p OR q are null, in which case the structures are DIFFERENT
//* p.val !== q.val, in which case the values are different
//* p.val === q.val, in which case the values are the same and so is the structure
//* Recursively perform these checks for every node until every node is processed
function sameTree(p, q) {
  if (p === null && q === null) return true; //* Both null; same structure
  if (p === null || q === null) return false; //* Different structures
  if (p.val !== q.val) return false; //* Values don't match

  //* Check the left and right subtrees
  return sameTree(p.left, q.left) && sameTree(p.right, q.right);
}

const p1 = new TreeNode(1);
const q1 = new TreeNode(2);

const p2 = new TreeNode(1);
p2.left = new TreeNode(2);
p2.right = new TreeNode(3);

const q2 = new TreeNode(1);
q2.left = new TreeNode(2);
q2.right = new TreeNode(3);

const p3 = new TreeNode(5);
p3.left = new TreeNode(10);

const q3 = new TreeNode(5);
p3.right = new TreeNode(10);

console.log(sameTree(p1, q1)); //* False, values are different
console.log(sameTree(p2, q2)); //* True
console.log(sameTree(p3, q3)); //* False, structures are different
console.log(sameTree(null, q3)); //* False, structures are different
console.log(sameTree(p3, null)); //* False, structures are different
console.log(sameTree(null, null)); //* True

//* Time: O(n)) - In the worst case, the trees are identical
//* Which means that we have to check every node in both trees

//* Space: O(h) - The space usage scales with the height of the deepest tree
//* Both trees can have a different height
