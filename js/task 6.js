const intersection = function (nums1, nums2) {
    let arr = [];
    if(JSON.stringify(nums1) === '[]'||JSON.stringify(nums2) === '[]'){
    return arr;
    }else{
    arr = nums2.filter (function(v){ return nums1.indexOf(v) > -1 });
    var arr1 = [];
    for(let k = 0;k < arr.length;k++){
        if(arr1.indexOf(arr[k]) == -1){
            arr1.push(arr[k]);
        }
    }
    arr1.sort(function (x, y) {
        return x-y;
    });
    return arr1;
    }
}