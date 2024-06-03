class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a Depth First Search
//* There are only three cases at each node
//* Case 1: Left AND Right are BOTH null -> true (same structure)
//* Case 2: Left OR Right are null -> false (structures are different)
//* Case 3: Left.val !== Right.val -> false (values are different)
//* We want to traverse the entire tree on both sides at the same time
//* (left.left & right.right) && (left.right & right.left)
function isSymmetric(root) {
  //* A single node is symmetrical
  if (root === null) return true;

  //* We still need to check the left and right subtrees
  const stack = [root.left, root.right];

  while (stack.length > 0) {
    const right = stack.pop();
    const left = stack.pop();

    if (left === null && right === null) continue; //* Null nodes, check next set
    if (left === null || right === null) return false; //* Different structures
    if (left.val !== right.val) return false; //* Different Values

    //* Compare outer nodes
    stack.push(left.left);
    stack.push(right.right);

    //* Compare inner nodes
    stack.push(left.right);
    stack.push(right.left);
  }

  return true;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right = new TreeNode(2);
root2.right.right = new TreeNode(3);

console.log(isSymmetric(root1)); //* True
console.log(isSymmetric(root2)); //* False

//* Time: O(n) - We have to traverse the entire tree to check for symmetricity

//* Space: O(h) - The stack size scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
