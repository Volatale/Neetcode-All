//* The function needs to be asynchronous by nature
//* Thus we use a combination of promises and setTimeout
//* setTimeout will invoke the callback after (at least) "millis" milliseconds have passed
async function sleep(millis) {
  return new Promise((res) => {
    setTimeout(() => {
      res("Finished!");
    }, millis);
  });
}
