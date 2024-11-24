//* The implementation of a Segment Tree depends on the nature of the queries being asked
//! This Segment Tree is built for answering Range Sum Queries
//* In our case, since we want to answer Range SUM Queries, we use the following line:
//*     - this.ST[i] = this.ST[2 * i] + this.ST[2 * i + 1]
//*     - This line sets the value of the PARENT of the left and right children to be the SUM of both children
//* So if we had a left and right child of (3, 7) respectively
//*     - The parent's value would be 10 (3 + 7)
//! If we were trying to answer Min / Max Range Queries, we could do something like:
//*     - this.ST[i] = Math.max(this.ST[2 * i], this.ST[2 * i + 1])
//* So in other words, based on the nature of the queries, the following will need to be considered:

//* When building the Segment Tree:
//*     - Pay heed to what the VALUE of each node should be
//*         - If we want to answer range sum queries, a node's value should be its sum over the range
//*         - When you want to answer Min / Max over a range, a node's value should be its min() or max() over the range
//!     - The base case itself may also be relevant
//*         - We are using "this.ST[i] = this.nums[left]" because a leaf node represents an individual array element

//* When implementing the Query method:
class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.nums = nums;
    this.ST = new Array(4 * this.n).fill(0); //* Allocate sufficient space for the tree
    this.#build(0, 0, this.n - 1);
  }

  #build(node, left, right) {
    //* Base Case (we are at a leaf, so we can't divide and conquer any further)
    if (left === right) {
      this.ST[node] = this.nums[left]; //* Leaf nodes represent individual array elements
      return;
    }

    //* Find the mid point so we can divide and conquer
    const mid = left + ((right - left) >> 1);

    //* Recursively build left and right subtrees
    this.#build(2 * node + 1, left, mid); //* [0 to n / 2 - 1]
    this.#build(2 * node + 2, mid + 1, right); //* [n / 2 to n - 1]

    //* Store the sum of both children within the parent
    //* left child is at 2 * node + 1 and right child is at 2 * node + 2
    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  //* tl and tr typically stand for "tree left" and "tree right"
  //* They are used to denote the range [tl, tr] of the segment the current node represents
  //* These values are used to track the BOUNDARIES of the subsegment as we (recursively) split the array
  //* Left and Right represent the query range itself: [left, right] denotes the range of indices to query over
  //* "tm" stands for "tree point" - essentially, we split in a similar manner to binary search
  //* query(1, 0, n - 1, 0, 4) gets the sum of values in the range [0, 4] (inclusive)
  #query(node, tl, tr, left, right) {
    //* When traveling left, tr decreases and when traveling right, tl increases
    //* If left > tr, you travelled too far right, and if right < tl, you travelled too far left
    //* If it lies out of bounds, return 0 (neutral element)
    if (left > tr || right < tl) {
      return 0;
    }

    //* Base Case
    //! Use this condtion if we want to check if current segment is fully contained with query range
    //* In other words, when there is no need for an exact match
    //* Example: Query = [2, 6], Node = [3, 5] -> Match because [3, 5] is within query range
    if (left <= tl && tr <= right) {
      return this.ST[node];
    }

    //* Base Case
    //! Use this condition if we need an EXACT match on the query range
    //* Such as if we need to directly return precomputed values
    //* Example: Query = [2, 6], Node = [2, 3] -> Failed match because we need an EXACT match
    if (tl === left && tr === right) {
      return this.ST[node];
    }

    //* Find mid point
    const mid = tl + ((tr - tl) >> 1);

    //* Recursively traverse left and right to find the node
    //! Note that left and right do not change, but tl and tr do
    return (
      this.#query(2 * node + 1, tl, mid, left, right) +
      this.#query(2 * node + 2, mid + 1, tr, left, right)
    );
  }

  //* An abstraction to make querying easier
  rangeQuery(left, right) {
    return this.#query(0, 0, this.n - 1, left, right);
  }

  #update(node, left, right, i, val) {
    //* Base Case: We found the leaf node, so we update its value
    if (left === right) {
      this.nums[left] += val; //* The nums array itself is ALSO modified
      this.ST[node] += val;
      return;
    }

    //* Find mid point
    const mid = left + ((right - left) >> 1);

    //* If the node value is on the left, update the left
    if (left <= i && i <= mid) {
      this.#update(2 * node + 1, left, mid, i, val);
    } else {
      this.#update(2 * node + 2, mid + 1, right, i, val);
    }

    //* Update the information stored in the parent
    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  //* An abstraction to make point updates easier
  pointUpdate(i, val) {
    return this.#update(0, 0, this.n - 1, i, val);
  }
}

const ST = new SegmentTree([2, 3, 1, 7, 9, 11, 3]);

//* Range Queries
console.log(ST.rangeQuery(0, 3)); // Expected: 2 + 3 + 1 + 7 = 13
console.log(ST.rangeQuery(4, 6)); // Expected: 9 + 11 + 3 = 23
console.log(ST.rangeQuery(1, 5)); // Expected: 3 + 1 + 7 + 9 + 11 = 31
console.log(ST.rangeQuery(0, 6)); // Expected: 2 + 3 + 1 + 7 + 9 + 11 + 3 = 36
console.log(ST.rangeQuery(2, 2)); // Expected: 1

//* Point Updates
ST.pointUpdate(2, 5);
console.log(ST.rangeQuery(0, 3)); // Expected: 2 + 3 + (1 + 5) + 7 = 18
console.log(ST.rangeQuery(2, 2)); // Expected: 1 + 5 = 6

ST.pointUpdate(4, -3); //* Subtract 3 from index 4 (nums[4] becomes 6)
console.log(ST.rangeQuery(4, 6)); //* 6 + 11 + 3 = 20
console.log(ST.rangeQuery(3, 5)); //* 7 + 6 + 11 = 24

//! Edge Cases
console.log(ST.rangeQuery(0, 0)); //* Element at index 0
console.log(ST.rangeQuery(ST.n - 1, ST.n - 1)); //* Element at last index
console.log(ST.rangeQuery(0, ST.n - 1)); //* Full Range Query
console.log(ST.rangeQuery(-1, 2)); //* Handle invalid range gracefully
console.log(ST.rangeQuery(7, 10)); //* Handle invalid range gracefully
