//! This is a geeksforgeeks problem
//* This is an activity selection / Unweighted interval scheduling problem
//*     - All of the intervals have the same weight (or value)
//*     - We simply want to maximize the number of intervals we can include
//* Create tuples / pairs out of the data for each task
//* Sort the tasks based on their FINISH time (in ascending order)
//*     - We want to see tasks that END sooner earlier
//*     - Strictly speaking, we are more likely to be able to include tasks that END sooner
//* Imagine we have [1, 5, 10, 1] and [3, 8, 15, 20]
//*     - Obviously we don't want to choose the task that ENDS at 20
//*         - Choosing that task means we can't do the OTHER tasks that end a lot sooner
//!         - These tasks HAVE NO WEIGHT
//*             - There is no value in choosing tasks that end later
//*     - Instead, we can choose the first three tasks since they don't overlap
function maxNumberOfActivities(start, finish) {
  //* There are no tasks to consider
  if (start.length === 0) return 0;

  //* Pair up each task's start and end time and sort them by FINISH time
  const tasks = start
    .map((val, i) => [start[i], finish[i]])
    .sort((a, b) => a[1] - b[1]); //* We want to see tasks that END sooner earlier

  //* Start by including the first task
  let activites = 1;
  let taskEnd = tasks[0][1];

  //* Try to perform as many tasks as possible
  for (let i = 1; i < tasks.length; i++) {
    //* We can do the task if its startTime > last task's end time
    if (tasks[i][0] >= taskEnd) {
      activites++;
      taskEnd = tasks[i][0];
    }
  }

  return activites;
}

console.log(maxNumberOfActivities([10, 12, 20], [20, 25, 30])); //* 1
console.log(maxNumberOfActivities([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9])); //* 4
console.log(maxNumberOfActivities([1, 5, 10, 1], [3, 8, 15, 20])); //* 3
console.log(maxNumberOfActivities([1, 1], [3, 5])); //* 1

//* Time: O(n log n) - Since this is an interval problem, we have to sort the input O(n log n)
//* It also takes O(n) time to map create the tasks array

//* Space: O(n) - We create a tasks array to group the data for each task (the array has n length)
//* Assuming merge sort is used for the sort, we also use O(n) space for that
