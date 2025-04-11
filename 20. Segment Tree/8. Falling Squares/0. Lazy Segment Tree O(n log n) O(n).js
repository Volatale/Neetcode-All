class MySegmentTree {
  constructor(size) {
    this.n = this.#nextPowerOfTwo(size);
    this.ST = new Array(2 * this.n).fill(0);
    this.lazy = new Array(2 * this.n).fill(0);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #applyLazy(node) {
    if (this.lazy[node] !== 0) {
      this.ST[node] = Math.max(this.ST[node], this.lazy[node]);

      if (node < this.n) {
        this.lazy[node << 1] = Math.max(this.lazy[node << 1], this.lazy[node]);
        this.lazy[(node << 1) | 1] = Math.max(
          this.lazy[(node << 1) | 1],
          this.lazy[node]
        );
      }

      this.lazy[node] = 0;
    }
  }

  #rebuild(node) {
    while (node > 1) {
      node >>= 1;

      this.ST[node] = Math.max(
        this.ST[node << 1],
        this.ST[(node << 1) | 1],
        this.lazy[node << 1],
        this.lazy[(node << 1) | 1]
      );
    }
  }

  #push(left, right) {
    for (let i = Math.floor(Math.log2(this.n)); i >= 0; i--) {
      const leftAncestor = left >> i;
      const rightAncestor = right >> i;
      this.#applyLazy(leftAncestor);
      this.#applyLazy(rightAncestor);
    }
  }

  rangeUpdate(left, right, val) {
    left += this.n;
    right += this.n;

    this.#push(left, right);

    let L = left;
    let R = right;

    while (L <= R) {
      if (L & 1) {
        this.lazy[L++] = val;
      }

      if ((R & 1) === 0) {
        this.lazy[R--] = val;
      }

      L >>= 1;
      R >>= 1;
    }

    this.#rebuild(left);
    this.#rebuild(right);
  }

  rangeQuery(left, right) {
    left += this.n;
    right += this.n;

    this.#push(left, right);

    let max = 0;

    while (left <= right) {
      if (left & 1) {
        this.#applyLazy(left);
        max = Math.max(max, this.ST[left++]);
      }

      if ((right & 1) === 0) {
        this.#applyLazy(right);
        max = Math.max(max, this.ST[right--]);
      }

      left >>= 1;
      right >>= 1;
    }

    return max;
  }
}

//* The squares are represented using pairs [left, sideLength]
//*     - "left" is the START of the square (on the X-axis)
//*     - The END of the square can be computed using (left + sideLength)
//* So now our squares look more like this:
//*     - [start, end]
//* In other words, this problem is essentially an INTERVAL problem
//* The goal is to drop blocks from above and have them land somewhere
//* Then, we query the maximum height of ALL the blocks
//* The blocks are dropped one by one, so the FIRST block will always land on the X-axis itself
//* Each subsequent block therefore has a chance to land either on the X-axis, OR, another block
//! Since we know the squares basically represent intervals, we can just query the maximum height within that interval range
//* But the RANGE of all the intervals can be extremely varied and sparse...
//! Employ coordinate compression to limit the range of indices
//*     - A square's coordinates are given by:
//*         - left (START)
//*         - left + sideLength (END)
//*     - These form the bounds for our queries, then we just sort these and compress the coordinates
//* We use RANGE QUERIES to query the MAXIMUM HEIGHT WITHIN THIS INTERVAL RANGE
//* Then, from there, we know the CURRENT square will be placed ON TOP of that maximum
//*     - So the "new" height is (highest + sideLength)
//* After finding the new height, we perform a RANGE UPDATE and update the entire interval range
//*     - Why? Because anything that overlaps with this range will also be affected by the new height
//*     - The new square will be placed on top of this one if any succeeding square overlaps
//* Finally, we can just track the OVERALL maximum height among all intervals
function fallingSquares(positions) {
  //* Store square (interval) coordinates: each square starts and ends at [left, left + sideLength]
  const ranges = new Set();
  for (const [left, side] of positions) {
    ranges.add(left);
    ranges.add(left + side);
  }

  //* Sort the unique coordinates and then perform coordinate compression
  const uniqueSorted = [...ranges].sort((a, b) => a - b);

  //* Coordinate compression
  const compressed = {};
  uniqueSorted.forEach((val, i) => (compressed[val] = i));

  //* Segment tree indices range from [0, n - 1]
  const n = uniqueSorted.length;
  const ST = new MySegmentTree(n);
  const result = [];
  let maxHeight = 0; //* Overall max height so far

  //* Drop the squares and answer the queries
  for (const [left, side] of positions) {
    //* Find the highest point that the current interval intersects with (BEFORE dropping the square)
    const L = compressed[left];
    const R = compressed[left + side] - 1; //! Half-open interval. ST is INCLUSIVE, so subtract 1
    const highest = ST.rangeQuery(L, R);

    //* Update the new height by dropping the NEW square (highest point + side = new height)
    const newHeight = highest + side;
    ST.rangeUpdate(L, R, newHeight); //* The entire range (L, R) is updated with this new max height (square dropped on top)
    maxHeight = Math.max(maxHeight, newHeight);
    result.push(maxHeight);
  }

  return result;
}

console.log(
  fallingSquares([
    [1, 2],
    [2, 3],
    [6, 1],
  ])
); //* [2, 5, 5]

console.log(
  fallingSquares([
    [100, 100],
    [200, 100],
  ])
); //* [100, 100]

console.log(
  fallingSquares([
    [9, 7],
    [1, 9],
    [3, 1],
  ])
); //* [7, 16, 17]

//* Time: O(n log n) - It takes O(n log n) to sort on average (assuming merge sort / quick sort are used)
//* For every square, we perform a range query and a range update (both of which take O(log n))

//* Space: O(n) - Where "n" is the number of unique interval coordinates
