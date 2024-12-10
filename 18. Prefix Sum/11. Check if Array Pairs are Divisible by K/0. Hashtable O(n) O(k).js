function canArrange(arr, k) {
    const remainderCount = new Array(k).fill(0)


}

console.log(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 7)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 10)); //* False
console.log(canArrange([1, -1, 2, 4, 3], 2)); //* False
console.log(canArrange([1, 2, 3, 4], 2)); //* True

//* Time: O(n!) - Technically it is O((n / 2)!) but we drop constants
//* We are exploring every possible permutation through the use of backtracking

//* Space: O(n) - The used array uses O(n) space, and the recursion depth is at most n / 2
