class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a DFS on both trees to get the leaf node values
//* Instead of converting into an array (which requires pushing val with a separator)
//* We leave the arrays as they are (number[])
//* If the lengths of the arrays is different, just return false
//* It is impossible for the trees to be similar; 1 tree is more leaves than the other
//* Iterate through both arrays; check for dissimilarities
function leafSimilarTrees(root1, root2) {
  //* Get the leaf nodes' values
  const nodes1 = preorderTraversal(root1, []);
  const nodes2 = preorderTraversal(root2, []);

  //* It is impossible for both to be similar
  if (nodes1.length !== nodes2.length) return false;

  //* Check for dissimilarities
  for (let i = 0; i < nodes1.length; i++) {
    if (nodes1[i] !== nodes2[i]) return false;
  }

  //* The trees are similar
  return true;
}

function preorderTraversal(curr, results) {
  if (curr === null) return null;

  //* If curr is a leaf node, push its value to the array
  if (curr.left === null && curr.right === null) {
    results.push(curr.val);
  }

  preorderTraversal(curr.left, results); //* L
  preorderTraversal(curr.right, results); //* R

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(5);
root1.left.left = new TreeNode(6);
root1.left.right = new TreeNode(2);
root1.left.right.left = new TreeNode(7);
root1.left.right.right = new TreeNode(4);
root1.right = new TreeNode(1);
root1.right.left = new TreeNode(9);
root1.right.right = new TreeNode(8);

const root2 = new TreeNode(3);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(6);
root2.left.right = new TreeNode(7);
root2.right = new TreeNode(1);
root2.right.left = new TreeNode(4);
root2.right.right = new TreeNode(2);
root2.right.right.left = new TreeNode(9);
root2.right.right.right = new TreeNode(8);

const root3 = new TreeNode(100);

const root4 = new TreeNode(100);

const root5 = new TreeNode(5);
root5.left = new TreeNode(10);

const root6 = new TreeNode(5);
root5.right = new TreeNode(10);

console.log(leafSimilarTrees(root1, root2)); //* True
console.log(leafSimilarTrees(root3, root4)); //* True
console.log(leafSimilarTrees(root5, root6)); //* False

//* Time: O(n) - Process every node in both trees

//* Space: O(h) - The call stack's depth scales with the height of the deepest tree
//* Then, we have to store two arrays that scale with the number of leaf nodes
