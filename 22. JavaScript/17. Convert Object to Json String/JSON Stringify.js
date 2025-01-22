function jsonStringify(object) {
  //* The primitive values should be treated as literals
  if (object === null) {
    return "null";
  }

  //* Strings must be wrapped in double-quotes
  if (typeof object === "string") {
    return `"${object}"`;
  }

  //* Numbers and Booleans are converted to their literal
  if (typeof object === "number" || typeof object === "boolean") {
    return object.toString();
  }

  //* Apply the stringify function to all the array elements (recursively)
  if (Array.isArray(object)) {
    return `[${object.map(jsonStringify).join(",")}]`;
  }

  //* Stringify the object recursively
  if (typeof object === "object") {
    return `{${Object.entries(object)
      .map(([key, value]) => `"${key}":${jsonStringify(value)}`)
      .join(",")}}`;
  }

  return "";
}

const obj1 = { y: 1, x: 2 }; //* {y:1,x:2 }
const obj2 = { a: "str", b: -12, c: true, d: null }; //* {a:str,b:-12,c:true,d:null }
const obj3 = { object: { a: 1, b: [{}, null, "Hello"] } }; //* {"object":{"a":1,"b":[{},null,"Hello"]}}
const obj4 = { strArray: ["1", "3", "5"] }; //* {"strArray":["1","3","5"]}
const obj5 = { numsArray: [1, 3, 5] }; //* {"numsArray":[1,3,5]}
const obj6 = { number: 1 }; //* { "number":1}
const obj7 = { null: null }; //* {"null":null}
const obj8 = { string: "sonic" }; //* {"string":"sonic"}

debugger;
jsonStringify(obj3);

console.log(jsonStringify(obj1) === JSON.stringify(obj1)); //* True
console.log(jsonStringify(obj2) === JSON.stringify(obj2)); //* True
console.log(jsonStringify(obj3) === JSON.stringify(obj3)); //* True
console.log(jsonStringify(obj4) === JSON.stringify(obj4)); //* True
console.log(jsonStringify(obj5) === JSON.stringify(obj5)); //* True
console.log(jsonStringify(obj6) === JSON.stringify(obj6)); //* True
console.log(jsonStringify(obj7) === JSON.stringify(obj7)); //* True
console.log(jsonStringify(obj8) === JSON.stringify(obj8)); //* True
