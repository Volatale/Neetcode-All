class SegmentTree {
  //* Iterative 2n Segment Trees don't need padding
  constructor(nums) {
    this.n = nums.length;
    this.ST = new Array(2 * this.n).fill(0);
    this.lazy = new Array(2 * this.n).fill(0);
    this.#build(nums);
  }

  //* Root is at index 1, Left child = 2 * i, Right child =  2 * i + 1
  #build(nums) {
    //* The leaf nodes are stored in the latter half
    for (let i = 0; i < this.n; i++) {
      this.ST[i + this.n] = nums[i];
    }

    //* The interal nodes are stored in the prior half (work backwards from n - 1 to index 0)
    //* i << 1 === 2 * i
    //* (i << 1) | 1 === 2 * i + 1
    for (let i = this.n - 1; i > 0; i--) {
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }

  rangeQuery(left, right) {
    //* Clamp the query range to valid bounds
    left = Math.max(left, 0) + this.n; //* If left < 0, left = 0
    right = Math.min(right, this.n - 1) + this.n; //* If right > n - 1, right = n - 1

    //* The range is still invalid even after clamping
    if (left > right) return 0;

    let sum = 0;

    while (left <= right) {
      //* If the index is ODD, it is the right child, and the parent doesn't include this node
      //* It is our last chance to process this node. Otherwise, we might aswell just wait and process the parent
      if (left & 1) {
        sum += this.ST[left];
        left++; //* Make left even (13 >> 1 = 6, but we need it to be 7. 14 >> 1 = 7)
      }

      //* If the index is EVEN, it is the left child, and the parent doesn't include this node
      //* It is our last chance to process this node
      if ((right & 1) === 0) {
        sum += this.ST[right];
        right--; //* Make right odd
      }

      //* Move to parents of nodes
      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  pointUpdate(i, val) {
    //* Base Case: Out of Bounds index
    if (i < 0 || i >= this.n) return;

    //* Move to the leaf node side of the array
    i += this.n;

    //* Update the value at this index
    this.ST[i] += val;

    //* Index 1 is the root, so keep traveling up the tree until index 1
    while (i > 1) {
      //* Move to the parent node -> Math.floor((i - 1) / 2)
      i >>= 1;

      //* Update value for the parent node
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }

  //* Does NOT use Lazy Propagation
  rangeUpdate(left, right, val) {
    left = Math.max(left, 0) + this.n;
    right = Math.min(right, this.n - 1);

    if (left > right) return;

    while (left <= right) {
      if (left & 1) {
        this.ST[left] += val;
        left++;
      }

      if ((right & 1) === 0) {
        this.ST[right] += val;
        right--;
      }
    }

    //* Move to parent nodes
    left >>= 1;
    right >>= 1;
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
