class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a BFS (Level Order Traversal)
//* If we encounter a NULL node, all the subsequent nodes should be null too
//* So for this problem we DO want to push null nodes to the queue
function isCompleteTree(root) {
  if (root === null) return true;

  function bfs(queue) {
    //* Base Case - tree is complete
    if (queue.length === 0) return true;

    const newQueue = []; //* A "queue" for the NEXT level
    let foundNull = null;

    for (let curr of queue) {
      if (curr === null) {
        foundNull = true;
      } else {
        if (foundNull) return false;

        //* Push the NEXT level's values
        newQueue.push(curr.left);
        newQueue.push(curr.right);
      }
    }

    //* Check the next level
    return bfs(newQueue);
  }

  //* Perform BFS at each level
  return bfs([root]);
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);
root1.right = new TreeNode(3);
root1.right.left = new TreeNode(6);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(3);

const root3 = new TreeNode(2);
root3.right = new TreeNode(4);

const root4 = new TreeNode(1);
root4.left = new TreeNode(2);
root4.left.left = new TreeNode(3);
root4.left.right = new TreeNode(4);
root4.right = new TreeNode(3);
root4.right.left = new TreeNode(7);
root4.right.right = new TreeNode(8);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);
root5.left.left = new TreeNode(5);
root5.right = new TreeNode(3);
root5.right.left = new TreeNode(7);
root5.right.right = new TreeNode(8);

console.log(isCompleteTree(root1)); //* True
console.log(isCompleteTree(root2)); //* False
console.log(isCompleteTree(root3)); //* False
console.log(isCompleteTree(root4)); //* True
console.log(isCompleteTree(root5)); //* False

//* Time: O(n) - In the worst case, we have to process every node in the list
//* It takes O(1) to dequeue and O(1) to enqueue

//* Space: O(h) - If the tree is unbalanced, we'll return almost immediately
//* If the tree is balanced, the space usage scales with the height of the tree
//* In cases where there are 2 levels (0, 1, 2), 2^h = 4, so the queue will store up to 4 nodes at once
//* The recursive calls are tail call optimised
