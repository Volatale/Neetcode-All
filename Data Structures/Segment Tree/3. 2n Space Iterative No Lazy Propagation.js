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
    //* Move to the leaf nodes
    left += this.n;
    right += this.n;

    //* Clamp within valid bounds
    left = Math.max(left, this.n);
    right = Math.min(right, 2 * this.n - 1);

    //* Invalid query bounds
    if (left > right) return;

    //* Apply the updates to all of the elements in the range
    for (let i = left; i <= right; i++) {
      this.ST[i] += val;
    }

    //* Rwecalculate the parent values
    while (left > 0) {
      left >>= 1; //* Move to the parent of left
      this.ST[left] = this.ST[left << 1] + this.ST[(left << 1) | 1];
    }

    while (right > 0) {
      right >>= 1;
      this.ST[right] = this.ST[right << 1] + this.ST[(right << 1) | 1];
    }
  }
}

const ST = new SegmentTree([1, 2, 3, 4]);

console.log(ST.rangeQuery(0, 3)); //* 10
console.log(ST.rangeQuery(0, 0)); //* 1
console.log(ST.rangeQuery(1, 1)); //* 2
console.log(ST.rangeQuery(2, 2)); //* 3
console.log(ST.rangeQuery(3, 3)); //* 4

ST.rangeUpdate(0, 3, 2);
console.log(ST.rangeQuery(0, 0)); //* 3
console.log(ST.rangeQuery(1, 1)); //* 4
console.log(ST.rangeQuery(2, 2)); //* 5
console.log(ST.rangeQuery(3, 3)); //* 6
