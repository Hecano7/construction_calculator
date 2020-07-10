var display = document.getElementById('display').innerHTML;

function backSpace() {
  if(document.getElementById('display').innerHTML.charAt(document.getElementById('display').innerHTML.length - 1) == "/"){

  }else{
    document.getElementById('display').innerHTML = document.getElementById('display').innerHTML.substring(0, document.getElementById('display').innerHTML.length - 1);
  }
  console.log(document.getElementById('display').innerHTML);
};

var button = "inches";
var symbol = [];
var values = [];
var erase = false;

function erased(){
  if(erase == true){
    document.getElementById('display').innerHTML = "";
    erase = false;
  };
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
  console.log(evaluated);
  var fraction = `<sup>${Math.trunc(((evaluated) % 1).toFixed(3) / .0625)}</sup>&frasl;<sub>16</sub>`;
  var inches = Math.trunc(evaluated % 12) ;
  var feet = Math.trunc(evaluated / 12) ;

        console.log(feet);
  if(button == "feet"){
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
  if(button == "inches"){
    console.log(feet,inches,fraction);
    console.log(evaluated);
      if (fraction == `<sup>0</sup>&frasl;<sub>16</sub>`) {
        console.log("1");
        document.getElementById('display').innerHTML = `${Math.trunc(evaluated)}"`;
      } else {
        console.log("2");
        document.getElementById('display').innerHTML = `${Math.trunc(evaluated)}${fraction}"`;
      }
    }
  };

function constructionCalc(x) {
  if(values.length == 3){
    console.log("values length = 3");
    values.splice(0, 2);
  };

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
};

function symbols(x){
  erase = true;
  symbol = `${x}`;
  constructionCalc("symbols");
};
