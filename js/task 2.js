const digitCounts = function (k, n) {
    let array =[],t = 0;
    for(i = 0;i <= n;i++)
        array.push(i);
    let b = array.join('-');
    let g = b.split("");
    let len = g.length;
    while(len--){
        if(k == g[len])
        t++;
    }
    return t;
}
