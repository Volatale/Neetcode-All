//* Valid emails consist of a "local" name and a "domain" name
//* In the email "sonic@greenhill.com":
//*     - "sonic" is the local name
//*     - "greenhill.com" is the domain name
//! If you add a periods (".") between characters in the local name:
//*     - mail sent there will be FORWARDED to the same address WITHOUT the dot
//*     - "sonic.g" and "sonicg" receive the SAME emails, in other words
//! If you add a plus ("+") between characters in the local name:
//*     - Anything AFTER the plus is IGNORED
//*     - An email sent to "sonic+knuckles@greenhill.com" will ACTUALLY be sent to "sonic@greenhill.com"
//! It is possible to use both rules at once (in the same email)

//* We need to return the number of different (unique) email addresses that "actually" receive emails
//* A (hash)set or a (hash)map work perfectly for this case
//*     - Neither will allow duplicates
//*     - The number of emails that actually get sent is equivalent to the size
//* Determine what email we're "actually" sending mail to, and then add that to the data structure
function numUniqueEmails(emails) {
  //* Tracks the emails that have actually received mail
  const unique = new Set();

  for (let email of emails) {
    //* The local and domain names are split via an "@"
    let [local, domain] = email.split("@");

    //* "." are essentially ignored in our case, so remove all of the "."
    //* And in the case of "+", remove everything AFTER the "+"
    local = local.replaceAll(".", "");
    local = local.split("+")[0];

    //* Keep track of the (processed) email
    unique.add(`${local}-${domain}`);
  }

  //* unique.size === no. of (unique) emails that received mail
  return unique.size;
}

console.log(numUniqueEmails(["test.email+alex@leetcode.com"])); //* 1

console.log(
  numUniqueEmails([
    "test.email+alex@leetcode.com", // testemail@leetcode.com
    "test.e.mail+bob.cathy@leetcode.com", // testemail@leetcode.com
    "testemail+david@lee.tcode.com", // testemail@lee.tcode.com
  ])
); //* 2

console.log(
  numUniqueEmails(["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"])
); //* 3
