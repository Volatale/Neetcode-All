class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Preorder Traversal is in this order: N L R
//* Instead of using the callstack and recursion
//* We should use an explicit stack
//* Popping the stack lets us travel back UP the tree, like a return in recursion
//* In the recursive version, we push curr.val to the array
//* And then travel left, and we keep doing this until we reach the base case
//* The base case being curr === null
//* So we know we have to use a while loop here
//* The call stack uses stack frames, so we can model this using our own stack
//* Each node we visit we will push to the stack so we can return there later on
//* Afer the inner while loop's condition is no longer true
//* Travel right (which is exactly what happens in the recursive version)
function preorderTraversal(root) {
  if (root === null) return [];

  const results = [];
  const stack = []; //* Lets us travel back UP the tree (like popping the call stack)

  let curr = root;

  //* If curr !== null and stack is empty, we want to continue looping
  //* This means there are still unprocessed nodes
  while (curr !== null || stack.length > 0) {
    //* Travel as far left as possible
    while (curr !== null) {
      results.push(curr.val); //* N
      stack.push(curr);
      curr = curr.left; //* L
    }

    //* Then travel right
    curr = stack.pop().right; //* R
  }

  return results;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
root2.right.left = new TreeNode(3);

const root3 = new TreeNode(10);

const root4 = new TreeNode(5);
root4.left = new TreeNode(10);
root4.left.left = new TreeNode(15);
root4.left.left.left = new TreeNode(20);
root4.left.left.left.left = new TreeNode(25);

console.log(preorderTraversal(root1));
console.log(preorderTraversal(root2));
console.log(preorderTraversal(root3));
console.log(preorderTraversal(root4));
console.log(preorderTraversal(null));

//* Time: O(n) - The time taken scales with "n", which represents the number of nodes
//* The inner while loop does not activate once for every node we have
//* Instead, we just process each node once (O(n)); it takes α(1) to push to an array
//* Then it takes O(1) to pop from an array

//* Space: O(n) - At worst, the tree resembles a linked list
//* In which case the stack will hold all "n" nodes at the same time
