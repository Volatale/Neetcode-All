class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We need to process both children before evaluating the current node
//* Postorder Traversal allows us to guarantee that this happens
//* If root.val === 0 or 1, we evaluate the leaf node
//* If root.val === 2, we evaluate left || right
//* If root.val === 3, we evaluate left && right
//* A data structure must be used to store the evaluations of nodes
//* The easiest way to handle this is to use another array (use it as a stack)
//* Or, we can store the evaluations within a map
//* When we evaluate, we push the evaluation to the evaluations array
//* When we see a node of 2 or 3, since we are doing postorder traversal
//* We guarantee that the left and right children have ALREADY been processed
//* On top of that, a FULL binary tree has 0 or 2 children
//* So we are safe to do a double pop()
//* Pop the most recent two elements from evaluations, and push the evaluation back
function evaluateTree(root) {
  const stack = [];
  const evaluations = []; //* Holds the evaluations

  let curr = root;
  let prev = null;

  while (curr !== null || stack.length > 0) {
    //* Go left as far as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    //* If there is no right, or we just came from right
    if (curr.right === null || curr.right === prev) {
      stack.pop();
      evaluate(curr, evaluations); //* Evaluate based on value
      prev = curr;
      curr = null;
    } else {
      curr = curr.right; //* Go Right
    }
  }

  //* The evaulations array ends up with a single value; convert that to a boolean
  return Boolean(evaluations[0]);
}

function evaluate(curr, evaluations) {
  switch (curr.val) {
    case 0:
    case 1:
      evaluations.push(curr.val);
      break;
    case 2:
    case 3:
      const right = evaluations.pop();
      const left = evaluations.pop();

      if (curr.val === 2) {
        evaluations.push(left || right); //* OR
      } else {
        evaluations.push(left && right); //* AND
      }
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

//* Space: O(n) - The stack's size scales with the height of the tree
//* If the tree is balanced, it is limited to O(log n)
//* The space used by the evaluations stack scales with the height of the tree
