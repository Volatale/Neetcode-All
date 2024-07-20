class UnionFind {
  constructor(size) {
    this.parent = new Array(size + 1).fill(0);
    this.rank = new Array(size + 1).fill(0);

    for (let i = 0; i < size + 1; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    let root = x;

    while (root !== this.parent[root]) {
      const parent = this.parent[root];
      this.parent[root] = this.parent[parent];
      root = this.parent[root];
    }

    return root;
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

//* Use Union Find to find the first edge that WOULD create a cycle
//* If we find a [vertex, neighbor] combination that ALREADY have the same root
//* Adding this edge would result in a cycle
//*     - Return [vertex, neighbor]
function findRedundantConnection(edges) {
  //* Edges + 1 because nodes start from 1, not 0 (arrays are 0-indexed)
  const UF = new UnionFind(edges.length + 1);

  //* Iterate over the edge list
  for (const [vertex, neighbor] of edges) {
    if (UF.find(vertex) !== UF.find(neighbor)) {
      UF.union(vertex, neighbor);
    } else {
      return [vertex, neighbor];
    }
  }
}

//* Time: O(n + m * α(n))
//* It takes O(n) to initialize the Union Find itself
//* There are "m" edges to process; union takes α(n) due to the UF optimizations
//* So m * α(n)

//* Space: O(n) - The UF itself holds two arrays, both of which have "n" length
