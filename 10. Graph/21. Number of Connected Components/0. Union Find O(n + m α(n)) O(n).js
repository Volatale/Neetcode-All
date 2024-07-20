class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0);
    this.rank = new Array(size).fill(0);

    //* The parent of every node starts as itself
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  //* Path Compression
  find(x) {
    let root = x; //* Tracks current node, ala Priority Queue Swaps

    //* Loop while root of node is not itself
    while (this.parent[root] !== root) {
      const parent = this.parent[root];
      this.parent[root] = this.parent[parent]; //* Parent = parent of parent
      root = this.parent[root];
    }

    return root;
  }

  //* Union by Rank
  //* Smaller component is unioned into larger component
  union(x, y) {
    //* Find the roots of both nodes (and path compress)
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        //* Both ranks are equal; default to Y's parent is X
        this.parent[rootY] = rootX;
        this.rank[rootX]++; //* X is now a larger component
      }
    }
  }
}

//* Each vertex starts as its own component
//* Use Union Find to union the vertex and neighbor
//* If they do not have the same root, we can union them
//*     - When we union, we effectively "lose" a component
//*     - All of the vertices were their "own" component initially
//*         - Decrement n
//* At the end, return n (the remaining connected components)
function connectedComponents(n, edges) {
  const UF = new UnionFind(n);

  //* Iterate through the edge list
  for (let [vertex, neighbor] of edges) {
    //* Find the roots of each vertex in the UF
    const vRoot = UF.find(vertex);
    const nRoot = UF.find(neighbor);

    //* If they aren't in the same component, union them
    if (vRoot !== nRoot) {
      UF.union(vertex, neighbor);
      n--; //* We lost a component because they merged
    }
  }

  return n;
}

console.log(
  connectedComponents(5, [
    [0, 1],
    [1, 2],
    [3, 4],
  ])
); //* 2

console.log(
  connectedComponents(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ])
); //* 1

console.log(connectedComponents(2, [[0, 1]])); //* 1

//* Time: O(n + m * α(n))
//* It takes O(n) to initialize the Union Find itself
//* There are "m" edges to process; union takes α(n) due to the UF optimizations
//* So m * α(n)

//* Space: O(n) - The UF itself holds two arrays, both of which have "n" length
