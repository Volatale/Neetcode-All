class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a preorder traversal to traverse the tree
//* At each node, check if the node is within the given range
//* If it is, add it to the cummulative sum
//* Perform the same check on the left and right subtrees too
function rangeSumOfBST(root, low, high) {
  if (root === null) return null;

  const stack = [root];
  let sum = 0;

  while (stack.length > 0) {
    const curr = stack.pop();

    //* Only add if the value is within the given range
    if (curr.val >= low && curr.val <= high) {
      sum += curr.val;
    }

    //* We can keep going left, don't go left if val === low
    if (curr.val > low && curr.left) {
      stack.push(curr.left);
    }

    //* We can keep going right, don't go right if val === high
    if (curr.val < high && curr.right) {
      stack.push(curr.right);
    }
  }

  return sum;
}

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
root.right = new TreeNode(15);
root.right.right = new TreeNode(18);

const root2 = new TreeNode(10);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(3);
root2.left.left.left = new TreeNode(1);
root2.left.right = new TreeNode(7);
root2.left.right.left = new TreeNode(6);
root2.right = new TreeNode(15);
root2.left = new TreeNode(13);
root2.right.right = new TreeNode(18);

console.log(rangeSumOfBST(root, 7, 15)); //* 32
console.log(rangeSumOfBST(root2, 6, 10)); //* 10

//* Time: O(n) - In the worst case, we visit every node in the tree

//* Space: O(h) - In the worst case the space usage scales with the height of the tree
//* If we are given a tree that looks like a linked list, the stack scales in size with the height
//* When the tree is balanced, the space usage is O(log n)
