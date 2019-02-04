function useArguments() {
  var sum = 0,len = arguments.length;
  while(len--)
      sum += arguments[len];
   return sum;
}