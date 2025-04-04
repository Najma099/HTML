
/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function rec(start, end, str) {
    if(start >= end) {
        return true;
    }
    if(str[start] == str[end]) {
        return rec(start + 1, end - 1, str);
    }
    else 
    {
        return false;
    }
}

function isPalindrome(str) {
    str = str.toLowerCase();
   return rec(0, str.length -1, str)
}
  
  module.exports = isPalindrome;
  