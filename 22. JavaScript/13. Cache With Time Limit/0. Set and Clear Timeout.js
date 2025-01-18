//* When setting keys, take advantage of setTimeout
//*     - We are given a "duration" when setting keys
//*         - After "duration" milliseconds pass, we delete the key
//*     - If the key already exists, then we clear the timer and re-set the key
class TimeLimitedCache {
  constructor() {
    //* Manually track the count of keys since we aren't using a Map
    this.cache = new Map();
  }

  set(key, value, duration) {
    const storedVal = this.cache.has(key);

    //* Cancel previous timeout
    if (storedVal) {
      clearTimeout(this.cache.get(key).timer);
    }

    //* Set the key, but delete it after "duration" ms using setTimeout
    this.cache.set(key, {
      value,
      timer: setTimeout(() => this.cache.delete(key), duration),
    });

    return storedVal;
  }

  get(key) {
    const val = this.cache.get(key);
    return val !== undefined ? val.value : -1;
  }

  count() {
    return this.cache.size;
  }
}
