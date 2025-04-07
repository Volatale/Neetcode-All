//* We pad the array to ensure that the segment size remains consistent
//* The segments that correspond to the leaf elements have a segment size of 1
//* Their parents have a segment size of 2
//* Their parent's parent's have a segment size of 4 and so on
//! Essentially, every level of the tree (starting at the bottom), the segment size doubles
//* We cannot make that statement when the tree is NOT a perfect binary tree
//! So we need to pad the tree to ensure that "n" is a power of 2
//* This logic is important when we need to apply lazy values
class SegmentTree {
  #n;
  #ST;
  #lazy;

  constructor(nums) {
    this.#n = this.#nextPowerOfTwo(nums.length);
    this.#ST = new Array(2 * this.#n).fill(0);
    this.#lazy = new Array(2 * this.#n).fill(0);
    this.#build(nums);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #build(nums) {
    //* Add the leaf elements to the segment tree
    for (let i = 0; i < nums.length; i++) {
      this.#ST[i + this.#n] = nums[i];
    }

    //* Build the internal nodes
    for (let i = this.#n - 1; i > 0; i--) {
      this.#ST[i] = this.#ST[i << 1] + this.#ST[(i << 1) | 1];
    }
  }

  #applyLazy(node, segSize) {
    if (this.#lazy[node] !== 0) {
      //* Apply the pending update for all of the elements in this segment at once
      this.#ST[node] += segSize * this.#lazy[node];

      //* Propagate the update to the left and right children (if the exist)
      if (node < this.#n) {
        this.#lazy[node << 1] += this.#lazy[node];
        this.#lazy[(node << 1) | 1] += this.#lazy[node];
      }

      //* Remove the lazy flag
      this.#lazy[node] = 0;
    }
  }

  //* Start at the root and propagate updates to children
  //* The tree height is given by log2(n)
  #push(left, right) {
    for (let i = Math.floor(Math.log2(this.#n)); i >= 0; i--) {
      const leftAncestor = left >> i; //* ith ancestor of left
      const rightAncestor = right >> i; //* ith ancestor of right
      const segmentSize = 1 << i; //* Segment size halves on each level

      this.#applyLazy(leftAncestor, segmentSize);
      this.#applyLazy(rightAncestor, segmentSize);
    }
  }

  //* When we get the value of a node, we include the lazy values too
  //* Why? Because we have no guarantee that the lazy values have been applied
  #rebuild(node) {
    //* Segment Size of the CHILDREN (because we start at the leaf nodes)
    let segmentSize = 1;

    while (node > 1) {
      node >>= 1; //* Parent of node

      //* Sum of left and right children (INCLUDING the lazy values)
      this.#ST[node] =
        this.#ST[node << 1] +
        this.#lazy[node << 1] * segmentSize +
        this.#ST[(node << 1) | 1] +
        this.#lazy[(node << 1) | 1] * segmentSize;

      segmentSize <<= 1;
    }
  }

  rangeQuery(left, right) {
    //* Move to the leaf nodes
    left += this.#n;
    right += this.#n;

    //* Propagate the lazy updates down from the parent
    this.#push(left, right);

    //* Segment size doubles on each level (going upward)
    let segmentSize = 1;
    let sum = 0;

    while (left <= right) {
      if (left & 1) {
        //* Apply any pending updates BEFORE processing the node
        this.#applyLazy(left, segmentSize);
        sum += this.#ST[left++];
      }

      if ((right & 1) === 0) {
        this.#applyLazy(right, segmentSize);
        sum += this.#ST[right--];
      }

      left >>= 1; //* Parent of left
      right >>= 1; //* Parent of right
      segmentSize <<= 1; //* The segment size doubles as we go up the tree
    }

    return sum;
  }

  rangeUpdate(left, right, val) {
    //* Move to the leaf nodes
    left += this.#n;
    right += this.#n;

    //* Propagate the lazy updates down from the parent
    this.#push(left, right);

    let L = left;
    let R = right;

    //* (Lazily) update the relevant segments
    while (L <= R) {
      if (L & 1) this.#lazy[L++] += val;
      if ((R & 1) === 0) this.#lazy[R--] += val;

      L >>= 1; //* Parent of L
      R >>= 1; //* Parent of R
    }

    //* Rebuild the tree
    this.#rebuild(left);
    this.#rebuild(right);
  }
}

const ST = new SegmentTree([1, 2, 3, 4]);
console.log("Range Queries 1");
console.log(ST.rangeQuery(0, 3)); //* 10
console.log(ST.rangeQuery(0, 1)); //* 3
console.log(ST.rangeQuery(2, 3)); //* 7
console.log(ST.rangeQuery(3, 3)); //* 4

console.log("Range Update on (0, 3) by +2");
//* Update all of the values by +2
ST.rangeUpdate(0, 3, 2);
console.log("Range Queries 2");
console.log(ST.rangeQuery(0, 1)); //* 7
console.log(ST.rangeQuery(2, 3)); //* 11
console.log(ST.rangeQuery(1, 3)); //* 15
console.log(ST.rangeQuery(0, 2)); //* 12
console.log(ST.rangeQuery(0, 3)); //* 18

//* [3, 4, 5, 6]
//* [8, 9, 5, 6]
console.log("Range Update on (0, 1) by +5");
console.log("Range queries 3");
ST.rangeUpdate(0, 1, 5);
console.log(ST.rangeQuery(0, 3)); //* 28

console.log("Range Update on (0, 3) by +5");
console.log("Range queries 4");
ST.rangeUpdate(0, 3, 5);
console.log(ST.rangeQuery(0, 3)); //* 48
