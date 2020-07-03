var input_field = "";
var select = ["Width","Bars","Spaces","Frame"];
var counter = 0;
var radio = 0;

function keyboard(x) {
  input_field = x;
  var keyboard = document.getElementById("calc-contain");
  keyboard.style.visibility = "visible";
  keyboard.style.zIndex = "1";
};

function inputValues(x){
  document.getElementById(input_field).value += x;
  document.getElementById(input_field).focus();
};

function backSpace() {
  document.getElementById(input_field).value = document.getElementById(input_field).value.substring(0, document.getElementById(input_field).value.length - 1);
  document.getElementById(input_field).focus();
};

function cleared(){
  document.getElementById(input_field).value = '';
  document.getElementById(input_field).focus();
};

function cursor(x){
  document.getElementById(input_field).focus();
  var position = document.getElementById(input_field).selectionStart + x;
  if (typeof document.getElementById(input_field).selectionStart == "number") {
    document.getElementById(input_field).setSelectionRange(position,position);
  };
};

function next(){
  if(counter < 3){
    counter ++;
  }else{
    counter = 0;
  };
  document.getElementById(select[counter]).focus();
  input_field = select[counter];
};

function spacedWidth(space){
  var fraction = `${Math.trunc((space % 1).toFixed(3) / .0625)}/16`;
  var inches = Math.trunc(space) % 12;
  var feet = Math.trunc(space / 12);

  console.log(Math.trunc((space % 1).toFixed(3) / .0625));

  if (space < 12) {
    if (fraction == "0/16") {
      alert(`${inches}"`);
    } else {
      alert(`${inches}"${fraction}"`);
    }
  } else {
    if (inches == 0) {
      if (fraction == "0/16") {
        alert(`${feet}'`);
      } else {
        alert(`${feet}'${fraction}"`);
      }
    } else {
      if (fraction == "0/16") {
        alert(`${feet}'${inches}"`);
      } else {
        alert(`${feet}'${inches}"${fraction}"`);
      }
    }
  }
  prompt();
};

function calculate(x){
  var keyboard = document.getElementById("calc-contain");
  keyboard.style.visibility = "hidden";
  keyboard.style.zIndex = "-1";

  var input1 = eval(document.getElementById("Width").value.replace(/'/g, `*12+`).replace(/"/g, `+`).replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/").replace(/[+][)]/g, ")").replace(/[+]$/g, ""));
  var input2 = eval(document.getElementById("Bars").value.replace(/'/g, `*12+`).replace(/"/g, `+`).replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/").replace(/[+][)]/g, ")").replace(/[+]$/g, ""));
  var input3 = eval(document.getElementById("Spaces").value.replace(/'/g, `*12+`).replace(/"/g, `+`).replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/").replace(/[+][)]/g, ")").replace(/[+]$/g, ""));
  var input4 = eval(document.getElementById("Frame").value.replace(/'/g, `*12+`).replace(/"/g, `+`).replace(/[+][+]/g, "+").replace(/[+][*]/g, "*").replace(/[+][/]/g, "/").replace(/[+][)]/g, ")").replace(/[+]$/g, ""));

  console.log(input3);
  var bars = (input1 / (input3 + (input2 / 2))) - 1;

  var barsSecondOption = 0;

  if(bars == Math.floor(bars)){
    barsSecondOption = "whole";
  }else{
    barsSecondOption = Math.floor(bars);
  };

  if(barsSecondOption != "whole"){
    if(bars < barsSecondOption){
      bars = barsSecondOption - 1;
    }else{
      bars = barsSecondOption + 1;
    }
  };

  var oneth = (1 / input1).toFixed(5) * 100;

  document.getElementsByClassName("wrapper")[0].style.gridGap = `${oneth * input2}%`;

  document.getElementsByClassName("frame")[0].style.padding = `${oneth * input4}%`;

  console.log(input1,input2,input3,input4);

  if(barsSecondOption != "whole"){
    document.getElementsByClassName("radio")[0].style.visibility = "visible";

    document.getElementById('bar').innerHTML = `${bars} bars`; 
    document.getElementById('bar1').value = bars; 
    // document.getElementById('bar1').checked = "true"; 
    document.getElementById('bars').innerHTML = `${barsSecondOption} bars`; 
    document.getElementById('bar2').value = barsSecondOption; 

    const rbs = document.querySelectorAll('input[name="bar"]');
            let selectedValue;
            for (const rb of rbs) {
                if (rb.checked) {
                    selectedValue = rb.value;
                    break;
                }
            }
            console.log(selectedValue);
            radio = parseInt(selectedValue);
  }else{
    document.getElementsByClassName("radio")[0].style.visibility = "hidden";
  };

  if(x != undefined){
    radio = x;
    bars = x;
  }

  var gaps = document.getElementById("gaps");
    gaps.innerHTML = '';

  for(var i = 0; i < bars + 1; i++){
    var innerDiv = document.createElement('div');
    gaps.appendChild(innerDiv);
  }
  
  var space = (input1 - radio) / (radio + 1);
  spacedWidth(space);
}

function trigger(){
  const rbs = document.querySelectorAll('input[name="bar"]');
  let selectedValue;
  for (const rb of rbs) {
      if (rb.checked) {
          selectedValue = rb.value;
          break;
      }
  }
  calculate(parseInt(selectedValue));
  prompt();
};

function prompt(text,listings){
  var prompt = document.getElementById("prompt");
  var span = document.getElementsByClassName("close1")[0];
  var string = document.getElementById("text");
  string.innerHTML = text;
  prompt.style.display = "block";
  span.onclick = function() {
    prompt.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == prompt) {
      prompt.style.display = "none";
    }
  }
  if(listings){
    document.getElementById("listings").style.display = "block";
  }
}
