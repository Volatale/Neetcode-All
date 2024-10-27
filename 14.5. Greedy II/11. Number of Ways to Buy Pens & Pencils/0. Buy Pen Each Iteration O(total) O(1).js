//* To get the number of pencils we can buy
//*     - We do Math.flor(total / cost2) + 1
//*         - If total is 30, and pencils are 5 each, (30 / 5 = 6)
//*     - 0 counts as a valid way, hence we add one to the result of the calculation(s)
//* We buy ONE EXTRA pen every iteration
//*     - Hence we subtract cost1 from total
//* If we buy 0 pens, we can buy 0, 1, 2, 3, or 4 pencils (20, 10, 5, as inputs)
//* If we buy 1 pens, we can buy 0, 1, or 2 pencils
//* 2 pens means we can buy 0 pencils
function waysToBuyPensPencils(total, cost1, cost2) {
  let ways = 0;

  //* If we buy 0 pens, we can buy 0, 1, 2, 3, or 4 pencils (5 ways) (20, 10, 5, as inputs)
  //* If we buy 1 pens, we can buy 0, 1, or 2 pencils (3 ways)
  //* 2 pens means we can buy 0 pencils (1 way)
  while (total >= 0) {
    ways += Math.floor(total / cost2) + 1; //* 0 counts as a valid way, so add 1
    total -= cost1; //* Buy extra pen
  }

  return ways;
}

console.log(waysToBuyPensPencils(20, 10, 5)); //* 9
console.log(waysToBuyPensPencils(5, 10, 10)); //* 1
console.log(waysToBuyPensPencils(20, 5, 10)); //* 9
console.log(waysToBuyPensPencils(30, 5, 5)); //* 28

//* Time: O(total) - The number of iterations is proportional to how many pens can be bought
//* There are (total / cost1) iterations, which is a constant factor

//* Space: O(1) - We are only using constant space variables
