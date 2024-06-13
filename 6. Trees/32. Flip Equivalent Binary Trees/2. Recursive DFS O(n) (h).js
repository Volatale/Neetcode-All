class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Two trees are equivalent if they have the same structure
//* Case 1: Both nodes are null -> Return true (same structure)
//* Case 2: Either node is null -> Return false (different structure)
//* Case 3: Values are different -> Return false (different values)
//* If those checks pass, then we need to check the children too
//* Check if Same Tree (left, left), (right, right)
//* If that doesn't work, we need to "flip"
//* So check for Symmetric Tree (left, right), (right, left)
function isFlipEquivalent(root1, root2) {
  //* If EITHER is null, check if both are null, return accordingly
  if (root1 === null || root2 === null) return root1 === root2;
  if (root1.val !== root2.val) return false; //* Different values

  return (
    //* Check if same tree
    (isFlipEquivalent(root1.left, root2.left) &&
      isFlipEquivalent(root1.right, root2.right)) ||
    //* If not, try flipping (check if symmetric tree)
    (isFlipEquivalent(root1.left, root2.right) &&
      isFlipEquivalent(root1.right, root2.left))
  );
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(3);
root2.right = new TreeNode(2);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(4);
root3.left.right = new TreeNode(5);
root3.left.right.left = new TreeNode(7);
root3.left.right.right = new TreeNode(8);
root3.right = new TreeNode(3);
root3.right.left = new TreeNode(6);

const root4 = new TreeNode(1);
root4.left = new TreeNode(3);
root4.left.right = new TreeNode(6);
root4.right = new TreeNode(2);
root4.right.left = new TreeNode(4);
root4.right.right = new TreeNode(5);
root4.right.right.left = new TreeNode(8);
root4.right.right.right = new TreeNode(7);

const root5 = new TreeNode(5);

const root6 = new TreeNode(6);

console.log(isFlipEquivalent(root1, root2)); //* True
console.log(isFlipEquivalent(root3, root4)); //* True
console.log(isFlipEquivalent(root5, null)); //* False
console.log(isFlipEquivalent(null, root6)); //* False
console.log(isFlipEquivalent(null, null)); //* True

//* Time: O(n) - Each node is processed at most twice
//* Each node makes 2 pairs of calls, but each node is unique in value
//* Only 2 out of 4 recursive calls will travel the depth of the tree
//* The other two terminate early

//* Space: O(h) - The depth of the call stack scales with the height of the largest tree
