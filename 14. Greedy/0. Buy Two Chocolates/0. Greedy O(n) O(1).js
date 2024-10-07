//* Instead of sorting, we can do a single pass through the array
//* We know we need to know the two minimum elements in the array
//*     - So we can use two independent variables to handle these two values
//* Any value is < infinity, so those are the defaults
//*     - We are guaranteed an array of length 2 or more, so the defaults are never summed
//*     - Thus overflowing is impossible here
//! min1 <= min1
//* If we find a value <= min1
//*     - We don't want to throw the value away
//*         - Set min2 = min1 BEFORE updating min1
//*     - Then, set min1 = price
//* Else, the value may be smaller than whatever min2 currently is
//*     - So take the minimum between min2 and "price"
//* Then we can just sum these two values and subtract the result from money
function buyChoco(prices, money) {
  //* min1 will always be <= min2
  let min1 = Infinity;
  let min2 = Infinity;

  //* Find the two minimum cost chocolates
  for (let price of prices) {
    if (price <= min1) {
      min2 = min1;
      min1 = price;
    } else {
      //* Price isn't <= min1, but it COULD be <= min2
      min2 = Math.min(min2, price);
    }
  }

  const leftOver = money - (min1 + min2);
  return leftOver < 0 ? money : leftOver;
}

console.log(buyChoco([1, 2, 2], 3)); //* 0
console.log(buyChoco([11, 12], 4)); //* 4
console.log(buyChoco([3, 2, 3], 3)); //* 3
console.log(buyChoco([5, 5], 50)); //* 40

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the number of elements in prices

//* Space: O(1) - We only use two variables that do not scale in size with "n"
//* So our space usage is constant
