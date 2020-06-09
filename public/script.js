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
    if (value.includes(`+`) || value.includes(`-`)) {
      const calc = value.replace("x", ",").replace("-", ",").replace("+", ",");

      const split = calc.split(",");

      for (var i = 0; i < split.length; i++) {
        if (split[i].includes(`"`) || split[i].includes(`'`)) {
          var update = split[i]
            .replace(`'`, `*12+`)
            .replace(`&`, `+`)
            .replace(`"`, ``);

          revaluated.push(update);

          if (symbols[i] != undefined) {
            revaluated.push(symbols[i]);
          }
        } else {
          console.log("err: undefined value");
          revaluated.push("!");
        }
      }
    } else {
      console.log(value);
        var update = value
          .replace(`'`, `*12+`)
          .replace(`&`, `+`)
          .replace(`"`, ``);
        console.log(update.replace(`"`, ``).replace("++", "+"));
        revaluated.push(update.replace(`"`, ``).replace("++", "+"));

        if (symbols[i] != undefined) {
          revaluated.push(symbols[i]);
        }
      }
    
    console.log(Math.trunc((eval(revaluated.join("")) % 1).toFixed(3) / .0625));
    console.log(eval(revaluated.join("")));
    var fraction = `${Math.trunc((eval(revaluated.join("")) % 1).toFixed(3) / .0625)}/16`;
    var inches = Math.trunc(eval(revaluated.join(""))) % 12;
    var feet = Math.trunc(eval(revaluated.join("")) / 12);
    console.log((eval(revaluated.join("")) % 1).toFixed(2));

    if (eval(revaluated.join("").replace("++", "+")) < 12) {
      if (fraction == 0) {
        calculator.answer.value = `${inches}"`;
      } else {
        calculator.answer.value = `${inches}"${fraction}"`;
      }
    } else {
      if (inches == 0) {
        if (fraction == 0) {
          calculator.answer.value = `${feet}'`;
        } else {
          calculator.answer.value = `${feet}'&${fraction}"`;
        }
      } else {
        if (fraction == 0) {
          calculator.answer.value = `${feet}'${inches}"`;
        } else {
          calculator.answer.value = `${feet}' ${inches}&${fraction}"`;
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
