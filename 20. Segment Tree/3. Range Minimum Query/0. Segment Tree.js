class SegmentTree {
  constructor(nums) {
    this.n = this.#nextPowerOfTwo(nums.length);
    this.ST = new Array(2 * this.n).fill(Infinity);
    this.#build(nums);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #build(nums) {
    for (let i = 0; i < this.n; i++) {
      this.ST[i + this.n] = nums[i];
    }

    for (let i = this.n - 1; i >= 0; i--) {
      this.ST[i] = Math.min(this.ST[i << 1], this.ST[(i << 1) | 1]);
    }
  }

  rangeQuery(left, right) {
    //* Move to the leaf nodes
    left += this.n;
    right += this.n;

    //* Minimum found within the range
    let minimum = Infinity;

    while (left <= right) {
      if (left & 1) {
        minimum = Math.min(minimum, this.ST[left++]);
      }

      if ((right & 1) === 0) {
        minimum = Math.min(minimum, this.ST[right--]);
      }

      //* Move to the parents of each node
      left >>= 1;
      right >>= 1;
    }

    return minimum;
  }

  pointUpdate(i, val) {
    //* Move to the leaf nodes
    i += this.n;

    //* Update the value at this index
    this.ST[i] = val;

    //* Rebuild the tree on this branch
    while (i > 1) {
      i >>= 1;
      this.ST[i] = Math.min(this.ST[i << 1], this.ST[(i << 1) | 1]);
    }
  }
}

const RMQ = new SegmentTree([1, 5, 2, 3, 10]);
console.log(RMQ.rangeQuery(0, 4)); //* 1
console.log(RMQ.rangeQuery(2, 4)); //* 2
console.log(RMQ.rangeQuery(1, 1)); //* 5
console.log(RMQ.pointUpdate(0, 10)); //* Update index 0 to the value 10
console.log(RMQ.rangeQuery(0, 4)); //* 2
console.log(RMQ.pointUpdate(2, 9)); //* Update index 2 to the value 9
console.log(RMQ.rangeQuery(0, 4)); //* 3
