class SegmentTree {
  //* A 4n space implementation doesn't need padding
  constructor(nums) {
    this.n = nums.length;
    this.ST = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0); //* 0 means no pending changes for ith node
    this.#build(0, 0, this.n - 1, nums);
  }

  #build(node, left, right, nums) {
    //* Base Case: Reached leaf node
    if (left === right) {
      this.ST[node] = nums[left];
      return;
    }

    //* Find midpoint so we can divide and conquer
    const mid = left + ((right - left) >> 1);

    //* Recursively build left and right subtrees
    this.#build(2 * node + 1, left, mid, nums);
    this.#build(2 * node + 2, mid + 1, right, nums);

    //* Merge values into parent
    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  #applyLazy(node, left, right) {
    //* No pending lazy update
    if (this.lazy[node] !== 0) {
      //* Immediately update this node: tr - tl + 1 gives us the number of nodes in the range
      //* For each node in the range, we multiply the lazy value
      //* [0, 2] updated by +4 means (2 - 0 + 1 = 3) * 4 = 12
      this.ST[node] += (right - left + 1) * this.lazy[node];

      //* If this node is not a leaf, propagate lazy updates to children
      if (left !== right) {
        this.lazy[2 * node + 1] += this.lazy[node];
        this.lazy[2 * node + 2] += this.lazy[node];
      }
    }

    //* There are no more pending updates for the current node
    this.lazy[node] = 0;
  }

  #query(node, tl, tr, left, right) {
    this.#applyLazy(node, tl, tr);

    //* Base Case: Out of Bounds query (0 is a neutral element)
    if (left > tr || right < tl || tl > tr) return 0;

    //* Segment is completely covered by range - directly return the node vaule
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

  #pUpdate(node, left, right, i, val) {
    this.#applyLazy(node, left, right);

    //* Base Case: Out of Bounds
    if (i < left || i > right) return;

    //* Found the node we want to update
    if (left === right) {
      this.ST[node] += val;
      return;
    }

    const mid = left + ((right - left) >> 1);

    if (i <= mid) {
      //* Travel to left child if index "i" exists on left
      this.#pUpdate(2 * node + 1, left, mid, i, val);
    } else {
      //* Otherwise, travel to the right child
      this.#pUpdate(2 * node + 2, mid + 1, right, i, val);
    }

    //* Update information stored in parent (this node) using children
    this.ST[node] = this.ST[node * 2 + 1] + this.ST[node * 2 + 2];
  }

  //* Abstraction for point updates
  pointUpdate(i, val) {
    return this.#pUpdate(0, 0, this.n - 1, i, val);
  }

  //* Update everything WITHIN [left, right] (tl and tr change, not left and right)
  #rUpdate(node, tl, tr, left, right, val) {
    this.#applyLazy(node, tl, tr);

    //* Base Case: Out of Bounds query (0 is a neutral element)
    if (left > tr || right < tl || tl > tr) return 0;

    //* Update Node: Segment is completed covered by update range
    if (left <= tl && tr <= right) {
      //* Update this node immediately
      this.ST[node] += (tr - tl + 1) * val;

      if (tl !== tr) {
        //* Set up lazy updates for child nodes
        this.lazy[2 * node + 1] += val;
        this.lazy[2 * node + 2] += val;
      }

      return;
    }

    const mid = tl + ((tr - tl) >> 1);

    //* Recursively update left and right children
    this.#rUpdate(2 * node + 1, tl, mid, left, right, val);
    this.#rUpdate(2 * node + 2, mid + 1, tr, left, right, val);

    //* Update information stored in parent (this node) using children
    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  //* Abstraction for ease of range updates
  rangeUpdate(left, right, val) {
    return this.#rUpdate(0, 0, this.n - 1, left, right, val);
  }
}

const ST = new SegmentTree([4, 8, 6, 1, 3, 5]);

//* Range Queries Part 1
console.log("--- Range Queries Part 1 ---");
console.log(ST.rangeQuery(0, ST.n - 1)); //* 27 (queries entire array)
console.log(ST.rangeQuery(3, 4)); //* 4
console.log(ST.rangeQuery(0, 3)); //* 19
console.log(ST.rangeQuery(2, 2)); //* 6
console.log(ST.rangeQuery(-1, 4)); //* 22 (-1 is out of bounds, but [0, 3] is not)
console.log(ST.rangeQuery(-1, -1)); //* 0 (out of bounds)

//* Point Updates
console.log("--- Point Updates ---");
ST.rangeUpdate(3, 3, 10);
ST.rangeUpdate(5, 5, 15);
ST.rangeUpdate(0, 0, 8);

//* Range Queries Part 2
console.log("--- Range Queries Part 2 ---");
console.log(ST.rangeQuery(0, ST.n - 1)); //* 60
console.log(ST.rangeQuery(0, 2)); //* 26
console.log(ST.rangeQuery(3, 4)); //* 14
console.log(ST.rangeQuery(5, 5)); //* 20
console.log(ST.rangeQuery(-2, 4)); //* 40

//* Range Updates
console.log("--- Range Updates ---");
ST.rangeUpdate(0, 2, 2);
console.log(ST.rangeQuery(0, 2)); //* 32 (3 nodes increase by 2 (2 * 3 = 6))
ST.rangeUpdate(5, 5, -12);
console.log(ST.rangeQuery(5, 5)); //* 8 (20 - 12 = 8)
console.log(ST.rangeQuery(0, ST.n - 1)); //* 54 (entire range)
ST.rangeUpdate(0, ST.n - 1, 100);
console.log(ST.rangeQuery(0, ST.n - 1)); //* 654. Entire range increases by 100 (54 + (100 * 6) = 654)
