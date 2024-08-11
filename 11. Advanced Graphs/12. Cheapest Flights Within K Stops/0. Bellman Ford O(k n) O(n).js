//* Use Bellman-Ford's Algorithm
//* BF after "k" relaxation steps
//*     - Gives us the shortest path from src to every node within "k" moves
//*     - We are told we can only have "k" stops
//*         - But these are intermiediate stops
//!         - In other words, there can only be "k" nodes BETWEEN src and dst
//!         - So technically we can move k + 1 times
//*     - We don't NEED to relax n - 1 times
function findCheapestPrice(n, flights, src, dst, k) {
  let minCost = new Array(n).fill(Infinity);
  minCost[src] = 0;

  //* Bellman-Ford's Algorithm, but relax K + 1 times
  for (let i = 0; i < k + 1; i++) {
    const temp = [...minCost]; //* Temp is a COPY of minCost

    //* Relax edges
    for (const [vertex, neighbor, price] of flights) {
      //* Haven't reached this vertex yet
      if (minCost[vertex] === Infinity) continue;

      //* Relax edge if possible
      if (minCost[vertex] + price < temp[neighbor]) {
        temp[neighbor] = minCost[vertex] + price;
      }
    }

    //* Update OG minCost array
    minCost = temp;
  }

  //* Return -1 if we can't reach dst in k moves
  return minCost[dst] < Infinity ? minCost[dst] : -1;
}

console.log(
  findCheapestPrice(
    4,
    [
      [0, 1, 100],
      [1, 2, 100],
      [2, 0, 100],
      [1, 3, 600],
      [2, 3, 200],
    ],
    0,
    3,
    1
  )
);

console.log(
  findCheapestPrice(
    3,
    [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ],
    0,
    2,
    1
  )
);

console.log(
  findCheapestPrice(
    3,
    [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ],
    0,
    2,
    0
  )
);

console.log(
  findCheapestPrice(
    4,
    [
      [0, 1, 1],
      [0, 2, 5],
      [1, 2, 1],
      [2, 3, 1],
    ],
    0,
    3,
    1
  )
);

console.log(
  findCheapestPrice(
    5,
    [
      [0, 1, 5],
      [1, 2, 5],
      [0, 3, 2],
      [3, 1, 2],
      [1, 4, 1],
      [4, 2, 1],
    ],
    0,
    2,
    2
  )
);

//* Time: O(k * E) - We are relaxing the edges k + 1 times
//* Each relaxation step takes O(E) and we do this K (+1) times
//* It takes O(n) to create a copy of the minCost array

//* Space: O(n) - We create a temporary array of "n" size in each iteration
