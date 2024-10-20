//* We need to determine the different ways we can make each change
//*     - 10 can be made using (5 + 5)
//*     - 15 can be made using (10 + 5) and (5 + 5 + 5)
//! Five dollar bills are more valuable
//*     - We NEED them to be able to handle BOTH the $15 AND the $10 cases
//*     - A $10 can only used in the $15 case, thus it is less valuable
//* So essentially, if given the option, we want to retain $5s and instead use $10s
function lemonadeChange(bills) {
  let fives = 0; //* Number of held $5 bills
  let tens = 0; //* Number of held $10 bills

  for (let bill of bills) {
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      if (fives === 0) return false; //* We don't have change
      tens++;
      fives--;
    } else if (bill === 20) {
      if (tens > 0 && fives > 0) {
        tens--;
        fives--;
      } else if (fives >= 3) {
        fives -= 3;
      } else {
        return false; //* Don't have change
      }
    }
  }

  return true;
}

console.log(lemonadeChange([5, 5, 5, 10, 20])); //* True
console.log(lemonadeChange([5, 5, 10])); //* True
console.log(lemonadeChange([10])); //* False
console.log(lemonadeChange([5, 5, 10, 10, 20]));

//* Time: O(n) - We iterate through the entire array once
//* The time taken scales linearly with the input size

//* Space: O(1) - We are only using constant space variables
