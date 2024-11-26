//* 2n Space Iterative
//* Left Child = 2 * i
//* Right Child = 2 * i + 1
class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.ST = new Array(2 * this.n).fill(0);
    this.lazy = new Array(2 * this.n).fill(0);
    this.build(nums);
  }

  //* Build Segment Tree Iteratively
  build(nums) {
    //* Populate Leaf Nodes
    for (let i = 0; i < this.n; i++) {
      this.ST[this.n + i] = nums[i];
    }

    //* Build internal nodes by merging child values
    for (let i = this.n - 1; i > 0; i--) {
      this.ST[i] = this.ST[2 * i] + this.ST[2 * i + 1];
    }
  }

  applyLazy(node, left, right) {
    if (this.lazy[node] !== 0) {
      //* Apply lazy value to node
      this.ST[node] = (right - left + 1) * this.lazy[node];

      //* Only propagate updates to children if this is NOT a leaf
      if (node < this.n) {
        this.lazy[2 * node] += this.lazy[node];
        this.lazy[2 * node + 1] += this.lazy[node];
      }

      //* This node  no longer has an update pending
      this.lazy[node] = 0;
    }
  }

  //* Push lazy values down the tree
  pushDown(left, right) {
    const height = Math.ceil(Math.log2(this.n));

    //* Find ancestors (left and right) at each height (bottom up)
    for (let h = height; h > 0; h--) {
      const L = left >> h; //* Think parent = Math.floor((i - 1) / 2)
      const R = right >> h;

      //* Propagate all lazy values for all nodes (i) in this range ([L, R])
      for (let i = L; i <= R; i++) {
        //* i - this.n converts "i" from tree node index to logical range index
        //* Remember, leaf nodes are stored at "n" through 2n-1
        const leftRange = (i - this.n) * 2; //* Marks start of range
        const rightRange = leftRange + 1; //* Marks end of range
        this.applyLazy(i, leftRange, rightRange);
      }
    }
  }

  //* Update range [left, right] by applying "val" to each element
  rangeUpdate(left, right, val) {
    //* Convert to tree indices
    left += this.n;
    right += this.n;

    //* Keep copies of the original indices for parent updates
    const pLeft = left;
    const pRight = right;

    //* Traverse and update relevant node
    while (left <= right) {
      //* If left is a right child
      if (left & 1) {
        this.lazy[left] += val;
        left++;
      }

      //* If right is a left child
      if ((right & 1) === 0) {
        this.lazy[right] += val;
        right--;
      }

      //* Move up the tree (to the parent of these nodes)
      left >>= 1;
      right >>= 1;
    }

    //* Update parent nodes to reflect changes
    this.updateParents(pLeft);
    this.updateParents(pRight);
  }

  //* Query sum in the range [left, right]
  rangeQuery(left, right) {
    //* Convert to tree indices
    left += this.n;
    right += this.n;

    //* Apply pending lazy updates
    this.pushDown(left, right);

    let sum = 0;

    //* Traverse and sum relevant nodes
    while (left <= right) {
      if (left & 1) sum += this.ST[left++]; //* Include left if its a right child
      if ((right & 1) === 0) sum += this.ST[right--]; //* Include right if its a left child

      //* Move up the tree
      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  updateParents(node) {
    //* Traverse up the tree
    while (node > 1) {
      //* Move to parent
      node >>= 1;

      //* Update the parent value considering both children and any pending updates
      this.ST[node] =
        this.ST[2 * node] + this.ST[2 * node + 1] + this.lazy[node];
    }
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
