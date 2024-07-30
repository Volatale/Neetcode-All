//* Use Floyd-Warshall's algorithm
//*     - Get the transitive closure (reachability matrix)
//* Find all of the distances that "k" can reach
//*     - If any of them are Infinity, node "k" cannot reach EVERY node
//*     - Thus, we should return -1
//* Otherwise, take the maximum among all the values in the row
function networkDelayTime(times, n, k) {
  const dist = new Array(n + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(Infinity));

  //* Build the adjacency matrix
  for (let [vertex, neighbor, weight] of times) {
    dist[vertex][neighbor] = weight;
  }

  //* Distance from each node to itself is 0
  for (let i = 1; i <= n; i++) {
    dist[i][i] = 0;
  }

  //* Floyd-Warshall
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  let maxDistance = 0;

  //* Iterate over the kth values, take the MAXIMUM value in the row
  for (let col = 1; col <= n; col++) {
    if (dist[k][col] === Infinity) return -1;
    maxDistance = Math.max(maxDistance, dist[k][col]);
  }

  return maxDistance;
}

console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    4,
    2
  )
); //* 2

console.log(networkDelayTime([[1, 2, 1]], 2, 1)); //* 1

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
    ],
    4,
    1
  )
); //* 4

console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
      [4, 5, 2],
    ],
    5,
    2
  )
); //* 4

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
    ],
    4,
    1
  )
); //* 4

console.log(
  networkDelayTime(
    [
      [1, 2, 2],
      [1, 3, 3],
      [1, 4, 4],
      [2, 5, 7],
    ],
    5,
    1
  )
); //* 9

//* Time: O(V^3) - Floyd-Warshall takes O(V^3) to complete

//* Space: O(V^2) - The dist matrix uses O(V^2) space
