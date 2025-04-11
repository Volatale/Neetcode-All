//* Range Module tracks ranges of numbers represented as HALF-OPEN INTERVALS
//*     - We need to be able to query about them
//* A half-open interval [left, right) denotes all the real numbers x:
//*     - Where left <= x < right
//*         - In other words, "right" (or the end) is NOT inclusive
//*      - This also means we are dealing with INTEGERS (not numbers that can be represented as fractions)
//*         - i.e. decimals, fractions, ratios etc.
//* Since we are working with RANGES of values, a Segment Tree works perfectly
//*     - This lets us perform range queries and updates in O(log n) time
//*     - We need to perform coordinate compression and use lazy propagation
//* If ST[node] === 1, the segment tree IS tracking that number
//* If ST[node] === 0, the segment tree is NOT tracking that number
//! We are dealing with ONLINE QUERIES, we don't immediately know how large to make the ST
//*     - So use a DYNAMIC Segment Tree using actual nodes, not an array
//*     - We can't create an array of (1e9) * 2 space, so we have to create nodes as needed
//! Why do we return 1 when a node is outside of the query range?
//*     - Because if the OTHER child returns 1, then we get (0 & 1) === 0
//*     - And the out of bounds ONLY exists to prevent us from querying a range out of bounds
//*         - "0" should mean the node is explicitly NOT tracked, so "1" lets us remain neutral
//*         - That is, it is still possible to return true if we have a "1", but not if either is a "0"

//* Lets say the numbers range from 1 to 6
//*      0  1  2  3  4  5  6
//*     [0, 0, 0, 0, 0, 0, 0]
//! If I addRange(3, 5)
//*     - All of the elements in this range (exclusive) become 1
//*      0  1  2  3  4  5  6
//*     [0, 0, 0, 1, 1, 0, 0]
//! If I queryRange(2, 4), it returns false
//*     - We do not have a "1" in every element in the range
//* If I removeRange(0, 4)
//*     - All of the elements in this range (exclusive) become 0
//*      0  1  2  3  4  5  6
//*     [0, 0, 0, 0, 1, 0, 0]
//* When we perform queryRange, we can simply add up all of the elements in the range
//*     - If the number range is (0, 4), and we have [1, 1, 1, 1]
//*     - Then the total sum of all elements in this range should be (right - left)
//*         - If that is NOT the case, then you know not EVERY element in the range is 1
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

const rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
console.log(rangeModule.queryRange(10, 14)); //* True
console.log(rangeModule.queryRange(13, 15)); //* False
console.log(rangeModule.queryRange(16, 17)); //* True
