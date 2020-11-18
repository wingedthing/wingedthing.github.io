$(function(){
  $("#submit").on('click', function(){
    let $myform = $('#myform :input');
    let myvalue = $myform.val();
    $('#values').html(toIeee754(myvalue));
  });
});


function toIeee754(number) {
  let signBit = '0';
  let numStringArr = number.toString().split('.');
  let integral = numStringArr[0].split('');
  let fractional = '.' + numStringArr[1];
  
  if (integral[0] === '-'  ) {
    signBit = '1';
    integral.shift();
  }
integral = integral.join('');
let significand = getSignificand(fractional, integral);
let bias64 = 1023;
let exponent  = toIntegralBinary(integral).length - 1;
let exponentField = toIntegralBinary(exponent + bias64).join('');

return `${signBit} ${exponentField} ${significand}`;

 
}

function toIntegralBinary(possitiveInt) {
  let binary = [];
  let product = possitiveInt;
  while(product) {
    binary.unshift(product % 2);
    product = Math.floor(product / 2);
  }
  return binary;
}

function getSignificand(fracPartOfNum, integral) {
  let sigNum = toIntegralBinary(integral).slice(1);
  let loopLength = 52 - sigNum.length;
  let product = fracPartOfNum;
  let binaryFrac = [];
  for(let i = 0; i < loopLength; i++) {
    product = product * 2;
    if(product > 1){
      binaryFrac.push(1);
      product -= 1;
    }else if(product == 1) {
      product = 0;
      binaryFrac.push(1);
    }else {
      binaryFrac.push(0);
    } 
  }
  return sigNum.join('') + binaryFrac.join('');
}
 

