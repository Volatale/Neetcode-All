class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform Preorder Traversal (DFS)
//* As we reach each node, check if that node is the same as subroot
function isSubtree(root, subroot) {
  function preorderTraversal(curr) {
    if (curr === null) return null;

    if (isSameTree(curr, subroot)) {
      exists = true;
      return true;
    }

    //* Check the left and right subtrees too
    preorderTraversal(curr.left, subroot);
    preorderTraversal(curr.right, subroot);
  }

  let exists = false;
  preorderTraversal(root);
  return exists;
}

function isSameTree(p, q) {
  if (p === null && q === null) return true; //* Same Structure
  if (p === null || q === null) return false; //* Different Structure
  if (p.val !== q.val) return false; //* Different Values

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(4);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(2);
root1.right = new TreeNode(5);

const subRoot1 = new TreeNode(4);
subRoot1.left = new TreeNode(1);
subRoot1.right = new TreeNode(2);

const root2 = new TreeNode(3);
root2.left = new TreeNode(4);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(2);
root2.left.right.left = new TreeNode(0);
root2.right = new TreeNode(5);

const subRoot2 = new TreeNode(4);
subRoot2.left = new TreeNode(1);
subRoot2.right = new TreeNode(2);

const root3 = new TreeNode(12);
const subRoot3 = new TreeNode(1);

const root4 = new TreeNode(1);
root4.left = new TreeNode(2);
root4.right = new TreeNode(3);

const subRoot4 = new TreeNode(1);
subRoot4.left = new TreeNode(2);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);

const subRoot5 = new TreeNode(1);
subRoot5.left = new TreeNode(2);

console.log(isSubtree(root1, subRoot1)); //* True
console.log(isSubtree(root2, subRoot2)); //* False
console.log(isSubtree(root3, subRoot3)); //* False
console.log(isSubtree(root4, subRoot4)); //* False
console.log(isSubtree(root5, subRoot5)); //* True

//* Time: O(n * m) - "n" and "m" are the number of nodes in our respective inputs
//* For each node in root, we call isSameTree

//* Space: O(h) - The space usage scales with the height of "root"
