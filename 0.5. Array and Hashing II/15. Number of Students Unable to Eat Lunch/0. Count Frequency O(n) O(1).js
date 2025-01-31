//* Simply count the frequency of students' sandwich preferences
//* Then iterate through the sandwich array from left to right
//* If the frequency of the current sandwich type is greater than 0
//*     - The current student can be fed
//* If NOT (the frequency is 0)
//*     - Then we need to immediately return
//! We cannot feed the rest of the students if the current sandwich is NOT taken
//* Remember, ONLY the students are changing order
//* The sandwiches themselves have to be assigned IN ORDER (from left to right)
//* So if frequency of the current sandwich is 0, then no more sandwiches are ever given out
function countStudents(students, sandwiches) {
  let counts = [0, 0];
  let unfedStudents = students.length;

  //* Get the count of the students' preferences
  for (let student of students) {
    counts[student]++;
  }

  //* Hand out sandwiches in order (L to R)
  for (let sandwich of sandwiches) {
    if (counts[sandwich] > 0) {
      counts[sandwich]--;
      unfedStudents--;
    } else {
      //* Can't feed the rest of the students since this sandwich was not taken
      return unfedStudents;
    }
  }

  return unfedStudents;
}

console.log(countStudents([1, 1, 0, 0], [0, 1, 0, 1])); //* 0
console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1])); //* 3
console.log(countStudents([0, 0, 0], [0, 0, 0])); //* 0
console.log(countStudents([0, 0, 0], [0, 1, 1])); //* 2

//* Time: O(n) - It takes O(n) to iterate through both the students and sandwiches arrays

//* Space: O(1) - There are only ever two types of data, so we only need two indices to store the frequencies
//* Thus, the memory usage remains constant regardless of input size
