class FenwickTree {
  constructor(nums) {
    this.n = nums.length;
    this.FT = new Array(this.n + 1).fill(0);
    this.#build(nums);
  }

  //* Directly update the FT array with the cumulative effect instead of doing full propagation
  //* FT[i] is made correct by adding nums[i-1]. We know its parent node includes all the elements FT[i] represents
  //* "Hey parent, I've made my sum. Add it to YOUR sum because you cover everything I do and more, so you need my value"
  #build(nums) {
    for (let i = 1; i <= this.n; i++) {
      this.FT[i] += nums[i - 1]; //* nums is 0-indexed, FT is 1-indexed

      const nextNode = i + (i & -i);

      //* Propagate the prefix sum to the next node
      if (nextNode <= this.n) {
        this.FT[nextNode] += this.FT[i];
      }
    }
  }

  #query(i) {
    i += 1;

    let sum = 0;

    while (i > 0) {
      sum += this.FT[i];
      i -= i & -i;
    }

    return sum;
  }

  rangeQuery(left, right) {
    //* prefix[i] - prefix[j-1]
    return this.#query(right) - this.#query(left - 1);
  }

  pointUpdate(i, val) {
    i += 1;

    while (i <= this.n) {
      this.FT[i] += val;
      i = i + (i & -i);
    }
  }
}

const FT = new FenwickTree([1, 2, 3, 4]);
console.log(FT.rangeQuery(0, 3)); //* 10
console.log(FT.rangeQuery(0, 1)); //* 3
console.log(FT.rangeQuery(1, 2)); //* 5
FT.pointUpdate(3, 10);
console.log(FT.rangeQuery(0, 3)); //* 20

//* Time Complexities:
//*     - Build -> O(n)
//*     - Range Query -> O(2 log n) -> O(log n)
//*     - Point Update -> O(log n)
