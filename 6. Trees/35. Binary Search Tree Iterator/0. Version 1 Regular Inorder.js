class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.curr = root;
  }

  hasNext() {
    //* If curr !== null, or stack.length > 0, there are still nodes to process
    return this.curr !== null || this.stack.length > 0;
  }

  next() {
    //* Go left as far as possible
    while (this.curr !== null) {
      this.stack.push(this.curr);
      this.curr = this.curr.left;
    }

    this.curr = this.stack.pop();
    let val = this.curr.val; //* Process Node
    this.curr = this.curr.right; //* Go Right
    return val;
  }
}
