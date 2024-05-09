//* if m * k > bloomDay.length, you don't have enough flowers to make "m" bouquets
//* Even if you considered optimal conditions like [1, 1, 1] (1 is the minimum number of days to wait)
//* If bloomDay[i] > day, you cannot choose that flower
//* That handles the adjacency check
//* Try every day between 1 and the max value in bloomDay
//* Return the first value that lets us successfully create "m" bouquets
function minimumDaysToMakeMBouquets(bloomDay, m, k) {
  if (m * k > bloomDay.length) return -1; //* We don't have enough flowers to make "m" bouquets

  //* Maximum days to wait is largest value in bloomDay
  let maxDays = Math.max(...bloomDay);

  let flowers = 0;
  let bouquets = 0;

  //* Minimum number of days is 1
  for (let day = 1; day <= maxDays; day++) {
    //* Try to make "m" bouquets after waiting "day" days
    for (let bloom of bloomDay) {
      //* Flower has not bloomed yet
      if (bloom > day) {
        flowers = 0; //* Reset count; All picked flowers must be adjacent
      } else {
        flowers++;

        if (flowers === k) {
          bouquets++;
        }
      }
    }

    //* Successfully able to make "m" bouquets after waiting "day" days
    if (bouquets >= m) return day;

    //* Failed, try more days
    flowers = 0;
    bouquets = 0;
  }
}

console.log(minimumDaysToMakeMBouquets([1, 10, 3, 10, 2], 3, 1)); //* 3
console.log(minimumDaysToMakeMBouquets([1, 1, 1], 1, 4)); //* -1: We don't have enough flowers
console.log(minimumDaysToMakeMBouquets([1], 1, 1)); //* 1
console.log(minimumDaysToMakeMBouquets([2], 1, 1)); //* 2
console.log(minimumDaysToMakeMBouquets([10, 10, 10], 1, 3)); //* 10
console.log(minimumDaysToMakeMBouquets([1, 10, 2, 9, 3, 8, 4, 7, 5, 6], 4, 2)); //* 9

//* Time: O(n * max(bloomDay)) - The minimum number of days to wait is 1
//* The maximum number of days to wait is the maximum value in bloomDay
//* The number of outer iterations scales with the max(bloomDay)
//* For every outer iteration, there can be "n" inner iterations (at worst) if we process every element

//* Space: O(1) - The space usage remains constant regardless of input size
