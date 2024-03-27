class Codec {
  constructor() {
    this.encodeMap = new Map();
    this.decodeMap = new Map();
    this.baseUrl = "http://tinyurl.com/"; //* Append the encoded URL to this
  }

  //* If the longUrl doesn't already exist, add it
  encode(longUrl) {
    if (!this.encodeMap.has(longUrl)) {
      let length = this.encodeMap.size;

      let shortUrl = this.baseUrl + length + 1; //* "http://tinyurl.com/01"
      this.encodeMap.set(longUrl, shortUrl);
      this.decodeMap.set(shortUrl, longUrl);
    }

    return this.encodeMap.get(longUrl); //* Returns the shortUrl
  }

  //* Return the longUrl
  decode(shortUrl) {
    if (!this.decodeMap.has(shortUrl)) return undefined;

    return this.decodeMap.get(shortUrl); //* Returns the longUrl
  }
}

const cache = new Solution();

cache.encode("http://leetcode.com/problems/design-tinyurl"); //* http://tinyurl.com/01
console.log(cache.decode("http://tinyurl.com/01")); //* http://leetcode.com/problems/design-tinyurl
