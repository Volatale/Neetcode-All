class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Inorder Traversal
//* After traveling left at the current node and returning
//* Decrement "k"; we have "found" a node
//* Then, travel right
//* If k === 0, you found the kth node
function kthSmallest(root, k) {
  function inorder(curr) {
    if (curr === null) return;

    inorder(curr.left);
    k--; //* Found a node

    //* Found the kth node
    if (k === 0) {
      kthSmallest = curr.val;
      return;
    }

    inorder(curr.right);
  }

  let kthSmallest = null;
  inorder(root);
  return kthSmallest;
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

//* Time: O(n) - The time taken scales with "k", but "k" is <= n
//* In the worst case, we have to traverse "n" times

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the space usage is therefore limited to O(log n)
