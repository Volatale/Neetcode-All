class SegmentTree {
  #n;
  #ST;
  #lazy;

  constructor(nums) {
    this.#n = nums.length;
    this.#ST = new Array(2 * this.#n).fill(0);
    this.#lazy = new Array(2 * this.#n).fill(0);
    this.#build(nums);
  }

  #build(nums) {
    //* The leaf nodes are stored in indices [n, 2n - 1]
    for (let i = 0; i < this.#n; i++) {
      this.#ST[i + this.#n] = nums[i];
    }

    //* The internal nodes are stored in indices [1, n - 1]
    for (let i = this.#n - 1; i > 0; i--) {
      this.#ST[i] = this.#ST[i << 1] + this.#ST[(i << 1) | 1];
    }
  }

  #applyLazy(node, segSize) {
    //* This node has a pending lazy update
    if (this.#lazy[node] !== 0) {
      //* Immediately update this node for every node in the segment size
      this.#ST[node] += segSize * this.#lazy[node];

      //* Push the lazy updates to the children
      if (node < this.#n) {
        this.#lazy[node << 1] += this.#lazy[node];
        this.#lazy[(node << 1) | 1] += this.#lazy[node];
      }

      //* Clear the lazy flag for this node
      this.#lazy[node] = 0;
    }
  }

  //* The segment size is a power of two (it doubles each level going up)
  #rebuild(node) {
    node >>= 1; //* Move to the parent of node
    let segSize = 2; //* We start at the segments that represent TWO nodes

    while (node > 0) {
      this.#ST[node] =
        this.#ST[node << 1] + //* Left Child
        this.#ST[(node << 1) | 1] + //* Right Child
        segSize * this.#lazy[node]; //* Also apply update for every node in segment

      node >>= 1; //* Move to the parent
      segSize <<= 1; //* The segment size doubles each level (going upward)
    }
  }

  rangeQuery(left, right) {
    //* Move to the leaf nodes
    left += this.#n;
    right += this.#n;

    let sum = 0;
    let segSize = 1; //* Segment size at the leaves is 1 (2^h at root)

    //* Push the pending lazy updates down from the root to the leaves)
    for (let i = Math.floor(Math.log2(this.#n)); i >= 0; i--) {
      this.#applyLazy(left >> i, segSize << i);
      this.#applyLazy(right >> i, segSize << i);
    }

    //* Calculate the range query
    while (left <= right) {
      //* "Left" points to a RIGHT child (parent does not fully include our range)
      //* Dodge the parent node (including it gives incorrect result)
      if (left & 1) {
        this.#applyLazy(left, segSize);
        sum += this.#ST[left++];
      }

      //* "Right" points to a LEFT child (parent does not fully include our range)
      if ((right & 1) === 0) {
        this.#applyLazy(right, segSize);
        sum += this.#ST[right--];
      }

      left >>= 1; //* Move left to its parent
      right >>= 1; //* Move right to its parent
      segSize <<= 1; //* Segment size doubles each level
    }

    return sum;
  }

  rangeUpdate(left, right, val) {
    //* Use these are used to rebuild the tree on the way up)
    left += this.#n;
    right += this.#n;

    //* Use these to apply the updates themselves
    let L = left;
    let R = right;
    let segSize = 1;

    //* Push the pending lazy updates down from the root to the leaves)
    for (let i = Math.floor(Math.log2(this.#n)); i >= 0; i--) {
      this.#applyLazy(left >> i, segSize << i);
      this.#applyLazy(right >> i, segSize << i);
    }

    //* Lazily apply the range updates
    while (L <= R) {
      if (L & 1) {
        this.#lazy[L] += val;
        this.#applyLazy(L, segSize);
        L++;
      }

      if ((R & 1) === 0) {
        this.#lazy[R] += segSize * val;
        this.#applyLazy(R, segSize);
        R--;
      }

      L >>= 1; //* Move L to its parent
      R >>= 1; //* Move R to its parent
      segSize <<= 1; //* Segment size doubles each level
    }

    //* Rebuild the tree
    this.#rebuild(left);
    this.#rebuild(right);
  }
}

const ST = new SegmentTree([1, 2, 3, 4]);

//* Original set of range queries
//* [1, 2, 3, 4]
console.log("Range Queries: 1");
console.log(ST.rangeQuery(0, 3)); //* 10
console.log(ST.rangeQuery(0, 0)); //* 1
console.log(ST.rangeQuery(1, 1)); //* 2
console.log(ST.rangeQuery(2, 2)); //* 3
console.log(ST.rangeQuery(3, 3)); //* 4
console.log("");

ST.rangeUpdate(0, 3, 5);
console.log(ST.rangeQuery(0, 3)); //* 30
console.log(ST.rangeQuery(0, 0)); //* 6
console.log(ST.rangeQuery(1, 1)); //* 7
console.log(ST.rangeQuery(2, 2)); //* 8
console.log(ST.rangeQuery(3, 3)); //* 9
console.log(ST.rangeQuery(2, 3)); //* 9
