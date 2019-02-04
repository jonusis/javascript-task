const uniqueNums = (n) => {
  let arr = [];
  while(arr.length !== n) {
    let randomNum = Math.round(Math.random() * 30 + 2);
    if(arr.indexOf(randomNum) === -1) {
      arr.push(randomNum);
    }
  }
  return arr;
}