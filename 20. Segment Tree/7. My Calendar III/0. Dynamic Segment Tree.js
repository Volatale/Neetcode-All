//* "k" booking happens when "k" events have some NON-EMPTY intersection
//*     - I.e there is some time common to all k events

//* Events are in the form [startTime, endTime) (HALF-OPEN INTERVAL)
//*     - [3, 4], [4, 5] do not overlap
//* After each event, return "k", which represents maximum-k booking between ALL previous events

//* This is an interval problem (startTime, endTime)
//* We essentially want to find the maximum number of overlaps at any given point
//* Track the maximum overall
//* After adding an event, potentially update the new maximum by querying

//* Perform range updates for the current interval
//* And for every interval that falls in this range (L, R - 1)
//* Add one, then when the tree is being rebuild, take the max(leftChild, rightChild)
//*     - Additionally, potentially update the max overall "k" bookings
//! We need a dynamic segment tree, the range of (start, end) is not known ahead of time
//*     - 0 <= startTime < endTime <= 10^9
//*     - We are also not given all of the events within a data structure
//*         - Coordinate compression is only possible if we can use an iterative ST
//*         - In this case, we have to query the ENTIRE tree every time which would mean (10 ** 9 * 2) space
//* Thus, our only choice is to DYNAMICALLY create nodes as needed
class SegmentTreeNode {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = null;
    this.right = null;
    this.val = 0;
    this.lazy = 0;
  }
}

class MyCalendarThree {
  constructor() {
    this.root = new SegmentTreeNode(0, 10 ** 9);
    this.k = 0;
  }

  #applyLazy(node) {
    //* There is no pending lazy update
    if (node.lazy === 0) return;

    node.val += node.lazy;

    if (node.start !== node.end) {
      //* Used solely to ensure the left and right children exist
      const mid = node.start + ((node.end - node.start) >> 1);

      if (!node.left) node.left = new SegmentTreeNode(node.start, mid);
      if (!node.right) node.right = new SegmentTreeNode(mid + 1, node.end);

      //* Propagate lazy updates to left and right children
      node.left.lazy += node.lazy;
      node.right.lazy += node.lazy;
    }

    //* Remove the lazy flag
    node.lazy = 0;
  }

  #update(node, left, right, val) {
    this.#applyLazy(node);

    //* This node is out of our query bounds
    if (node.end < left || node.start > right) return;

    //* Full overlap, lazily update this node (and its children)
    if (left <= node.start && node.end <= right) {
      node.lazy += val;
      this.#applyLazy(node);
      this.k = Math.max(this.k, node.val); //! Potentially find new maximum
      return;
    }

    //* Ensure left and right children exist
    const mid = node.start + ((node.end - node.start) >> 1);

    if (!node.left) node.left = new SegmentTreeNode(node.start, mid);
    if (!node.right) node.right = new SegmentTreeNode(mid + 1, node.end);

    this.#update(node.left, left, right, val);
    this.#update(node.right, left, right, val);

    node.val = Math.max(node.left.val, node.right.val);
  }

  //* Half-open intervals means [3, 4] and [4, 5] don't overlap
  book(startTime, endTime) {
    this.#update(this.root, startTime, endTime - 1, 1);
    return this.k;
  }
}

const calendar = new MyCalendarThree();
console.log(calendar.book(10, 20)); //* 1
console.log(calendar.book(50, 60)); //* 1
console.log(calendar.book(10, 40)); //* 2
console.log(calendar.book(5, 15)); //* 3
console.log(calendar.book(5, 10)); //* 3
console.log(calendar.book(25, 55)); //* 3
