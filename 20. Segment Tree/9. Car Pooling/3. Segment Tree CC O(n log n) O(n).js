class SegmentTree {
  #n;
  #ST;
  #lazy;

  constructor(size) {
    this.#n = this.#nextPowerOfTwo(size);
    this.#ST = new Array(2 * this.#n).fill(0);
    this.#lazy = new Array(2 * this.#n).fill(0);
  }

  #nextPowerOfTwo(n) {
    return 1 << Math.ceil(Math.log2(n));
  }

  #applyLazy(node) {
    if (this.#lazy[node] !== 0) {
      this.#ST[node] += this.#lazy[node];

      if (node < this.#n) {
        this.#lazy[node << 1] += this.#lazy[node];
        this.#lazy[(node << 1) | 1] += this.#lazy[node];
      }

      this.#lazy[node] = 0;
    }
  }

  #push(left, right) {
    for (let i = Math.floor(Math.log2(this.#n)); i >= 0; i--) {
      const leftAncestor = left >> i;
      const rightAncestor = right >> i;
      this.#applyLazy(leftAncestor);
      this.#applyLazy(rightAncestor);
    }
  }

  #rebuild(node) {
    while (node > 1) {
      node >>= 1;

      //* Consider the lazy values for each node as well
      this.#ST[node] = Math.max(
        this.#ST[node << 1] + this.#lazy[node << 1],
        this.#lazy[(node << 1) | 1] + this.#ST[(node << 1) | 1]
      );
    }
  }

  rangeUpdate(left, right, val) {
    left += this.#n;
    right += this.#n;

    this.#push(left, right);

    let L = left;
    let R = right;

    //* (Lazily) add the passengers to the relevant nodes
    while (L <= R) {
      if (L & 1) this.#lazy[L++] += val;
      if ((R & 1) === 0) this.#lazy[R--] += val;

      L >>= 1;
      R >>= 1;
    }

    this.#rebuild(left);
    this.#rebuild(right);
  }

  rangeQuery(left, right) {
    left += this.#n;
    right += this.#n;

    this.#push(left, right);

    //* Maximum number of overlapping passengers over the entire array
    let max = 0;

    while (left <= right) {
      if (left & 1) {
        this.#applyLazy(left);
        max = Math.max(max, this.#ST[left++]);
      }

      if ((right & 1) === 0) {
        this.#applyLazy(right);
        max = Math.max(max, this.#ST[right--]);
      }

      left >>= 1;
      right >>= 1;
    }

    return max;
  }
}

//* We are essentially given intervals, but with an added twist
//*     - trips[i] = [passengers, from, to]
//! The intervals themselves are represented by [from, to]
//* The main difference is that we have a maximum capacity
//*     - If the capacity is ever breached, we can't make all of the trips
//! So one way to solve the problem is by using a Segment Tree
//*     - The segments store the maximum no. of passengers within the current range
//* We have no choice but to add passengers to the car
//* For every trip:
//*     - Get the query bounds (L, R)
//*     - Update the range (L, R) with "passengers" passengers
//* After adding every passenger, we simply perform a range query on the ENTIRE range (0, n - 1)
//* Remember, the segments tell us the max no. of passengers in the current range
//* So if we query the ENTIRE range, we get the maximum number of passengers among the entire range
//* If the result of that query > capacity, then we know we can't make the trip
function carPooling(trips, capacity) {
  //* We essentially have intervals in the form of [_, from, to]
  const ranges = new Set();

  //* Start and End of the interval
  for (const [_, from, to] of trips) {
    ranges.add(from);
    ranges.add(to);
  }

  //* Sort the unique ranges and then perform coordinate compressin
  const uniqueSorted = [...ranges].sort((a, b) => a - b);
  const compressed = {};

  uniqueSorted.forEach((val, i) => (compressed[val] = i));

  //* Segment Tree stores max passengers within the range [L, R)
  const n = uniqueSorted.length;
  const ST = new SegmentTree(n);

  //* Perform each trip
  for (const [passengers, start, end] of trips) {
    const L = compressed[start];
    const R = compressed[end] - 1; //* Half-open intervals, so subtract 1
    ST.rangeUpdate(L, R, passengers); //* Add these passengers to the current interval range
  }

  //* If the maximum number of passengers is ever > capacity, return false
  return ST.rangeQuery(0, n - 1) <= capacity;
}

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    4
  )
); //* False

console.log(
  carPooling(
    [
      [2, 1, 5],
      [3, 3, 7],
    ],
    5
  )
); //* True

//* Time: O(n log n) - The coordinate compression takes O(n log n) due to the sorting step
//* Then, for every trip (n), we perform a range query (O(log n))

//* Space: O(1) - The Segment Tree always has the same size, regardless of input size
