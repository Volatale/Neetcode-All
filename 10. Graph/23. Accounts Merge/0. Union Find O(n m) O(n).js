class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(0);
    this.rank = new Array(size).fill(0);

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
      } else if (this.rank[rootX] < this.rank[rootX]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

//* Map emails to indices
//* Matching email in another account = sme account owner
//*     - Union those indices
//* Merge the accounts using the map
//* Then sort the accounts/emails
function accountsMerge(accounts) {
  const UF = new UnionFind(accounts.length);
  const emailIndices = new Map();
  const mergedAccounts = new Map();
  const result = [];

  //* Find the indices that have a matching email
  for (let i = 0; i < accounts.length; i++) {
    const [_, ...emails] = accounts[i];

    for (let email of emails) {
      if (emailIndices.has(email)) {
        //* This index has the same email as another
        UF.union(i, emailIndices.get(email));
      } else {
        //* "email" is stored at "index" (i)
        emailIndices.set(email, i);
      }
    }
  }

  //* Merge Accounts - Aggregate all mutual emails
  for (const [emails, i] of emailIndices) {
    const root = UF.find(i);

    //* Create an array to hold the "ith" person's emails
    if (!mergedAccounts.has(root)) {
      mergedAccounts.set(root, []);
    }

    //* Emails are added to this person's email list
    mergedAccounts.get(root).push(emails);
  }

  //* Sort the emails lexicographically (and add the name)
  for (const [i, emailSet] of mergedAccounts) {
    const name = accounts[i][0]; //* Get the NAME from the accounts array
    result.push([name, ...emailSet.sort()]);
  }

  return result;
}

console.log(
  accountsMerge([
    ["Sonic", "ghz@gmail.com", "sonicTH@gmail.com"],
    ["Knuckles", "KTE@gmail.com", "knuckles@masteremerald.com"],
    ["Sonic", "sonicTH@gmail.com"],
  ])
);

console.log(
  accountsMerge([
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ])
);

//* Time: O(n * m) - Where "n" is accounts.length and "m" is the length of the longest account

//* Space: O(n) - The Union Find holds 2 arrays
//* The two maps also have up to "n" keys and values
