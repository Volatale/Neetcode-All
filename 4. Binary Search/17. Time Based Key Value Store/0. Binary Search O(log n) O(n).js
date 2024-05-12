class TimeMap {
  constructor() {
    //* Key: [value, timestamp]
    this.map = {};
  }

  //* Timestamps are in order (sorted), so 1 appears first, then 3 etc
  set(key, value, timestamp) {
    if (!this.map[key]) {
      this.map[key] = [];
    }

    //* Push a tuple of [value, timestamp] to the map
    //* foo: [["bar", 1], ["bar", 2], ["bar2"]]
    this.map[key].push([value, timestamp]);
  }

  //* Since the timestamps are (technically) in sorted order
  //* "timestamp_prev <= timestamp"
  //* So we can binary search for our target
  //* We want to find the LARGEST value with a timestamp <= timestamp
  get(key, timestamp) {
    //* Get a reference to the correct array (so the array of tuples stored at "key")
    const tuples = this.map[key];

    //* If key does NOT exist, we have nothing to search for
    if (!tuples) return "";

    let result = "";

    //* Binary Search on the value at "key" itself
    let left = 0;
    let right = tuples.length - 1;

    while (left <= right) {
      //* Mid represents the tuple we are testing
      let mid = left + ((right - left) >> 1);

      //* If true, we found a "new" best
      if (tuples[mid][1] <= timestamp) {
        result = tuples[mid][0];
        left = mid + 1; //* Tested timestamp is too small, eliminate mid
      } else {
        right = mid - 1; //* Search the LEFT side (don't eliminate mid, could be the return value)
      }
    }

    //* If the element does NOT exist, we return ""
    return result;
  }
}

//* Test 1
const timeMap = new TimeMap();

timeMap.set("foo", "bar", 1);

console.log(timeMap.get("foo", 1)); //* "bar"
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
