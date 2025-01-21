//* Why skip ".every(o2)"?
//* If keys1.length !== keys2.length, the objects cannot be deeply equal
//* However, if they ARE of equal length...
//* It implies that keys2 does not contain any keys that are not also present in keys1
//! It is important to note the following, but the test cases don't require they be taken care of
//* console.log(-0 === +0); //* True
//* console.log(NaN === NaN); //* False
//* console.log(Object.is(-0, +0)); //* False
//* console.log(Object.is(NaN, NaN)); //* True
function deeplyEqual(o1, o2) {
  //* Handle primitive types and null
  if (o1 === o2) return true;
  if (
    o1 === null ||
    o2 === null || //* The above check means we know one is not null
    typeof o1 !== "object" ||
    typeof o2 !== "object"
  )
    return false;

  if (Array.isArray(o1) !== Array.isArray(o2)) return false;

  //* Handle array case
  if (Array.isArray(o1) && Array.isArray(o2)) {
    if (o1.length !== o2.length) return false;

    //* Recursively check each element
    for (let i = 0; i < o1.length; i++) {
      if (!deeplyEqual(o1[i], o2[i])) return false;
    }

    //* These values were strictly equal
    return true;
  }

  //* Handle object case
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  if (keys1.length !== keys2.length) return false;

  //* Check if all of o1's keys also exist in o2 (recursively)
  return keys1.every(
    (key) => o2.hasOwnProperty(key) && deeplyEqual(o1[key], o2[key])
  );
}

console.log(deeplyEqual({ x: 1, y: 2 }, { x: 1, y: 2 })); //* True
console.log(deeplyEqual({ y: 2, x: 1 }, { x: 1, y: 2 })); //* True (different key order)
console.log(deeplyEqual({ x: 1, y: 2 }, { x: 1, y: 3 })); //* False (y does not have the same value)

console.log(
  deeplyEqual({ x: null, L: [1, 2, 3] }, { x: null, L: ["1", "2", "3"] }) //* False (number[] !== string[])
);

console.log(deeplyEqual(true, false)); //* False

console.log(
  deeplyEqual({ sonic: "the Hedgehog" }, { knuckles: "the Echidna" })
); //* False (different keys)

console.log(deeplyEqual({ a: 1, b: 2, c: 3, d: 4 }, { a: 1, b: 2 })); //* False (o2 is missing 3 keys)
console.log(deeplyEqual([{ 1: [1, 2, 3] }], [{ 1: [1, 2, 3] }])); //* True

console.log(
  deeplyEqual(
    { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
    { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6 }
  )
); //* False
