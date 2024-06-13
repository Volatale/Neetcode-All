class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(preorder, postorder) {
  function build(start, end) {
    if (start > end) return null;

    //* Create the new node
    const curr = new TreeNode(preorder[preIndex++]);

    if (start === end) return curr;

    //* Find the index of the value in preorder
    const valIndex = indices[preorder[preIndex]];

    //* Build the left and right subtrees
    curr.left = build(start, valIndex);
    curr.right = build(valIndex + 1, end - 1);

    return curr;
  }

  let preIndex = 0;
  const indices = {};

  for (let i = 0; i < postorder.length; i++) {
    indices[postorder[i]] = i;
  }

  return build(0, postorder.length - 1);
}

console.log(buildTree([1, 2, 3, 4, 5], [2, 4, 5, 3, 1]));
console.log(buildTree([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]));

//* Time: O(n) - We have to process every element in the array(s)
//* There are "n" recursive calls made at worst
//* It takes O(1) time to create a new node and we do this "n" times

//* Space: O(n) - We create a new node for every unique value in the arrays (n nodes)
//* The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the depth of the call stack is O(h)
