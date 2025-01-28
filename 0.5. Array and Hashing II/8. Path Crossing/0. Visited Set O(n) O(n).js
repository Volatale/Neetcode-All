//* Use a set to track whether we have visited the current cell already
function isPathCrossing(path) {
  //* There is no path to cross with
  if (path.length === 0) return false;

  let position = [0, 0]; //* (X, Y)
  const visited = new Set();
  visited.add(`${0}-${0}`);

  for (const dir of path) {
    if (dir === "N") {
      position[1]++;
    } else if (dir === "S") {
      position[1]--;
    } else if (dir === "E") {
      position[0]++;
    } else if (dir === "W") {
      position[0]--;
    }

    const newCell = `${position[0]}-${position[1]}`;

    //* Already visited this cell
    if (visited.has(newCell)) {
      return true;
    }

    visited.add(newCell);
  }

  //* Path does not cross
  return false;
}

console.log(isPathCrossing("NES")); //* False
console.log(isPathCrossing("NESWW")); //* True
console.log(isPathCrossing("NNS")); //* True
console.log(isPathCrossing("EE")); //* False
console.log(isPathCrossing("W")); //* False

//* Time: O(n) - We have to iterate over all of the charactrs in "path"
//* Checking if the cell already exists in the set takes Θ(1) on average

//* Space: O(n) - In the worst case, all of the cells we visit are unique
//* Which means the set will have "n" elements, which matches path.length (n)
