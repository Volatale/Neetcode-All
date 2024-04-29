function baseballGame(operations) {
  //* A stack guarantees we process elements in a LIFO order
  const record = [];

  let sum = 0;

  for (let i = 0; i < operations.length; i++) {
    switch (operations[i]) {
      case "C":
        const popped = record.pop();
        sum -= popped;
        break;
      case "D":
        const top = record[record.length - 1];
        const double = top * 2;
        record.push(double);
        sum += double;
        break;
      case "+":
        const first = record[record.length - 1];
        const second = record[record.length - 2];
        const addition = first + second;
        record.push(first + second);
        sum += addition;
        break;
      //* Anything that isn't "C", "D" or "+", so any integer
      default:
        const val = parseInt(operations[i]);
        sum += val;
        record.push(val);
    }
  }

  return sum;
}

console.log(baseballGame(["5", "2", "C", "D", "+"])); //* 30
console.log(baseballGame(["5", "-2", "4", "C", "D", "9", "+", "+"])); //* 27
console.log(baseballGame(["1", "C"])); //* 0

//* Time: O(n) - We process each element once
//* Elements that are integers are added to the stack

//* Space: O(n) - If every element is an integer, we add every element to the stack
//* ["5", "2", "1"] -> [5, 2, 1]
