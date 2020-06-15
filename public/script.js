function backSpace() {
  calculator.answer.value = calculator.answer.value.substring(0, calculator.answer.value.length - 1);
}

function constructionCalc() {
  const value = calculator.answer.value;
  const revaluated = [];
  var copy = value;
  var symbols = [];

  for (var i = 0; i < copy.length; i++) {
    if (copy[i] == "+") {
      symbols.push(copy[i]);
    }
    if (copy[i] == "-") {
      symbols.push(copy[i]);
    }
    if (copy[i] == "*") {
      symbols.push(copy[i]);
    }
    // if (copy[i] == "/") {
    //   symbols.push(copy[i]);
    // }
  }

  if (value.includes(`'`) || value.includes(`"`) || value.includes(`&`)) {
      console.log(value);
        var update = value
        .replace(/'/g, `*12+`)
        .replace(/&/g, `+`)
        .replace(/"/g, ``);
        console.log(update.replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/"));
        revaluated.push(update.replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/"));
      
    console.log(Math.trunc((eval(revaluated.join("")) % 1).toFixed(3) / .0625));
    console.log(eval(revaluated.join("")));
    var fraction = `${Math.trunc((eval(revaluated.join("")) % 1).toFixed(3) / .0625)}/16`;
    var inches = Math.trunc(eval(revaluated.join(""))) % 12;
    var feet = Math.trunc(eval(revaluated.join("")) / 12);
    console.log((eval(revaluated.join("")) % 1).toFixed(2));

    if (eval(revaluated.join("")) < 12) {
      if (fraction == "0/16") {
        console.log("1");
        calculator.answer.value = `(${inches}")`;
      } else {
        console.log("2");
        calculator.answer.value = `(${inches}"&${fraction}")`;
      }
    } else {
      if (inches == 0) {
        if (fraction == "0/16") {
          console.log("3");
          calculator.answer.value = `(${feet}')`;
        } else {
          console.log("4");
          calculator.answer.value = `(${feet}'&${fraction}")`;
        }
      } else {
        if (fraction == "0/16") {
          console.log("5");
          calculator.answer.value = `(${feet}'${inches}")`;
        } else {
          console.log("6");
          calculator.answer.value = `(${feet}'${inches}"&${fraction}")`;
        }
      }
    }
  } else {
    calculator.answer.value = eval(calculator.answer.value);
  }
  // console.log(Math.trunc(eval(revaluated.join(""))) % 12);
}
// 6649044331
// onclick="calculator.answer.value = eval(calculator.answer.value)"
