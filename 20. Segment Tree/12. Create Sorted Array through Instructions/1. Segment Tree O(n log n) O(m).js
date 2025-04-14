class SegmentTree {
  constructor(size) {
    this.n = size;
    this.ST = new Array(2 * this.n).fill(0);
  }

  rangeQuery(left, right) {
    //* Move to the leaf nodes
    left += this.n;
    right += this.n;

    //* Count of elements (either smaller than or greater than instructions[i])
    let count = 0;

    while (left <= right) {
      if (left & 1) count += this.ST[left++];
      if ((right & 1) === 0) count += this.ST[right--];

      //* Move to the parents
      left >>= 1;
      right >>= 1;
    }

    return count;
  }

  pointUpdate(i, val) {
    //* Move to the leaf nodes
    i += this.n;

    //* Increment the frequency of this number by 1
    this.ST[i] += val;

    while (i > 1) {
      i >>= 1; //* Move to the parent node
      this.ST[i] = this.ST[i << 1] + this.ST[(i << 1) | 1];
    }
  }
}

//* The goal is to create a sorted array "nums" using elements from instructions
//* But we have to track the total "cost" to insert every element from instructions into nums
//* The cost is the MINIMUM between:
//*     - The no. of elements < instructions[i]
//*     - The no. of elements > instructions[i]
//* So, we essentially have to perform two QUERIES before doing anything
//* Then, we get the cost of the insertion by taking the minimum of those two queries
//* Finally, we can insert instructions[i] into the nums array
//* So, we can simulate this entire process using a Segment Tree
//*     - Use coordinate compression to reduce the range of possible indices
//*         - Then, each of the unique instructions maps to a unique index in the ST
//*     - Get the compressed index of instructions[i]
//*     - Then, we can get the no. of elements less than and greater than instructions[i]:
//*         - rangeQuery(0, compressedIndex - 1)
//*         - rangeQuery(compressedIndex + 1, n - 1)
//*     - Take the minimum of those two values
//*     - Then perform a point update to simulate adding instructions[i] to the "nums" array
function createSortedArray(instructions) {
  //* Perform coordinate compression
  const ranges = new Set();

  for (let num of instructions) {
    ranges.add(num);
  }

  //* Retain relative ordering
  const uniqueSorted = [...ranges].sort((a, b) => a - b);
  const compressed = {};
  uniqueSorted.forEach((val, i) => (compressed[val] = i));

  //* ST holds the frequency of each unique element
  const n = uniqueSorted.length;
  const ST = new SegmentTree(n);
  let totalCost = 0;

  //* Get the cost of every element
  for (let i = 0; i < instructions.length; i++) {
    //* The index where instructions[i] should be placed
    const compressedIndex = compressed[instructions[i]];

    //* Get no. of elements smaller than and greater than instructions[i]
    const smallerThan = ST.rangeQuery(0, compressedIndex - 1);
    const greaterThan = ST.rangeQuery(compressedIndex + 1, n - 1);

    //* Get the cost, and increment the frequency of instructions[i]
    totalCost += Math.min(smallerThan, greaterThan);
    ST.pointUpdate(compressedIndex, 1);
  }

  return totalCost % (10 ** 9 + 7);
}

console.log(createSortedArray([1, 5, 6, 2])); //* 1
console.log(createSortedArray([1, 2, 3, 6, 5, 4])); //* 3
console.log(createSortedArray([1, 3, 3, 3, 2, 4, 2, 1, 2])); //* 4

//* Time: O(n log n) - It takes O(n log n) to sort the unique sorted elements
//* Then, for each element in instructions (n), we perform two range queries and a point update (3 * log(n))

//* Space: O(m) - Where "m" is the size of the ranges set
