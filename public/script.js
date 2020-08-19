var display = document.getElementById("display").innerHTML;
document.getElementById("display").innerHTML = "";

function backSpace() {
  if (
    document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 1
      ) == ">" ||
    document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 3
      ) == "p"
  ) {
    console.log(
      document
        .getElementById("display")
        .innerHTML.charAt(
          document.getElementById("display").innerHTML.length - 8
        )
    );
    if (
      document
        .getElementById("display")
        .innerHTML.charAt(
          document.getElementById("display").innerHTML.length - 1
        ) == ">"
    ) {
      if (
        document
          .getElementById("display")
          .innerHTML.charAt(
            document.getElementById("display").innerHTML.length - 8
          ) == ">"
      ) {
        document.getElementById("display").innerHTML = document
          .getElementById("display")
          .innerHTML.substring(
            0,
            document.getElementById("display").innerHTML.length - 12
          );
        console.log("number: 1");
      } else {
        var display = document.getElementById("display").innerHTML.split("");
        display.splice(
          document.getElementById("display").innerHTML.length - 7,
          1
        );
        console.log("number: 2");
        console.log(document.getElementById("display").innerHTML);
        document.getElementById("display").innerHTML = display.join("");
      }
    } else {
      console.log("number: 3");
      let number = document
        .getElementById("display")
        .innerHTML.charAt(
          document.getElementById("display").innerHTML.length - 8
        );
      console.log(number);
      if (
        document
          .getElementById("display")
          .innerHTML.charAt(
            document.getElementById("display").innerHTML.length - 10
          ) != ">"
      ) {
        console.log(
          document
            .getElementById("display")
            .innerHTML.charAt(
              document.getElementById("display").innerHTML.length - 10
            )
        );
        document.getElementById("display").innerHTML = document
          .getElementById("display")
          .innerHTML.substring(
            0,
            document.getElementById("display").innerHTML.length - 13
          );
      } else {
        var display = document.getElementById("display").innerHTML.split("");
        var digit = display.splice(
          document.getElementById("display").innerHTML.length - 9,
          2
        );
        document.getElementById("display").innerHTML = document
          .getElementById("display")
          .innerHTML.substring(
            0,
            document.getElementById("display").innerHTML.length - 14
          );
        number = digit.join("");
      }
      document.getElementById("display").innerHTML += number;
    }
  } else {
    console.log("number: 4");
    document.getElementById("display").innerHTML = document
      .getElementById("display")
      .innerHTML.substring(
        0,
        document.getElementById("display").innerHTML.length - 1
      );
  }
}

var operator = "";
var convert = "inches";
var symbol = [];
var values = [];
var currentValue = [];
var erase = false;

function converting(x) {
  convert = x;
  // values = [];
  if(values.length == 0){
    constructionCalc();
  }else{
    evaluateDisplay();
  }
}

function erased() {
  operator = "";
  if (erase == true) {
    document.getElementById("display").innerHTML = "";
    erase = false;
  }
}

function simplify(str) {
  var result = "",
    data = str.split("/"),
    numOne = Number(data[0]),
    numTwo = Number(data[1]);
  for (var i = Math.max(numOne, numTwo); i > 1; i--) {
    if (numOne % i == 0 && numTwo % i == 0) {
      numOne /= i;
      numTwo /= i;
    }
  }
  if (numTwo === 1) {
    result = numOne.toString();
  } else {
    result = `<sup>${numOne.toString()}</sup>&frasl;<sub>${numTwo.toString()}</sub>`;
  }
  return result;
}

function fraction(x) {
  if (
    document.getElementById("display").innerHTML.includes("sup") == true &&
    document.getElementById("display").innerHTML.includes("sub") == false &&
    x == "fraction"
  ) {
    let character = document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 14
      );
    var display = document.getElementById("display").innerHTML.split("");
    display.splice(document.getElementById("display").innerHTML.length - 14, 1);
    display.splice(
      document.getElementById("display").innerHTML.length - 9,
      0,
      character
    );
    if (character != "<") {
      document.getElementById("display").innerHTML = display.join("");
    }
  }
  if (
    document.getElementById("display").innerHTML.includes("sup") == true &&
    document.getElementById("display").innerHTML.includes("sub") == true &&
    x != "fraction"
  ) {
    var display = document.getElementById("display").innerHTML.split("");
    display.splice(
      document.getElementById("display").innerHTML.length - 6,
      0,
      x
    );
    document.getElementById("display").innerHTML = display.join("");
  }
  if (
    document.getElementById("display").innerHTML.includes("sup") == true &&
    document.getElementById("display").innerHTML.includes("sub") == false &&
    x != "fraction"
  ) {
    document.getElementById("display").innerHTML = `${
      document.getElementById("display").innerHTML
    }<sub>${x}</sub>`;
  }
  if (
    x == "fraction" &&
    document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 1
      ) != ">" &&
    document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 3
      ) != "p"
  ) {
    document.getElementById("display").innerHTML = `${document
      .getElementById("display")
      .innerHTML.substring(
        0,
        document.getElementById("display").innerHTML.length - 1
      )}<sup>${document
      .getElementById("display")
      .innerHTML.charAt(
        document.getElementById("display").innerHTML.length - 1
      )}</sup>&frasl;`;
  }
  if (
    document.getElementById("display").innerHTML.includes("sup") == false &&
    document.getElementById("display").innerHTML.includes("sub") == false &&
    x != "fraction"
  ) {
    document.getElementById("display").innerHTML += `${x}`;
  }
}

