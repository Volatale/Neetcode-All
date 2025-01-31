//* If we take the problem statement literally, we need to perform a simulation
//* When students[0] matches sandwiches[0], both elements leave their arrays
//*     - Shift() removes arr[0] and returns 0 (effectively removing it from the queue)
//* If there is a mismatch (students[0] !== sandwiches[0])
//*     - Then students[0] moves to the BACK of the queue
//*     - In other words, shift it and push to the same array
//* We need to track the number of students that have rejected the current sandwich
//*     - Otherwise, we have no exit condition
//* If a student ever does accept the current sandwich, we reset the rejection count
//*     - All "n" (students.length) students need to reject the same sandwich for an "early" exit
function countStudents(students, sandwiches) {
  let rejections = 0; //* No. of Students that rejected the current sandwich

  while (students.length > 0) {
    if (students[0] === sandwiches[0]) {
      //* Student prefers this sandwich
      students.shift();
      sandwiches.shift();
      rejections = 0;
    } else {
      //* Move student to the back of the queue
      students.push(students.shift());
      rejections++;
    }

    //* If all remaining students rejected this sandwich, stop
    if (rejections === sandwiches.length) {
      break;
    }
  }

  //* Students.length is the number of students that were fed
  return students.length;
}

console.log(countStudents([1, 1, 0, 0], [0, 1, 0, 1])); //* 0
console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1])); //* 3
console.log(countStudents([0, 0, 0], [0, 0, 0])); //* 0
console.log(countStudents([0, 0, 0], [0, 1, 1])); //* 2

//* Time: O(n^2) - Shifting elements from index 0 to n - 1 takes O(n)
//* And in the worst case, we have to do this "n" times, so we get O(n) * O(n) = O(n^2)

//* Space: O(1) - We are not using any additional space that will scale with the input size
