//* Fenwick Tree
//*     - Used to perform range queries (specifically, range queries whose operations are not associative)
//*     - And perform point updates

//* For an array of length n
//* The Fenwick Tree will have a length of (n + 1)
//!     - Index 0 is dummy node and stores no information
//!     - The rest of the nodes store the prefix sum

//! Observations:
//*     - The nodes with ONE set bit are the direct children of the root
//*         - They are all powers of two (1, 2, 4, 8)
//*     - The nodes with TWO set bits are the children of nodes that are the power of two
//*         - These are nodes like 3, 5, 6, 9, 10
//*     - The nodes with THREE set bits are the children of the above nodes
//*         - For example, 7 and 11 both have THREE set bits
//*     - And so on

//* Mathematically, every number can be represented as the SUM of power of twos
//*     - 10 === 2^3 + 2^1 === 8 + 2
//*     - 11 === 2^3 + 2^1 + 2^0 === 8 + 2 + 1
//*     - 4 === 2^2 === 2^1 + 2^2
//*     - 15 === 2^3 + 2^2 + 2^1 + 2^0
//! Find the next smallest power of two each time and add it to the result

//! So how do we know what nodes represents which ranges?
//* Index 1 is made through (0 + 2^0)
//*     - Starting from index 0, the sum of the next 2^1 (exclusive) elements are stored here
//*     - So index 1 spans the range (0, 0)
//* Index 2 is made through (0 + 2^1)
//*     - Starting from index 0, the sum of the next 2^1 (exclusive) elements are stored here
//*     - So index 2's sum spans the range (0, 1)
//*         - Remember, it STARTS at 0 and goes up to 2 (exclusive)
//* Index 7 is made through (2^2 + 2^1 + 2^0)
//*     - 4 + 2 + 1 = 7
//!     - Since we have more than 2 powers of 2, ADD THE FIRST TWO to get the starting index
//*     - Starting from index 6 (2^2 + 2^1), the sum of the next (2^0) elements will be stored
//*         - So that gives us (6, 6)

//* Why is 0 the parent of 2?
//*     - In binary, 2 is "10"
//*         - Flip the rightmost set bit, and we get
//*     - "10" -> "00"

//* Why is 0 also the parent of 8?
//*     - In binary, 8 is "1000"
//*     - Once again, flip the rightmost set bit
//*         - "1000" -> "0000"

//* What is the parent of 10? It is 8
//*     - Why? In binary, 10 is "1010"
//*     - Flip rightmost set bit
//*         - "1010" -> "1000"

//! To find the PARENT of a node, clear the RIGHTMOST set bit
//*     - Flip the rightmost set bit
//*     - i & (i - 1)
//* OR, use this method
//*     - Get the Twos Complement of the number
//*     - AND it with the original number
//*     - SUBTRACT it from the original number
//* To keep it similar to finding the NEXT node, we can also use:
//*     - i - (i & -i)
//*     - -i gives you the twos complement of a number

//! To find the NEXT node (when building / updating)
//*     - Get the Twos Complement of the number
//*     - AND it with the original number
//*     - ADD it to the original number
//* To keep it similar to finding the PARENT node, we can also use:
//*     - i + (i & -i)
//*     - -i gives you the twos complement of the number

//! To determine how many elements' values are stored within the current segment:
//*     - (i & -i) isolates the rightmost set bit
//*     - 6 in binary is "0110"
//*         - (6 & -6) = 2, which gives us "0010"
//*     - So we know that the node "6" stores 2 values ending at 6
//*         - Which means holds nodes [5, 6]

//* 🧠 Mental Model: "Look at the Rightmost 1 in Binary"
//*     - Let’s say i = 6 → 110₂.
//*     - i & -i isolates the rightmost 1.
//*         - This tells you how many elements FT[i] covers.
//*     - To find the next node to update, just do:
//*         - i + (i & -i) → this moves you "up and right" to the next node that includes more.
//*     - To find the parent, just do:
//*         - i - (i & -i) → moves you "down and left" to the node that covers a smaller prefix.

//! To actually build the tree
//*     - Iterate over every element in the input array
//*     - Each index in the original array maps to (i + 1) in the Fenwick Tree
//*         - i = 0 means the node is at (0 + 1) in the Fenwick Tree
//*         - i = 1 means the node is at (1 + 1) in the Fenwick Tree, etc...
//*     - The value stored at that node becomes whatever is in the original array at that index
//*     - Then, find the NEXT node using the steps starting on line 49
//*         - Apply the same process for all of the "next" nodes

//! To perform range queries
//*     - Look at the left and right of the range query
//*     - We START at right + 1 (since the Fenwick Tree's size is n + 1)
//*     - Then, we sum the value at that node
//*     - Move to the PARENT of the current node
//*     - And repeat the process until we reach the root (index 0)

//! To update nodes
//*     - Look at the index you want to update (i)
//*     - Move to that node in the Fenwick Tree (i + 1)
//*     - Apply the update to the value stored there
//*     - Then, move to the NEXT node and repeat the process
//*         - Eventually, the "next" node will be out of bounds (> n + 1), so stop here
//*     - This updates every node that is represented as part of the updated node

class FenwickTree {
  constructor(nums) {
    //* FT length is n + 1 (index 0 is the root, and does not store a node)
    this.n = nums.length;
    this.FT = new Array(nums.length + 1).fill(0);
    this.#build(nums);
  }

  //* Clearing the rightmost set bit gives the parent (return i & (i - 1))
  //* Alternatively, subtract the AND of the twos complement of "i" from the original i
  #getParentNode(i) {
    return i - (i & -i);
  }

  //* Next node = ADD the bitwise AND of the Twos Complement of "i" and the original "i", to "i" itself
  //* return i + (i & (~i + 1));
  #getNextNode(i) {
    return i + (i & -i);
  }

  //* Add all of the elements to the Fenwick Tree
  #build(nums) {
    for (let i = 0; i < nums.length; i++) {
      this.pointUpdate(i, nums[i]);
    }
  }

  rangeQuery(left, right) {
    //* Move to the corresponding FT node (left is already at the correct index (j-1))
    right += 1;

    let leftSum = 0;
    let rightSum = 0;

    while (right > 0) {
      rightSum += this.FT[right];
      right = this.#getParentNode(right);
    }

    while (left > 0) {
      leftSum += this.FT[left];
      left = this.#getParentNode(left);
    }

    //* pref_i - pref_j-1
    return rightSum - leftSum;
  }

  pointUpdate(i, val) {
    //* Move to the corresponding node in the Fenwick Tree (i + 1)
    i += 1;

    //* Update all of the next node
    while (i <= this.n) {
      this.FT[i] += val; //* Update the value stored here
      i = this.#getNextNode(i); //* Move to the next node
    }
  }
}

const FT = new FenwickTree([1, 2, 3, 4]);
console.log(FT.rangeQuery(0, 3)); //* 10
console.log(FT.rangeQuery(0, 1)); //* 3
console.log(FT.rangeQuery(1, 2)); //* 5
FT.pointUpdate(3, 10);
console.log(FT.rangeQuery(0, 3)); //* 20
