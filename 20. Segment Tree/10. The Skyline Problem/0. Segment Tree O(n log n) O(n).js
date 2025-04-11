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
      const lazyValue = this.#lazy[node];
      this.#ST[node] = Math.max(this.#ST[node], lazyValue);

      if (node < this.#n) {
        this.#lazy[node << 1] = Math.max(this.#lazy[node << 1], lazyValue);
        this.#lazy[(node << 1) | 1] = Math.max(
          this.#lazy[(node << 1) | 1],
          lazyValue
        );
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

      this.#ST[node] = Math.max(
        this.#ST[node << 1],
        this.#ST[(node << 1) | 1],
        this.#lazy[node << 1],
        this.#lazy[(node << 1) | 1]
      );
    }
  }

  rangeUpdate(left, right, val) {
    left += this.#n;
    right += this.#n;

    let L = left;
    let R = right;

    this.#push(left, right);

    while (L <= R) {
      if (L & 1) this.#lazy[L++] = val;
      if ((R & 1) === 0) this.#lazy[R--] = val;

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

//* The goal is to find all of the "key points" in the skyline
//! A "key point" is essentially a point at which the height DIFFERS from the previous height
//*     - So basically just find the points at which the height is not the same as the previous height (key point)
//* Buildings are given in a triplet form as follows:
//*     - buildings[i] = [left, right, height]
//* If we had buildings [0, 3, 2] and [3, 5, 6], there would be a keypoint at 3 (on the X-axis)
//*     - Why? Because the height differs from what the PREVIOUS height was
//*     - We went from a height of 2 to a height of 6, so visually, the silhouette increases vertically
//! If two adjacent buildings have an equal height, no "key point" is formed
//*     - This skyline array is INCORRECT: [[2, 3], [4, 5], [7, 5], [8, 5], [10, 0]]
//*     - The height does NOT differ between indices [1..3]
//*         - So the CORRECT skyline array should be [[2, 3], [4, 5], [10, 0]]
//*         - We merge the adjacent key points that have an equal height
//* The FINAL keypoint should have a height of 0 (because that is where the shadow ends)
//* Since the buildings span an INTERVAL (along the X-axis)
//* We can use a Segment Tree (and use the left/right as the query bounds)
//*     - Since the range of indices could be large, apply coordinate compression
//! Track what the PREVIOUS height was, and if the NEW height differs, push to the skyline array
//*     - Otherwise, don't push, because otherwise we'll get an incorrect skyline array like before
//* If the height DOES change, since we pushed a new key point to the array
//*     - Make sure you update the "prev height" to whatever the height of the current building is/
//* Then, we check if the NEXT building's height differs from THAT buildings and so on

//! Rationale:
//* What is the meaning behind the sorted list of points?
//*     - We create a sorted list of points (left, right) because these are the only points at which the height can change
//*         - This prevents the need to check every x in [min, max]
//*         - We ONLY need to check at the critical points in the unique sorted list
//* Why do we iterate over the sorted list to find the key points?
//*     - Remember, each point in uniqueSorted is a potential point that the height can differ
//*     - So we query the effective (maximum) height AT EACH POINT and compare that to the PREVIOUS height
//*         - The iteration happens L-to-R, so we query the potential changes in order
//*     - If we have two buildings [2, 4, 5] and [3, 4, 6]
//*         - Then there is a height differential that occurs at "3" (as in, the shadow would increase in height to 6)
//!     - Every point (both left and right) TECHNICALLY becomes a left point depending on how you look at it
//*         - Hence we simply treat ALL of the points as a "left" and check if the height has changed
//* Why do we track the MAXIMUM heights within the Segment Tree?
//*     - Because if two buildings COMPLETELY overlap [2, 4, 5] and [2, 4, 7], the ONLY height that matters is the LARGEST
function getSkyline(buildings) {
  //* Perform coordinate compression - limit the range of indices in the ST
  const ranges = new Set();

  for (const [left, right, _] of buildings) {
    ranges.add(left);
    ranges.add(right);
  }

  const uniqueSorted = [...ranges].sort((a, b) => a - b);
  const compressed = {};
  uniqueSorted.forEach((val, i) => (compressed[val] = i));

  //* Find all of the key points (differing heights between buildings)
  const n = uniqueSorted.length;
  const ST = new SegmentTree(n);
  const keypoints = [];
  let prevHeight = 0;

  //* Add every building to the Segment Tree (so we can later query the max height in a range)
  for (const [left, right, height] of buildings) {
    const L = compressed[left];
    const R = compressed[right] - 1; //* Half-open intervals

    //* Ensure that we aren't updating out of bounds indices
    if (L <= R) {
      ST.rangeUpdate(L, R, height);
    }
  }

  for (let x of uniqueSorted) {
    const i = compressed[x];
    const height = ST.rangeQuery(i, i);

    //* The height changed from the previous building in this range
    if (height !== prevHeight) {
      keypoints.push([x, height]);
      prevHeight = height; //* Now compare the NEXT building with THIS height
    }
  }

  return keypoints;
}

console.log(
  getSkyline([
    [2, 9, 10],
    [3, 7, 15],
    [5, 12, 12],
    [15, 20, 10],
    [19, 24, 8],
  ])
); //* [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]

console.log(
  getSkyline([
    [0, 2, 3],
    [2, 5, 3],
  ])
); //* [[0,3],[5,0]]

//* Time: O(n log n) - It takes O(n log n) to sort the unique points
//* Then, for each point (which scales with n), we perform a range query O(log n)

//* Space: O(n) - The memory usage scales with the number of buildings on average
