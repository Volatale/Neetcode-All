class SegmentTreeNode {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = null; //* Left Child
    this.right = null; //* Right Child
    this.val = 0; //* 0 === not tracked, 1 === tracked
    this.lazy = -1; //* -1 means no update because "0" and "1" mean untracked/tracked
  }
}

class RangeModule {
  constructor() {
    this.root = new SegmentTreeNode(0, 10 ** 9); //* Full range: [0, 10e9)
  }

  #applylazy(node) {
    //* No lazy update
    if (node.lazy === -1) return;

    const mid = node.start + ((node.end - node.start) >> 1);

    //* Create the child nodes if they don't exist
    if (!node.left) node.left = new SegmentTreeNode(node.start, mid);
    if (!node.right) node.right = new SegmentTreeNode(mid + 1, node.end);

    //* Apply lazy updates to children (set both .val AND .lazy)
    node.left.val = node.right.val = node.lazy;
    node.left.lazy = node.right.lazy = node.lazy;

    //* Remove pending lazy flag
    node.lazy = -1;
  }

  #update(node, left, right, value) {
    //* Out of bounds of query range
    if (node.start > right || node.end < left) return;

    //* Full overlap, return the value
    if (left <= node.start && node.end <= right) {
      node.val = value;
      node.lazy = value; //* To be propagated to the children
      return;
    }

    this.#applylazy(node);

    const mid = node.start + ((node.end - node.start) >> 1);

    if (!node.left) node.left = new SegmentTreeNode(node.start, mid);
    if (!node.right) node.right = new SegmentTreeNode(mid + 1, node.end);

    this.#update(node.left, left, right, value);
    this.#update(node.right, left, right, value);

    //* (0 & 1) === (1 & 0) === 0, and (1 & 1) === 1
    //* Both children must be set to "tracked" for THIS to be tracked
    node.val = node.left.val & node.right.val;
  }

  #query(node, left, right) {
    //* Returning 0 here is incorrect, it would guarantee nothing is ever marked as tracked
    if (node.start > right || node.end < left) return 1;

    //* Full overlap, return the value
    if (left <= node.start && node.end <= right) return node.val;

    this.#applylazy(node);

    const mid = node.start + ((node.end - node.start) >> 1);
    if (!node.left) node.left = new SegmentTreeNode(node.start, mid);
    if (!node.right) node.right = new SegmentTreeNode(mid + 1, node.end);

    //* (1 & 1) === 1 and (0 & 1) or (1 & 0) === 0
    return (
      this.#query(node.left, left, right) & this.#query(node.right, left, right)
    );
  }

  //* The Segment Tree uses INCLUSIVE interval logic, so subtract 1 from right to offset that
  addRange(left, right) {
    this.#update(this.root, left, right - 1, 1);
  }

  removeRange(left, right) {
    this.#update(this.root, left, right - 1, 0);
  }

  queryRange(left, right) {
    //* 1 means all of the numbers in the range are being tracked
    return this.#query(this.root, left, right - 1) === 1;
  }
}
