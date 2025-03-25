class SegmentTree {
  //* Iterative Segment trees don't need padding
  constructor(nums) {
    this.n = nums.length;
    this.ST = new Array(2 * this.n).fill(0);
    this.#build(nums);
  }

  //* Root is at index 1, left child = 2 * i, right child = 2 * i + 1
  #build(nums) {
    //* The leaf nodes are stored in the range [n, 2n - 1] (0-indexed)
    for (let i = 0; i < this.n; i++) {
      this.ST[i + this.n] = nums[i];
    }

    //* The internal nodes are stored in nodes [1, n - 1] (0-indexed)
    for (let i = this.n - 1; i > 0; i--) {
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }

  rangeQuery(left, right) {
    //* Convert to segment tree leaf indices
    left += this.n;
    right += this.n;

    //* Clamp within valid bounds
    left = Math.max(left, this.n);
    right = Math.min(right, 2 * this.n - 1);

    //* Invalid query bounds, so throw an error
    if (left > right) return 0;

    let sum = 0;

    //* If there were only a single element in nums, left and right would be equal
    while (left <= right) {
      //* "Left" points to a RIGHT child
      //* Parent of ST[left] includes nodes BEFORE our query range, which we can't have
      //* In other words, the parent node does not FULLY cover our needed range, process "left" separately
      if (left & 1) {
        sum += this.ST[left];
        left++; //* We can't include the parent node, so move up the tree
      }

      //* "Right" points to a LEFT child
      //* Parent of ST[right] includes nodes AFTER our query range, which we can't have
      //* Parent node does not FULLY cover our needed range, process "right" immediately
      if ((right & 1) === 0) {
        sum += this.ST[right];
        right--; //* Can't include parent node, move up tree
      }

      //* Travel to the parents of each node
      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  pointUpdate(i, val) {
    if (i < 0 || i >= this.n) throw new RangeError("Out of bounds index.");

    //* Move to the leaf nodes
    i += this.n;

    //* Update the value at index "i"
    this.ST[i] += val;

    //* Update all of the (parent) nodes along the path till index 1 (our root)
    while (i > 1) {
      //* Move to the parent node
      i >>= 1;

      //* Update the value for the parent node
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }

  rangeUpdate(left, right, val) {
    //* Convert to segment tree leaf indices
    left += this.n;
    right += this.n;

    //* Clamp within valid bounds
    left = Math.max(left, this.n);
    right = Math.min(right, 2 * this.n - 1);

    //* Invalid query bounds, so throw an error
    if (left > right) return 0;

    while (left <= right) {
      //* Left points to a right child, parent does not fully cover query range
      if (left & 1) {
        this.ST[left] += val;
        left++; //* Parent
      }

      //* Right points to a left child, parent does not fully cover query range
      if ((right & 1) === 0) {
        this.ST[right] += val;
        right--;
      }

      //* Travel to the parents of each node
      left >>= 1;
      right >>= 1;
    }
  }
}

const ST = new SegmentTree([2, 3, 1, 7, 9, 11, 3]);

//* Range Queries
console.log("--- Range Queries ---");
console.log(ST.rangeQuery(0, 3)); //* 13
console.log(ST.rangeQuery(4, 6)); //* 23
console.log(ST.rangeQuery(1, 5)); //* 31
console.log(ST.rangeQuery(0, 6)); //* 36
console.log(ST.rangeQuery(2, 2)); //* 1

//* Point Updates
console.log("--- Point Update ---");
ST.pointUpdate(2, 5);
console.log("--- Range Queries ---");
console.log(ST.rangeQuery(0, 3)); //* 18
console.log(ST.rangeQuery(2, 2)); //* 6

console.log("--- Point Update ---");
ST.pointUpdate(4, -3); //* Subtract 3 from index 4 (nums[4] becomes 6)
console.log("--- Range Queries ---");
console.log(ST.rangeQuery(4, 6)); //* 20
console.log(ST.rangeQuery(3, 5)); //*  24

//! Edge Cases
console.log("--- Edge Cases ---");
console.log(ST.rangeQuery(0, 0)); //* 2
console.log(ST.rangeQuery(ST.n - 1, ST.n - 1)); //* 3
console.log(ST.rangeQuery(0, ST.n - 1)); //* 38
console.log(ST.rangeQuery(-1, 2)); //* 11
console.log(ST.rangeQuery(7, 10)); //* 0
