//* Use a set that stores strings to count the number of unique emails
//* A set automatically filters duplicates
//* Iterate over each individual email
//* Split the email into everything before the "@" and after (local vs domain)
//* Further split the local via a "+", this allows us to ignore everything AFTER the +
//* Replace every instance of "." with "" to ignore the ".", since we want to ignore those too
//* Add the unique string to the set
function uniqueEmails(emails) {
  const unique = new Set();

  for (let email of emails) {
    let [local, domain] = email.split("@");

    //* Take the first string ("test.email+alex".split("+") gives ["test.email", "alex")
    //* We "ignore" everything after the "+" by not using the value
    local = local.split("+")[0];
    local = local.replaceAll(".", ""); //* Erase every occurrence of ".", because we can ignore it

    unique.add(`${local}-${domain}`);
  }

  return unique.size;
}

console.log(
  uniqueEmails([
    "test.email+alex@leetcode.com", // testemail@leetcode.com
  ])
); // 1

console.log(
  uniqueEmails([
    "test.email+alex@leetcode.com", // testemail@leetcode.com
    "test.e.mail+bob.cathy@leetcode.com", // testemail@leetcode.com
    "testemail+david@lee.tcode.com", // testemail@lee.tcode.com //! Unique because neither rule applies to domain names
  ])
); // 2

console.log(
  uniqueEmails(["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"])
); // 3

//* Time: O(n * m) - It takes O(n) time to iterate through each individual email
//* It takes O(m) time to split, and we do that twice
//* Then it takes O(m) to replace all the occurrences of "." with ""
//* Its constant time to add the string to the unique set

//* Space: O(n) - The set's size scales with the number of UNIQUE email addresses post-processing
