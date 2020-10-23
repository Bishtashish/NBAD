const powSum3 = (firstParam, secondParam) =>
{
  var temp =0;
  for(let i=1;i<=firstParam;i+=1){
    temp+=Math.pow(i,secondParam);
                                  }
  return temp;
} 
 console.log(powSum3(10,3));
// returns 3025

function powSum1(firstParam, secondParam){
  var temp =0;
  for(let i=1;i<=firstParam;i+=1){
    temp+=Math.pow(i,secondParam);
                                  }
  return temp;
}
 console.log(powSum1(100,2));
// returns 338350

const powSum2 = function(firstParam, secondParam){
  var temp =0;
  for(let i=1;i<=firstParam;i+=1){
    temp+=Math.pow(i,secondParam);
                                  }
  return temp;
}
 console.log(powSum2(10,4));
// returns 25333


function getSameResult(f1,f2,n,p){
  return f1(n,p)==f2(n,p);
}
console.log(getSameResult(powSum1, powSum2, 100, 2));
// returns true
console.log(getSameResult(powSum1, powSum3, 10, 4));
// returns true
console.log(getSameResult(powSum2, powSum3, 10, 3));
// returns true