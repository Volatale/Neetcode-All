class FenwickTree {
  constructor(size) {
    this.n = size;
    this.FT = new Array(this.n + 1).fill(0);
  }

  //* Get count of elements < "i"
  rangeQuery(i) {
    i += 1;
    let count = 0;

    while (i > 0) {
      count += this.FT[i];
      i -= i & -i;
    }

    return count;
  }

  pointUpdate(i, val) {
    i += 1;

    while (i <= this.n) {
      this.FT[i] += val;
      i += i & -i;
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
  //* Avoids the need to perform coordinate compression
  const n = Math.max(...instructions);
  const FT = new FenwickTree(n + 1);
  let totalCost = 0;

  //* Add each element to "nums" (in our case, the Fenwick Tree)
  for (let i = 0; i < instructions.length; i++) {
    const num = instructions[i];
    const smallerThan = FT.rangeQuery(num - 1);
    const greaterThanOrEqual = i - FT.rangeQuery(num); //* inserted - smaller than or equal
    totalCost += Math.min(smallerThan, greaterThanOrEqual);
    FT.pointUpdate(num, 1); //* Increment count of "num"
  }

  return totalCost % (1e9 + 7);
}

console.log(createSortedArray([1, 5, 6, 2])); //* 1
console.log(createSortedArray([1, 2, 3, 6, 5, 4])); //* 3
console.log(createSortedArray([1, 3, 3, 3, 2, 4, 2, 1, 2])); //* 4

//* Time: O(n log n) - Building the BIT taes O(n)
//* Then, for every element in instructions (n), we perform two queries and a point update O(3 * log(n))

//* Space: O(n) - The memory usage scales with maximum element in instruction
