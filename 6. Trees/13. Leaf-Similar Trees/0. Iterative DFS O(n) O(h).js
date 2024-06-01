class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a DFS on both trees to travel to each leaf node
//* Instead of storing the node values and comparing at the END
//* We should travel to each leaf node in the tree and compare them IMMEDIATELY
//* That way we can save space by not using auxillary arrays
function leafSimilarTrees(root1, root2) {
  //* Two stacks for two separate DFS
  const stack1 = [root1];
  const stack2 = [root2];

  while (stack1.length > 0 && stack2.length > 0) {
    //* Compare the leaf nodes, if they aren't equal
    if (dfs(stack1) !== dfs(stack2)) return false;
  }

  //* If one stack empties earlier, this check is necessary
  return stack1.length === 0 && stack2.length === 0;
}

function dfs(stack) {
  //* Set curr to the top element in the stack
  let curr = stack[stack.length - 1];

  while (curr !== null) {
    //* Process the top node
    curr = stack.pop();

    //* Found the leaf node, return the value
    if (curr.left === null && curr.right === null) return curr.val;

    //* We ONLY push child nodes that are NOT null
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }
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

//* Space: O(h) - The depth of the stacks scales with the height of the longest tree
