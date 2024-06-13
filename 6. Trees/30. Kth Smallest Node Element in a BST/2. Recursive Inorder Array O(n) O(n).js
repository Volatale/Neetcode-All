class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Inorder Traversal
//* Travel the entire tree and construct the array
//* Return the k-1th node
function kthSmallest(root, k) {
  //* Traverse the entire tree and return the k-1th node
  const results = inorder(root, []);

  return results[k - 1];
}

function inorder(curr, results) {
  if (curr === null) return;

  inorder(curr.left, results);
  results.push(curr.val);
  inorder(curr.right, results);

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(1);
root1.left.right = new TreeNode(2);
root1.right = new TreeNode(4);

const root2 = new TreeNode(5);
root2.left = new TreeNode(3);
root2.left.left = new TreeNode(2);
root2.left.left.left = new TreeNode(1);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(6);

const root3 = new TreeNode(5);

const root4 = new TreeNode(10);
root4.right = new TreeNode(20);
root4.right.right = new TreeNode(30);
root4.right.right.right = new TreeNode(40);
root4.right.right.right.right = new TreeNode(50);

console.log(kthSmallest(root1, 1)); //* 1
console.log(kthSmallest(root2, 3)); //* 3
console.log(kthSmallest(root3, 1)); //* 5
console.log(kthSmallest(root4, 5)); //* 50

//* Time: O(n) - It takes O(n) time to build the array
//* Pushing to an array is Amortized Constant Time

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is therefore limited to O(log n)
//* The results array scales with "n"
