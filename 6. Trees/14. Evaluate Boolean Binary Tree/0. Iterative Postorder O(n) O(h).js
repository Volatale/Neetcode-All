class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Postorder DFS
//* We need to keep track of the nodes we have visited
//* Since its postorder, we will process nodes going back up the tree
//* Use a map to track the children we have processed, and their evaluations
//* We are guaranteed to have processed the children by the time we start going back up the tree
function evaluateTree(root) {
  const stack = [root];
  let curr = root;
  let prev = null; //* So we can safely traverse back up from right nodes

  const map = new Map(); //* Tracks the nodes' evaluations

  while (curr !== null || stack.length > 0) {
    //* Go left all the way
    while (curr !== null) {
      //* This is a leaf node
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      evaluate(curr, map); //* Modify the map
      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right; //* Go right
    }
  }

  return map.get(root);
}

function evaluate(curr, map) {
  switch (curr.val) {
    case 0:
    case 1:
      map.set(curr, curr.val);
      break;
    case 2:
      map.set(curr, map.get(curr.left) || map.get(curr.right));
      break;
    case 3:
      map.set(curr, map.get(curr.left) && map.get(curr.right));
      break;
  }
}

const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(1);

const root2 = new TreeNode(0);

console.log(evaluateTree(root)); //* True
console.log(evaluateTree(root2)); //* False

//* Time: O(n) - We have to traverse to every node in the tree
//* So the time taken scales with the number of nodes in the tree

//* Space: O(h) - The space usage scales with the height of the tree
//* It is not guaranteed to be balanced
