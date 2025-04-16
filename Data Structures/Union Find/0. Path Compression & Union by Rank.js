class UnionFind {
  constructor(size) {
    this.parent = new Array(n).fill(0);
    this.rank = new Array(n).fill(0);

    for (let i = 0; i < size; i++) {
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
