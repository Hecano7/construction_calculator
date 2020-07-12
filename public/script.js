

var display = document.getElementById('display').innerHTML;

function backSpace() {
  if(document.getElementById('display').innerHTML.charAt(document.getElementById('display').innerHTML.length - 1) == "/"){

  }else{
    document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0, document.getElementById('display').innerHTML.length - 1);
  }
  console.log(document.getElementById('display').innerHTML);
};

var convert = "inches";
var symbol = [];
var values = [];
var erase = false;

function converting(x){
 convert = x;
 values = [];
 constructionCalc();
};

function erased(){
  if(erase == true){
    document.getElementById('display').innerHTML = "";
    erase = false;
  };
};

function simplify(str) { 
  var result = '', data = str.split('/'),  
      numOne = Number(data[0]),  
      numTwo = Number(data[1]); 
  for (var i = Math.max(numOne, numTwo); i > 1; i--) { 
    if ((numOne % i == 0) && (numTwo % i == 0)) { 
        numOne /= i; 
        numTwo /= i; 
    } 
  } 
  if (numTwo === 1) { 
  result = numOne.toString() 
  } else { 
  result = `<sup>${numOne.toString()}</sup>&frasl;<sub>${numTwo.toString()}</sub>`
  } 
  return result 
}; 

function fraction(x){
  if(document.getElementById('display').innerHTML.includes('sup') && document.getElementById('display').innerHTML.includes('sub') == false){
    console.log(1);
    document.getElementById('display').innerHTML = `${document.getElementById('display').innerHTML}<sub>${x}</sub>`;
    console.log(document.getElementById('display').innerHTML);
  };
  if(x == 'fraction'){
    console.log(3);
    document.getElementById('display').innerHTML = `${document.getElementById('display').innerHTML.substring(0, document.getElementById('display').innerHTML.length - 1)}<sup>${document.getElementById('display').innerHTML.charAt(document.getElementById('display').innerHTML.length - 1)}</sup>&frasl;`;
    console.log(document.getElementById('display').innerHTML);
  };
  if(document.getElementById('display').innerHTML.includes('sup') == false && document.getElementById('display').innerHTML.includes('sub') == false){
    document.getElementById('display').innerHTML += `${x}`;
    console.log(2);
    console.log(document.getElementById('display').innerHTML);
  };
};

function evaluateDisplay(){
  var evaluated = eval(values.join("").replace(/[+]$/g, "").replace(/[-]$/g, "").replace(/[*]$/g, "").replace(/[/]$/g, ""));
  if(values.length == 3){
    values = [];
    values.push(`(${evaluated})`);
    values.push(symbol);
    console.log(values);
  };
  var fraction = simplify(`${Math.trunc(((evaluated) % 1).toFixed(3) / .0625)}/16`);
  var inches = Math.trunc(evaluated % 12) ;
  var feet = Math.trunc(evaluated / 12) ;

        console.log(feet);
  if(convert == "feet"){
      if ((evaluated) < 12) {
      if (Math.trunc(((evaluated) % 1).toFixed(3) / .0625) == 0) {
        console.log("1");
        document.getElementById('display').innerHTML = `${inches}"`;
      } else {
        console.log("2");
        document.getElementById('display').innerHTML = `${inches}${fraction}"`;
      }
    } else {
      if (inches == 0) {
        if (Math.trunc(((evaluated) % 1).toFixed(3) / .0625) == 0) {
          console.log("3");
          document.getElementById('display').innerHTML = `${feet}'`;
        } else {
          console.log("4");
          document.getElementById('display').innerHTML = `${feet}'${fraction}"`;
        }
      } else {
        if (Math.trunc(((evaluated) % 1).toFixed(3) / .0625) == 0) {
          console.log("5");
          document.getElementById('display').innerHTML = `${feet}'${inches}"`;
        } else {
          console.log("6");
          document.getElementById('display').innerHTML = `${feet}'${inches}${fraction}"`;
        }
      }
    }
  }
  if(convert == "inches"){
    console.log(feet,inches,fraction);
    console.log(evaluated);
      if (fraction == `0`) {
        console.log("1");
        document.getElementById('display').innerHTML = `${Math.trunc(evaluated)}"`;
      } else {
        console.log("2");
        document.getElementById('display').innerHTML = `${Math.trunc(evaluated)}${fraction}"`;
      }
    }
  if(convert == "decimal"){
    console.log(evaluated);
        document.getElementById('display').innerHTML = `${evaluated}`;
  };
}

function constructionCalc(x) {
  console.log(document.getElementById('display').innerHTML.length);
if(document.getElementById('display').innerHTML.length != 0){  

        var update = document.getElementById('display').innerHTML
        .replace(/'/g, `*12+`)
        .replace(/"/g, `+`)
        .replace(/[<][s][u][p][>]/g, `+`)
        .replace(/[<][/][s][u][p][>]/g, ``)
        .replace(/[<][s][u][b][>]/g, ``)
        .replace(/[<][/][s][u][b][>]/g, ``)
        .replace(/[⁄]/g, "/")
        .replace(/[+][/]/g, "/")
        .replace(/[+][*]/g, "*")
        .replace(/[+][+]/g, "+")
        .replace(/[+]$/g, "")
        .replace(/"$/g, "")
        .replace(/'$/g, "*12");

    if(x == "symbols"){
      if(values.length == 2){
        console.log("3");
        console.log(values.length);
        values.push(`(${eval(update)})`);
      };
      if(values.length == 1){
        console.log("2");
        values.push(`${symbol}`);
      };
      if(values.length == 0){
        console.log("1");
        values.push(`(${eval(update)})`);
        values.push(`${symbol}`);
      };
    }else{
      if(values.length != 3){
        values.push(`(${eval(update)})`);
      }
    };
        console.log(values);
        evaluateDisplay();
}else{console.log("hello")}
};

function symbols(x){
  erase = true;
  symbol = `${x}`;
  constructionCalc("symbols");
};

function radio(x){
  document.getElementById("inch").className = "digit";
  document.getElementById("ft").className = "digit";
  document.getElementById("dec").className = "digit";
  document.getElementById(x).className = "highlight";
}
