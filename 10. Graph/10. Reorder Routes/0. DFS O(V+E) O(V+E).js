function minReorder(n, connections) {
  function dfs(city, parent) {
    if (roads.has(`${parent}-${city}`)) reversals++;

    for (let neighbor of graph[city]) {
      if (neighbor === parent) continue;
      dfs(neighbor, city);
    }
  }

  let reversals = 0;

  const roads = new Set();
  const graph = Array.from({ length: n }, () => []);

  //* Create the connections
  for (let [cityA, cityB] of connections) {
    roads.add(`${cityA}-${cityB}`);
    graph[cityA].push(cityB);
    graph[cityB].push(cityA);
  }

  dfs(0, -1);
  return reversals;
}

console.log(
  minReorder(6, [
    [0, 1],
    [1, 3],
    [2, 3],
    [4, 0],
    [4, 5],
  ])
);

console.log(
  minReorder(5, [
    [1, 0],
    [1, 2],
    [3, 2],
    [3, 4],
  ])
);

console.log(
  minReorder(3, [
    [1, 0],
    [2, 0],
  ])
);