function evaluateDisplay() {
  var evaluated = eval(
    values
      .join("")
      .replace(/[+]$/g, "")
      .replace(/[-]$/g, "")
      .replace(/[*]$/g, "")
      .replace(/[/]$/g, "")
  );
  
  currentValue = evaluated;

  if (values.length == 3) {
    values = [];
    values.push(`(${evaluated})`);
    values.push(`${symbol}`);
    console.log(values);
  }
  var fraction = simplify(
    `${Math.trunc((evaluated % 1).toFixed(3) / 0.0625)}/16`
  );
  var inches = Math.trunc(evaluated % 12);
  var feet = Math.trunc(evaluated / 12);

  if (convert == "feet") {
    if (evaluated < 12) {
      if (Math.trunc((evaluated % 1).toFixed(3) / 0.0625) == 0) {
        console.log("1");
        document.getElementById("display").innerHTML = `${inches}"`;
      }
      if (inches != 0) {
        console.log("2");
        document.getElementById("display").innerHTML = `${inches}${fraction}"`;
      } else {
        document.getElementById("display").innerHTML = `${fraction}"`;
      }
    } else {
      if (inches == 0) {
        if (Math.trunc((evaluated % 1).toFixed(3) / 0.0625) == 0) {
          console.log("3");
          document.getElementById("display").innerHTML = `${feet}'`;
        } else {
          console.log("4");
          document.getElementById("display").innerHTML = `${feet}'${fraction}"`;
        }
      } else {
        if (Math.trunc((evaluated % 1).toFixed(3) / 0.0625) == 0) {
          console.log("5");
          document.getElementById("display").innerHTML = `${feet}'${inches}"`;
        } else {
          console.log("6");
          document.getElementById(
            "display"
          ).innerHTML = `${feet}'${inches}${fraction}"`;
        }
      }
    }
  }

  if (convert == "inches") {
    console.log(feet, inches, fraction);
    currentValue = evaluated;

    if (fraction == `0`) {
      document.getElementById("display").innerHTML = `${Math.trunc(
        evaluated
      )}"`;
      console.log(`It does equal zero`);
      console.log(fraction);
    }else{
        if(Math.trunc(evaluated) == "0"){
          console.log("hit");
        document.getElementById("display").innerHTML = `${fraction}"`;
      }else{
        console.log("two");
        document.getElementById("display").innerHTML = `${Math.trunc(
          evaluated
        )}${fraction}"`;
      }
    }
  }

  if (convert == "decimal") {
    document.getElementById("display").innerHTML = `${currentValue}`;
  }
}

function constructionCalc(x) {
  if (document.getElementById("display").innerHTML.length != 0) {
    var update = document
      .getElementById("display")
      .innerHTML.replace(/'/g, `*12+`)
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

    if (x == "symbols") {
      if (values.length == 2) {
        if (operator == "hit") {
          console.log("#1");
          values.splice(1, 1, symbol);
        }
        if (operator == "") {
          console.log("#2");
          values.push(`(${eval(update)})`);
        }
      }
      if (values.length == 1) {
        console.log("#3");
        values.push(`${symbol}`);
      }
      if (values.length == 0) {
        console.log("#4");
        values.push(`(${eval(update)})`);
        values.push(`${symbol}`);
      }
    } else {
      if (values.length != 3) {
        console.log("#5");
        values.push(`(${eval(update)})`);
      }
    }
    console.log(values);
    evaluateDisplay();
  } else {
    console.log("hello");
  }
}

function symbols(x) {
  erase = true;
  symbol = `${x}`;
  constructionCalc("symbols");
  operator = "hit";
}

function radio(x) {
  document.getElementById("inch").className = "digit";
  document.getElementById("ft").className = "digit";
  document.getElementById("dec").className = "digit";
  document.getElementById(x).className = "highlight";
}
