class SegmentTree {
  //* A 4n space implementation doesn't need padding
  constructor(nums) {
    this.n = nums.length;
    this.nums = nums;
    this.ST = new Array(4 * this.n).fill(0);
    this.#build(0, 0, this.n - 1);
  }

  #build(node, left, right) {
    //* Base Case: Reached leaf node
    if (left === right) {
      this.ST[node] = this.nums[left];
    }

    //* Find midpoint so we can divide and conquer
    const mid = left + ((right - left) >> 1);

    //* Recursively build left and right subtrees
    this.#build(2 * node + 1, left, mid);
    this.#build(2 * node + 2, mid + 1, right);

    //* Merge values into parent
    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  #query(node, tl, tr, left, right) {
    //* Base Case: Out of Bounds query (0 is a neutral element)
    if (left > tr || right < tl) return 0;

    //* Segment is covered by query - return the value
    if (left <= tl && tr <= right) {
      return this.ST[node];
    }

    const mid = tl + ((tr - tl) >> 1);

    //* Partial Match - recursively explore left and right subtrees
    return (
      this.#query(2 * node + 1, tl, mid, left, right) +
      this.#query(2 * node + 2, mid + 1, tr, left, right)
    );
  }

  //* Abstraction for range queries
  rangeQuery(left, right) {
    return this.#query(0, 0, this.n - 1, left, right);
  }

  #update(node, left, right, i, val) {
    //* Base Case: Out of Bounds
    if (i < left || i > right) return;

    //* Found the node we want to update
    if (left === right) {
      this.nums[left] += val;
      this.ST[node] += val;
      return;
    }

    const mid = left + ((right - left) >> 1);

    if (i <= mid) {
      //* Travel to left child if index "i" exists on left
      this.#update(2 * node + 1, left, mid, i, val);
    } else {
      //* Otherwise, travel to the right child
      this.#update(2 * node + 2, mid + 1, right, i, val);
    }

    //* Update information stored in parent
    this.ST[node] = this.ST[node * 2 + 1] + this.ST[node * 2 + 2];
  }

  //* Abstraction for point updates
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
