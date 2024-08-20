//* A symbol can either be 1 or 2 length
//* So at each step we have 2 choices
//! We also need to ignore leading zeroes

//! Recurrence Relation: F(n) = F(n + 1) + F(n + 2) (push DP)
//! or, F(n) = F(n - 1) + F(n - 2) (pull DP)
//* F(n) = No. of Ways to decode string starting from index "n" to the end of the strin

//* The recurrence relation tells us we only need the two previous states
function numDecodings(s) {
  //* Base Cases
  if (s.length === 0 || s[0] === "0") return 0;

  let first = 1; //* Represents F(n-2)
  let second = 1; //* Represents F(n-1)

  for (let i = 2; i <= s.length; i++) {
    let third = 0;

    //* Handle single character case
    if (s[i - 1] > "0") {
      third += second;
    }

    //* Handle double character case
    if (s[i - 2] === "1" || (s[i - 2] === "2" && s[i - 1] <= "6")) {
      third += first;
    }

    first = second;
    second = third;
  }

  return second;
}

console.log(numDecodings("1")); //* 1
console.log(numDecodings("10")); //* 1
console.log(numDecodings("12")); //* 2
console.log(numDecodings("226")); //* 3
console.log(numDecodings("06")); //* 0
console.log(numDecodings("123")); //* 3
console.log(numDecodings("5232")); //* 2
console.log(numDecodings("10010202")); //* 0
console.log(numDecodings("2611055971756562")); //* 4
console.log(numDecodings("111111111111111111111111111111111111111111111")); //* 1836311903

//* Time: O(n) - It takes O9n) to create the DP array
//* Then we perform an O(n) for loop

//* Space: O(1) - We only need to retain the two previous states
//* So we use a constant amount of space
