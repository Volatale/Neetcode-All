//* There is no need for nested loops
//*     - We can instead just track the frequency of each point
//*         - Use a hashtable for this purpose
//*     - Use an array to track the different points we have
//*         - It is possible that we get duplicate points, so a hashtable alone won't suffice
//* Whenever we call add()
//*     - Increment the frequency of the current point in the hashtable
//*     - Push this point to the array
//* When calling count()
//*     - Iterate over all of the points we have (in the array)
//*     - Check if the argument point and the iteration point are diagonals
//*         - If abs(x1 - x2) === abs(y1 - y2), the points are diagonal
//*     - Also check if any of the points share the same axis
//*         - It is possible to have points that overlap (and duplicate points)
//*         - So (5, 10) and (5, 15) are invalid, and cannot possible form a square
//*             - Skip points whose (x1 === x2) or (y1 === y2)
//*     - Next, we can check for the MISSING two points using the coordinates we already have
//*         - We have: (px, py) and (x, y)
//*             - They are guaranteed to be diagonal
//*         - Check for the existence of (px, y) and (x, py)
//*             - If they DON'T exist, then we'll assume their frequency is 0
//*     - Lastly, just multiply by the frequency of those points (or 0 if a square cannot be formed)
class DetectSquares {
  constructor() {
    this.pointCount = {}; //* Tracks frequency of points
    this.points = []; //* Tracks the points themselves
  }

  add(point) {
    //* Increment the count of this point
    const key = `${point[0]}-${point[1]}`;
    this.pointCount[key] = (this.pointCount[key] || 0) + 1;

    //* Add this point to the list
    this.points.push(point);
  }

  count(point) {
    const [px, py] = point;
    let result = 0;

    //* Iterate through all the points
    for (const [x, y] of this.points) {
      //* Verify that this is a diagonal point, and that the area will be > 0
      if (Math.abs(px - x) !== Math.abs(py - y) || x == px || y == py) continue;

      result +=
        (this.pointCount[`${x}-${py}`] || 0) *
        (this.pointCount[`${px}-${y}`] || 0);
    }

    return result;
  }
}

const detectSquares = new DetectSquares();
console.log(detectSquares.add([3, 10]));
console.log(detectSquares.add([11, 2]));
console.log(detectSquares.add([3, 2]));
console.log(detectSquares.count([11, 10])); //* 1
console.log(detectSquares.count([14, 8])); //* 0
console.log(detectSquares.add([11, 2]));
console.log(detectSquares.count([11, 10])); //* 2

//* Time: O(n) - Add() takes O(1) time to complete, and count() takes O(n) (we iterate through all of the points found)

//* Space: O(n) - In the worst case, every point is unique, so the hashtable stores n keys and n values
//* The array will always use O(n) space
