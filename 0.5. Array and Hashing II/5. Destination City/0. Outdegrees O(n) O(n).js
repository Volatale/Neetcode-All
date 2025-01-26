//* We are simply looking for the node with an outdegree of 0
//* The node with an outdegree of 0 is our destination city
function destCity(paths) {
  const outdegree = {}; //* Can't use an array: we don't know how many nodes exist

  //* Get the outdegree of every node
  for (const [vertex, neighbor] of paths) {
    if (!outdegree.hasOwnProperty(vertex)) {
      outdegree[vertex] = 0;
    }

    if (!outdegree.hasOwnProperty(neighbor)) {
      outdegree[neighbor] = 0;
    }

    outdegree[vertex]++;
  }

  //* Find the node with an outdegree of 0 (the destination city)
  for (let node in outdegree) {
    if (outdegree[node] === 0) {
      return node;
    }
  }
}

console.log(
  destCity([
    ["London", "New York"],
    ["New York", "Lima"],
    ["Lima", "Sao Paulo"],
  ])
); //* "San Paulo"

console.log(
  destCity([
    ["B", "C"],
    ["D", "B"],
    ["C", "A"],
  ])
); //* "A"

console.log(destCity([["A", "Z"]])); //* "Z"

console.log(
  destCity([
    ["A", "B"],
    ["A", "D"],
    ["D", "E"],
    ["B", "C"],
    ["E", "B"],
  ])
); //* "C"

//* Time: O(n) - We have to iterate through the paths array
//* But we also iterate through all of the (unique) keys in the outdegree object
//* At worst there are n + 1 unique keys ([[A, B], [B, C]])

//* Space: O(n) - Since there are at most n + 1 unique keys, the space usage is O(n)
