//* It is NOT a ratio distribution problem
//*     - Each child will get one candy at minimum
//!     - We only need to determine how many MORE candies to give out
//* We cannot solve this problem in a single pass
//*     - It is impossible to know how many candies to give until we have SOME values
//* Each child's candies are relative to what their NEIGHBOR'S have already gotten
//*     - There are TWO neighbors for each child (except index 0 and index n - 1)
//* Take this example [4, 5, 6]
//*     - We can't know how many to give child 0 yet because we don't know child 1's candy count
//* So instead of handling both sides at the same time
//*     - Ensure each child has more than the LEFT child if their rating is higher
//*     - THEN, ensure each child has more than the RIGHT if their rating is higher
//* Essentially, we need to do two passes
//*     - The only thing we can do until we have all of the info is ignore the right neighbor(s)
function candy(ratings) {
  if (ratings.length === 0) return 0;

  let n = ratings.length;
  let candies = 0;

  //* Each child will get 1 candy minimum
  const child = new Array(ratings.length).fill(1);

  //* Children whose rating > left neighbor should get 1 more candy than previous child
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      child[i] = child[i - 1] + 1;
    }
  }

  //* Now check for the right neighbor (compare child[i] with child[i+1])
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && child[i] <= child[i + 1]) {
      child[i] = child[i + 1] + 1;
    }

    candies += child[i]; //* Count these candies
  }

  //* We started at n - 2, so we didn't add the last child's candies
  return candies + child[n - 1];
}

console.log(candy([1, 0, 2])); //* 5
console.log(candy([1, 1, 1, 1])); //* 4
console.log(candy([1, 2, 2])); //* 4
console.log(candy([7, 4, 5, 4, 3, 2, 1, 3, 2])); //* 21
console.log(candy([1, 3, 5, 5])); //* 7

//* Time: O(n) - It takes O(n) to create the array, and iterate back and forth
//* So the time taken scales linearly with the input size

//* Space: O(n) - We create an array of n length
