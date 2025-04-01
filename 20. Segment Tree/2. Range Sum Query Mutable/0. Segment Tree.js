//* While we CAN use a prefix sum array to optimize for queries, updating now takes O(n)
//* Instead of making the choice, we can have the best of both worlds
//! Utilize a Segment Tree, a data structure used for efficient range queries and updates
//* A segment tree is a data structure based on trees, where nodes represent a RANGE of values
//* For example, the root node could represent the sum of the entire array
//* We also have a set of leaf nodes that are used to form the rest of the tree (in a bottom-up fashion)
//* Our Segment Tree will have the following time complexities:
//*     - Building the Segment Tree will take O(n)
//*     - Queries will take O(log n)
//*     - Updates will take O(log n)
class SegmentTree {
  constructor(nums) {
    //* Ensures we have a perfect binary tree
    this.n = this.#nextPowerOfTwo(nums.length);
    this.ST = new Array(2 * this.n).fill(0);
    this.#build(nums);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #build(nums) {
    //* The leaf nodes are stored in indices [n, 2n - 1]
    for (let i = 0; i < this.n; i++) {
      this.ST[i + this.n] = nums[i];
    }

    //* The internal nodes are stored in indices [1, n - 1]
    for (let i = this.n - 1; i > 0; i--) {
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }

  rangeQuery(left, right) {
    //* Move to the leaf nodes
    left += this.n;
    right += this.n;

    let sum = 0;

    while (left <= right) {
      //* "left" points to a RIGHT child (parent does not fully include query range)
      if (left & 1) {
        sum += this.ST[left++];
      }

      //* "right" points to a LEFT child (parent does not fully include query range)
      if ((right & 1) === 0) {
        sum += this.ST[right--];
      }

      //* Move to the parents of each node
      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  pointUpdate(index, val) {
    //* Move to the leaf nodes
    index += this.n;

    //* nums[i] becomes "val"
    this.ST[index] = val;

    //* Rebuild the tree on the way back up
    while (index > 1) {
      index >>= 1; //* Move to the parent of node "index"
      this.ST[index] = this.ST[index << 1] + this.ST[(index << 1) | 1];
    }
  }
}

class NumArray {
  constructor(nums) {
    this.ST = new SegmentTree(nums);
  }

  sumRange(left, right) {
    return this.ST.rangeQuery(left, right);
  }

  update(index, val) {
    this.ST.pointUpdate(index, val);
  }
}

const numArray = new NumArray([1, 3, 5]);
console.log(numArray.sumRange(0, 2)); //* 9
console.log(numArray.update(1, 2));
console.log(numArray.sumRange(0, 2)); //* 8
console.log(numArray.sumRange(0, 0)); //* 1
console.log(numArray.sumRange(1, 1)); //* 2

//* Time: sumRange (query) - O(log n) since we half the search space each iteration
//*       update - O(log n), since the above applies here too

//* Space: O(n) - The memory usage scales with the size of the input array (nums)
