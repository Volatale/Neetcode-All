//* Each device beam essentially acts as a lightning rod
//*     - It creates a beam with ALL of the devices in the previous set found
//* Count how many devices exist on the current row
//* If the number of devices in the PREVIOUS row > 0
//*     - The number of beams = prevRow * currRow
//*     - Then, the prevRow BECOMES the currRow
//* Rows with no devices are essentially skipped
//*     - They don't contribute at all
function numberOfBEams(bank) {
  //* There are no lazers, we need 2 rows minimum
  if (bank.length === 1) return 0;

  let prevDevices = 0;
  let totalLazers = 0;

  const n = bank.length;
  const m = bank[0].length;

  //* Count how many lazers there are
  for (let row = 0; row < n; row++) {
    let currDevices = 0;

    for (let col = 0; col < m; col++) {
      if (bank[row][col] === "1") {
        currDevices++;
      }
    }

    //* No. of lasers = devices on prev row * devices on this row
    if (currDevices > 0) {
      totalLazers += currDevices * prevDevices;
      prevDevices = currDevices;
    }
  }

  return totalLazers;
}

console.log(numberOfBEams(["011001", "000000", "010100", "001000"])); //* 8
console.log(numberOfBEams(["000", "111", "000"])); //* 0
console.log(numberOfBEams(["010", "010", "101"])); //* 3
console.log(numberOfBEams(["11", "11"])); //* 4
console.log(numberOfBEams(["010", "000", "101"])); //* 2
console.log(numberOfBEams(["010", "000", "100"])); //* 1
console.log(numberOfBEams(["0101", "0110", "0100", "1010"])); //* 8
console.log(numberOfBEams(["1"])); //* 0

//* Time: O(n * m) - We perform a nested for loop that scales with n and m

//* Space: O(1) - We are only using constant space variables
