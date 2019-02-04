const unique = (arr) => {
  let arr1 = [],t;
  for(i = 0;i < arr.length;i++){
     arr1.push(arr[i]);
     for(let k = 0;k < arr1.length - 1;k++){
     if(arr[i] === arr1[k])
     arr1.pop();
     }
    }
  return arr1;
}