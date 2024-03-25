function encode(strs) {
  let result = "";

  for (let s of strs) {
    result += s.length + "#" + strs;
  }

  return result;
}

function decode(str) {
  const result = [];
  let i = 0;

  while (i < str.length) {
    let j = i;

    while (str[j] !== "#") {
      j++;
    }

    let length = str.substring(i, j);
    str.substring(j + 1, j + 1 + length);
    i = j + 1 + length;
  }

  return result;
}

console.log(encodeAndDecode());
