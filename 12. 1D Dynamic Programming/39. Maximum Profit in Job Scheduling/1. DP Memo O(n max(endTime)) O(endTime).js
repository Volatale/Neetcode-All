//* Each job's properties are split into 3 arrays
//*     - Congregate all of the data for each task into arrays
//* Logically speaking, it makes sense to sort the tasks based on start time
//*     - If both tasks have equal start time, sort based on profit (in descending order)
//* At each step, we can either include the current task, or exclude it
//*     - If you do take the task, you can't take anymore jobs until you reach a task whose start time <= current end time
//*     - Otherwise, just skip the current task
//! Minimize Start time, and maximize profit

//! TLE
//* Apply memoization to avoid redundant work
//*     - We only need to cache the endTimes
function jobScheduling(startTime, endTime, profit) {
  function getProfit(i, memo) {
    //* Base Case: No more tasks to consider
    if (i === tasks.length) return 0;

    //* Utilize memoized value
    if (memo.hasOwnProperty(i)) return memo[i];

    //* Case 1: Skip the current task
    let maxProfit = getProfit(i + 1, memo);

    //* Case 2: Take the current task and find the next non-overlapping task
    //* Start time of nextTask must be >= endTime of the current task
    let nextTask = i + 1;
    while (nextTask < tasks.length && tasks[nextTask][0] < tasks[i][1]) {
      nextTask++;
    }

    //* Move to the next valid task, and collect the profit for THIS task
    maxProfit = Math.max(maxProfit, getProfit(nextTask, memo) + tasks[i][2]);

    return (memo[i] = maxProfit);
  }

  //* There are no tasks
  if (startTime.length === 0) return 0;

  const n = startTime.length;

  //* Group up the tasks into arrays for ease of access/sorting
  //* Sort tasks based on startTime (ascending)
  const tasks = new Array(n)
    .fill(0)
    .map((_, i) => [startTime[i], endTime[i], profit[i]])
    .sort((a, b) => a[0] - b[0]);

  //* Start at job 0, and assume we can start any task
  return getProfit(0, {});
}

console.log(jobScheduling([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70])); //* 120

console.log(
  jobScheduling([1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60])
); //* 150

console.log(jobScheduling([1, 1, 1], [2, 3, 4], [5, 6, 4])); //* 6

//* Time: O(n^2) - Since we are memoizing the results of each subproblem
//* And there are "n" unique indices, the getProfit function is called "n" times
//* But within each call, we have a loop that scales with O(n), so O(n^2)

//* Space: O(n) - The sorting step uses O(n) space (it probably uses Merge Sort)
//* The height of the recursion tree is O(n) since there are "n" levels of recursion
//* The memo object scales in size with the max endTime
