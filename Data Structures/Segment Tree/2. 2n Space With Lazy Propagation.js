//* Uses 2n space instead of 4n
class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.size = this.#nextPowerOfTwo(this.n);
    this.ST = new Array(2 * this.size).fill(0);
    this.lazy = new Array(2 * this.size).fill(0);
    this.#build(0, 0, this.n - 1, nums);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #build(node, left, right, nums) {
    if (left === right) {
      this.ST[node] = nums[left];
      return;
    }

    const mid = left + ((right - left) >> 1);

    this.#build(2 * node + 1, left, mid, nums);
    this.#build(2 * node + 2, mid + 1, right, nums);

    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  #applyLazy(node, left, right) {
    if (this.lazy[node] !== 0) {
      this.ST[node] += (right - left + 1) * this.lazy[node];

      if (left !== right) {
        this.lazy[2 * node + 1] += this.lazy[node];
        this.lazy[2 * node + 2] += this.lazy[node];
      }
    }

    this.lazy[node] = 0;
  }

  #query(node, tl, tr, left, right) {
    this.#applyLazy(node, tl, tr);

    if (left > tr || right < tl || tl > tr) return 0;

    if (left <= tl && tr <= right) {
      return this.ST[node];
    }

    const mid = tl + ((tr - tl) >> 1);

    return (
      this.#query(2 * node + 1, tl, mid, left, right) +
      this.#query(2 * node + 2, mid + 1, tr, left, right)
    );
  }

  rangeQuery(left, right) {
    return this.#query(0, 0, this.n - 1, left, right);
  }

  #update(node, tl, tr, left, right, val) {
    this.#applyLazy(node, tl, tr);

    if (left > tr || right < tl || tl > tr) return 0;

    if (left <= tl && tr <= right) {
      this.ST[node] += (tr - tl + 1) * val;

      if (tl !== tr) {
        this.lazy[2 * node + 1] += val;
        this.lazy[2 * node + 2] += val;
      }

      return;
    }

    const mid = tl + ((tr - tl) >> 1);

    this.#update(2 * node + 1, tl, mid, left, right, val);
    this.#update(2 * node + 2, mid + 1, tr, left, right, val);

    this.ST[node] = this.ST[2 * node + 1] + this.ST[2 * node + 2];
  }

  rangeUpdate(left, right, val) {
    return this.#update(0, 0, this.n - 1, left, right, val);
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
