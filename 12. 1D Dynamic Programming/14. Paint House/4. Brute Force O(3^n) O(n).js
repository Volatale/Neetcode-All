//* We can't choose the same color twice in a row
//*     - So track the PREVIOUS choice that was made
//* Ultimately, we want to try every possible combination
//* Take the minimum out of all three paths

//* i = index, c = color
/**
 *! Recurrence Relation: F(i, c) =
 *!
 *!      min(
 *!           F(i + 1, 0) + houses[i][0]
 *!           F(i + 1, 1) + houses[i][1]
 *!           F(i + 1, 2) + houses[i][2]
 *!         )
 */
function paintHouse(house) {
  function paint(i, prevColor) {
    //* No more houses to paint
    if (i === house.length) return 0;

    let minCost = Infinity;

    //* There are 3 colors (0, 1, 2)
    for (let color = 0; color < 3; color++) {
      if (color !== prevColor) {
        minCost = Math.min(minCost, paint(i + 1, color) + house[i][color]);
      }
    }

    return minCost;
  }

  if (house.length === 0) return 0;

  return paint(0, null);
}

console.log(paintHouse([[10, 4, 2]])); //* 2

console.log(
  paintHouse([
    [20, 30, 40],
    [40, 30, 40],
    [20, 30, 40],
  ])
); //* 70

console.log(
  paintHouse([
    [17, 2, 17],
    [16, 16, 5],
    [14, 3, 19],
  ])
); //* 10

console.log(
  paintHouse([
    [17, 2, 17],
    [16, 16, 5],
  ])
); //* 7

//* Time: O(3^n) - There are three possible choices we can make at each step
//* The depth of the recursion tree scales with the number of houses (n)
//* We progress the (index) state by 1 each step

//* Space: O(n) - The depth of the recursion tree is "n"
