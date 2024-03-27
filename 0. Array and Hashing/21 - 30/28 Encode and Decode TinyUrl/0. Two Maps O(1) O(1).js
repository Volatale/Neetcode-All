const encodeMap = new Map();
const decodeMap = new Map();
const baseUrl = "http://tinyurl.com/";

function encode(longUrl) {
  if (!encodeMap.has(longUrl)) {
    let length = encodeMap.size;

    let shortUrl = baseUrl + length + 1; //* "http://tinyurl.com/1"
    encodeMap.set(longUrl, shortUrl);
    decodeMap.set(shortUrl, longUrl);
  }

  return encodeMap.get(longUrl); //* Returns the shortUrl
}

function decode(shortUrl) {
  if (!decodeMap.has(shortUrl)) return undefined;

  return decodeMap.get(shortUrl); //* Returns the longUrl
}

//* Time: O(1) - Both methods take O(1) time to execute
//* It takes Θ(1) time on average to use .has()
