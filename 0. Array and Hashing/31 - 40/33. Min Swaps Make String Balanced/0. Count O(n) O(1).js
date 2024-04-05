//* The "count" variable is used to track the number of unbalanced parentheses
//* If we encounter a "[", we add 1 to the count (we have 1 extra parentheses to balance)
//* Else if we encounter a "]", if count > 1 (which means we still have parentheses to balance)
//*     - We found a "]", which means we can balance that parentheses
//*     - So subtract one from the count
//* Since we know half of the elements are "[" and the other half are "]"
//* We know that we will have to do count / 2 swaps where "n" is the length of the string
//* But if the count is odd, 3 // 2 = 1, but we know we need 2 swaps
//* So Math.floor((count + 1) / 2) to account for odd stack lengths
function minSwapsToMakeBalanced(s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "[") {
      count++; //* Found parentheses that needs balancing
    } else if (count > 0) {
      count--; //* Balanced a parentheses
    }
  }

  return Math.floor((count + 1) / 2);
}

console.log(minSwapsToMakeBalanced("")); //* 0
console.log(minSwapsToMakeBalanced("][][")); //* 1
console.log(minSwapsToMakeBalanced("][")); //* 1
console.log(minSwapsToMakeBalanced("[]")); //* 0
console.log(minSwapsToMakeBalanced("]]][[[")); //* 2
console.log(minSwapsToMakeBalanced("]]]][[[[")); //* 2
console.log(minSwapsToMakeBalanced("]]]]][[[[[")); //* 3

//* Time: O(n) - It takes O(n) time to iterate through the whole string

//* Space: O(1) - We are only using constant space; no auxillary data structures are used
