//* Essentially, we have to check if there is an overlap between the two intervals
//* A is AFTER B if A.start > B.end
//* A is BEFORE B if A.end < B.start
//* Thus, an overlap occurs if NEITHER of these are true
//* One of De Morgan's laws states that ¬(A or B) = Not A AND Not B
//* So all we have to do is reverse the above inequalities
function haveConflict(event1, event2) {
  return event1[0] <= event2[1] && event1[1] >= event2[0];
}

console.log(haveConflict(["01:15", "02:00"], ["02:00", "03:00"])); //* True
console.log(haveConflict(["01:00", "02:00"], ["01:20", "03:00"])); //* True
console.log(haveConflict(["10:00", "11:00"], ["14:00", "15:00"])); //* False
console.log(haveConflict(["00:01", "00:05"], ["00:06", "00:07"])); //* False
console.log(haveConflict(["01:15", "01:15"], ["01:15", "01:15"])); //* True

//* Time: O(1) - We can check if the intervals overlap using a simple O(1) calculation

//* Space: O(1) - The memory usage remains constant regardless of the input sizes
