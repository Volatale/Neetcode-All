//* Use Long Multiplication
function multiply(num1, num2) {
  const n = num1.length;
  const m = num2.length;
  const pos = Array(m + n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const mul = (num1[i] - "0") * (num2[j] - "0");
      const p1 = i + j;
      const p2 = i + j + 1;
      const sum = mul + pos[p2];

      pos[p1] += Math.floor(sum / 10);
      pos[p2] = sum % 10;
    }
  }

  let result = "";
  for (const p of pos) {
    if (!(result.length === 0 && p === 0)) {
      result += p;
    }
  }
  return result.length === 0 ? "0" : result;
}

console.log(multiply("2", "3")); //* 6
console.log(multiply("123", "456")); //* "56088"
console.log(multiply("35", "273")); //* "9555"
console.log(multiply("1000", "52")); //* "52000"

//* Time: O(n * m) - Performing long multiplication takes O(n * m) time
//* then, it takes O(n + m) to build the result

//* Space: O(n + m) - The result array's size scales with both input sizes
//* As does the final result string
