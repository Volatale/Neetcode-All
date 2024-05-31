class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use recursion to create the new links between nodes
//* The only situations we have to consider are:
//* Both nodes are null; return null
//* Either node is null; return the non-null node
//* Neither node is null; merge the values
//* Repeat this process for each node
function mergeTrees(root1, root2) {
  if (root1 === null && root2 === null) return null; //* Both null
  if (root1 === null) return root2; //* Only root2 exists
  if (root2 === null) return root1; //* Only root1 exists

  //* Merge the values
  root1.val += root2.val;

  //* Recursively set the left and right children
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(5);
root1.right = new TreeNode(2);

const root2 = new TreeNode(2);
root2.left = new TreeNode(1);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(3);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(1);

const root4 = new TreeNode(1);
root4.left = new TreeNode(2);

const root5 = new TreeNode(1);
root5.left = new TreeNode(10);

const root6 = new TreeNode(1);
root6.right = new TreeNode(20);

const root7 = new TreeNode(5);

const root8 = null;

console.log(mergeTrees(root1, root2));
console.log(mergeTrees(root3, root4));
console.log(mergeTrees(root5, root6));
console.log(mergeTrees(root7, root8));

//* Time: O(n) - In the worst case, we process every node in both trees
//* But this will always been capped at the smaller number of nodes in either tree

//* Space: O(n) - The depth of the call stack scales with the number of nodes
//* If both trees are balanced, the space usage is O(log n)
