class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Take nodes from preorder, "NLR" processes before "LRN"
//* The postorder array tells us when to stop adding to LEFT subtree
//* Keep adding to left until root.val === postorder[postIndex]
//* For example, in [1, 2, 3, 4, 5], [2, 4, 5, 3, 1]
//* 1 is the root, and 2 is the left child
//* But root.val will be 2, and postorder[0] = 2
//* So we are at the LEFTMOST node in the tree
//* So now we go back up the tree, but we have to increment postindex
//* Essentially, postorder tells us how far left we can go
function buildTree(preorder, postorder) {
  function build() {
    //* Take nodes from preorder
    const root = new TreeNode(preorder[preIndex++]);

    //* We take nodes from preorder, so build the left subtree first
    //* Keep going until we are at the leftmost node (denoted by postorder)
    if (root.val !== postorder[postIndex]) {
      root.left = build();
    }

    if (root.val !== postorder[postIndex]) {
      root.right = build();
    }

    //* The "new" leftmost node boundary
    postIndex++;
    return root;
  }

  //* Tracks the positions throughout the recursion
  let preIndex = 0;
  let postIndex = 0;

  return build();
}

console.log(buildTree([1, 2, 3, 4, 5], [2, 4, 5, 3, 1]));
console.log(buildTree([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]));

//* Time: O(n) - We have to process every element in the array(s)
//* There are "n" recursive calls made at worst
//* It takes O(1) time to create a new node and we do this "n" times

//* Space: O(n) - We create a new node for every unique value in the arrays (n nodes)
//* The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the depth of the call stack is O(h)
