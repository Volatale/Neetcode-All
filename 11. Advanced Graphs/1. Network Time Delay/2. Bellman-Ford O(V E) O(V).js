//* We can use Bellman-Ford instead of building a graph
//* Iterate over the edge list V-1 times
//* Then, iterate over the dist array, if any value === infinity
//*     - We don't have a path from node "k" to every other node
//*     - So return -1
//* Otherwise, take the maximum from all of these values
//*     - This gives us our minimum time taken for the signal to hit every node
function networkDelayTime(times, n, k) {
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  let maxDistance = 0;

  //* Relax edges V - 1 times
  for (let i = 1; i <= n - 1; i++) {
    for (let [vertex, neighbor, weight] of times) {
      if (dist[vertex] !== Infinity && dist[neighbor] > dist[vertex] + weight) {
        dist[neighbor] = dist[vertex] + weight;
      }
    }
  }

  //* Find maximum distance
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1; //* "k" cannot reach every node
    maxDistance = Math.max(maxDistance, dist[i]);
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

//* Time: O(V*E) - Bellman-Ford takes O(V*E) time to complete
//* We relax every every V-1 times
//* Then we do an O(n) loop, but this is not the dominant term

//* Space: O(V) - The space usage scales with the number of nodes
//* We create a dist array of size n, but that is it
