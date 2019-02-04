const intersection = function (nums1, nums2) {
    let arr = [],
    len1 = nums1.length,
    len2 = nums2.length,
    k1 = k2 = 0;
    if(len1 === 0 || len2 === 0)
    return arr;
        nums1.sort((x,y) => {
            return x-y;
        });
        nums2.sort((x,y) => {
            return x-y;
        });
    while(k1 < len1||k2 <len2){
        if(nums1[k1] < nums2[k2]){
            k1++;
        }else if(nums1[k1] > nums2[k2]){
            k2++;
        }else{
            if(nums1[k1] === nums2[k2]){
            arr.push(nums1[k1]);
            }
            if(k1 < len1 - 1){
            k1++;
            }else{
                break;
            }
            if(k2 < len2 - 1){
            k2++;
            }else{
                break;
            }
        }
    }
    return arr;
}
