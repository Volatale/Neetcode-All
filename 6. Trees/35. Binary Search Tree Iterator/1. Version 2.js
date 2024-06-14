class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.inorder(root);
  }

  inorder(root) {
    //* Travel left as far as possible
    while (root !== null) {
      this.stack.push(root);
      root = root.left;
    }
  }

  next() {
    const node = this.stack.pop(); //* Save reference BEFORE we move
    this.inorder(node.right); //* On the right node, travel as far left as possible
    return node.val;
  }

  hasNext() {
    //* If there are elements on the stack, there are more nodes to process
    return this.stack.length > 0;
  }
}
