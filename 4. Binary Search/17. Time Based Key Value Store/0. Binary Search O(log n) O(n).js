//* The task is to design a time based key-value store
//*     - It should be able to store multiple values for the same key at different timestamps
//*     - It should also be able to retrieve the keys at specific timestamps
//* We need to store values that are associated with the provided timestamp
//* Thus, it makes sense to use a pair datastructure
//*     - JavaScript -> [value, timestamp]
//*     - Python -> [value, timestamp]
//*     - C++ ->
//* When we `get`, we always want the LARGEST possible timestamp'd value such that:
//*     - timestampPrev <= timestamp
//*     - In other words, if "timestamp" is > the largest timestamp for this key, the largest timestamp'd value will suffice
//* Due to the above, when it comes to setting, we can simply push tuples
class TimeMap {
  constructor() {
    this.map = {}; //* Objects > Maps when we don't need rapid sets/deletes
  }

  //* Timestamps are sorted in non-decreasing order
  set(key, value, timestamp) {
    if (!this.map[key]) {
      this.map[key] = [];
    }

    //* Push tuples of [value, timestamp]. foo: [["bar", 1], ["baz", 2], ["maz", 2]]
    this.map[key].push([value, timestamp]);
  }

  //* Timestamps are sorted in non-decreasing order; we can binary search
  get(key, timestamp) {
    //* Get all of the tuples (array pairs) associated with this key
    const pairs = this.map[key];

    if (!pairs) return "";

    //* The search space is the range of possible values
    let left = 0; //* The smallest timestamp in the set of values
    let right = pairs.length - 1; //* The largest timestamp in the set of values

    let result = "";

    while (left <= right) {
      //* `mid` represents the tuple we are searching
      const mid = left + ((right - left) >> 1);

      if (pairs[mid][1] <= timestamp) {
        result = pairs[mid][0]; //* Found candidate
        left = mid + 1; //* Try to find a larger one in the right subarray
      } else {
        right = mid - 1; //* The timestamp exists in the left subarray
      }
    }

    //* The value associated with the key at `timestamp` timestamp
    return result;
  }
}

//* Test 1
const timeMap = new TimeMap();

timeMap.set("foo", "bar", 1);

console.log(timeMap.get("foo", 1)); //* "bar"
debugger;
console.log(timeMap.get("foo", 3)); //* "bar" (3 does not exist yet, so look back)

timeMap.set("foo", "bar2", 4);

console.log(timeMap.get("foo", 4)); //* "bar2"
console.log(timeMap.get("foo", 5)); //* "bar2"

//* Test II
const timeMap2 = new TimeMap();

timeMap2.set("sonic", "thehedgehog", 1);
timeMap2.set("sonic", "mobiussaviour", 2);

console.log(timeMap2.get("sonic", 2)); //* "mobiussaviour"
console.log(timeMap2.get("knuckles", 2)); //* "" (doesn't exist in the map)

//* Test III
const timeMap3 = new TimeMap();

timeMap3.set("love", "high", 10);
timeMap3.set("love", "low", 20);

console.log(timeMap3.get("love", 5)); //* "," (timestamp of <= 5 does not exist)
console.log(timeMap3.get("love", 10)); //* "high"
console.log(timeMap3.get("love", 15)); //* "high"
console.log(timeMap3.get("love", 20)); //* "low"
console.log(timeMap3.get("love", 25)); //* "low"

//* Time: O(log n) - The search space is halved within each iteration

//* Space: O(k) - The memory usage scales with the number of unique keys passed to TimeMap
