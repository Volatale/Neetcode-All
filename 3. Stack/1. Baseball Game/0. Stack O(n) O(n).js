//* We are given a string[], where operation[i] determines the action we have to take
//*     - Integer "x" means we record a new score of x
//*     - Character "D" means we record a new score that is DOUBLE the previous score
//*         - Do not get rid of the previous one
//*     - Character "+" means record a new score that is the sum of the two previous scores
//*     - Character "C" means we invalidate the previous score, removing it from the record
//! Notice that all of the operations work based on the most recent elements/
//* So we should use a stack data structure (the elements are processed in LIFO order)
function calPoints(operations) {
  const record = []; //* Acts as a stack for LIFO processing
  let sum = 0; //* Track the score as we go

  for (let char of operations) {
    switch (char) {
      case "+":
        const value = record[record.length - 1] + record[record.length - 2];
        record.push(value);
        sum += value;
        break;
      case "D":
        const double = record[record.length - 1] * 2;
        record.push(double);
        sum += double;
        break;
      case "C":
        sum -= record.pop();
        break;
      default:
        const newRecord = parseInt(char);
        record.push(newRecord);
        sum += newRecord;
        break;
    }
  }

  //* Tracking the cumulative sum means not needing to calculate it later
  return sum;
}

console.log(calPoints(["5", "2", "C", "D", "+"])); //* 30
console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])); //* 27
console.log(calPoints(["1", "C"])); //* 0

//* Time: O(n) - We need to process every element in the input array

//* Space: O(n) - In the worst case, the stack's size is equal to the input array's length
