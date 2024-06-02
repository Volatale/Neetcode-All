class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* To find the LCA (iteratively), there are a few things we have to do
//* Create a mapping between each node to their parent
//* That way, we know what the parent of "p" and "q" are
//* Next, we need to travel from "p" all the way up to the root node's parent
//* Record the path taken by "p" using the Ancestor set
//* Finally, travel from "q" to the LCA
//* "q" will travel upward; stop iterating when "q" exists in Ancestor
//* That node in particular is the LCA
function lowestCommonAncestor(root, p, q) {
  if (root === null) return null;

  const stack = [root];

  //* node : parent - Root's parent is null; we get an infinite loop otherwise
  const parents = new Map([[root, null]]);

  //* Tracks the path that p will take to the root node
  const ancestors = new Set();

  //* 1. Map the relationship between nodes and their parents
  //* Keep looping until BOTH p and q exist in the map
  while (!parents.has(p) || !parents.has(q)) {
    const curr = stack.pop();

    //* Set curr.left's parent to curr
    if (curr.left) {
      parents.set(curr.left, curr);
      stack.push(curr.left);
    }

    //* Set curr.right's parent to curr
    if (curr.right) {
      parents.set(curr.right, curr);
      stack.push(curr.right);
    }
  }

  //* 2. Travel from p to the root node, track the path it took
  while (p !== null) {
    ancestors.add(p);
    p = parents.get(p);
  }

  //* 3. Travel up from q to the LCA (the first node that both p & q travelled to)
  while (!ancestors.has(q)) {
    q = parents.get(q);
  }

  //* The LCA
  return q;
}

const root1 = new TreeNode(6);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(0);
root1.left.right = new TreeNode(4);
root1.left.right.left = new TreeNode(3);
root1.left.right.right = new TreeNode(5);
root1.right = new TreeNode(8);
root1.right.left = new TreeNode(7);
root1.right.right = new TreeNode(9);

const p1 = root1.left;
const q1 = root1.right;

const root2 = new TreeNode(6);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(0);
root2.left.right = new TreeNode(4);
root2.left.right.left = new TreeNode(3);
root2.left.right.right = new TreeNode(5);
root2.right = new TreeNode(8);
root2.right.left = new TreeNode(7);
root2.right.right = new TreeNode(9);

const p2 = root2.left.right.left;
const q2 = root2.left.right.right;

const root3 = new TreeNode(100);
root3.left = new TreeNode(4);
root3.right = new TreeNode(9);

const p3 = root3;
const q3 = root3.left;

console.log(lowestCommonAncestor(root1, p1, q1)); //* 6
console.log(lowestCommonAncestor(root2, p2, q2)); //* 4
console.log(lowestCommonAncestor(root3, p3, q3)); //* 100

//* Time: O(n) - In the worst case, it takes O(n) time to map out every node relationship
//* Imagine a scenario where p and q are the final nodes in the tree
//* It then takes O(h) time to traverse from p to the root node's parent
//* Finally, it takes O(h) in the worst case to move from q to the LCA

//* Space: O(n) - In the worst case we store every node in the tree within the map
//* The space used by the ancestor set scales with the height of the tree
