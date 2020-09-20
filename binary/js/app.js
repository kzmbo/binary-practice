const dropDownMenu1 = document.getElementById("selectFromConvert");
const convertFrom = document.getElementById("convert-from");
const goBtn = document.getElementById("go-btn");
const enterBtn = document.getElementById("enter-btn");
const ansBox1 = document.getElementById("ans-box1");
const ansBox2 = document.getElementById("ans-box2");
const ansContainer = document.getElementById("to-section");
const display = document.getElementById("display");
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");

goBtn.addEventListener("click", runEvent);
enterBtn.addEventListener("click", checkAns);


let decimalAns;
let binaryAns;
let hexAns;
let checkTrue;

function runEvent(){
    let selection = dropDownMenu1.value;
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value)
    switch (true) {
        case (selection === "decimal"):
            //console.log("Converting decimal to binary");
            let decimal = generateRandomNumber("decimal", min, max);
            decimalAns = decimal;
            break;
        case (selection === "binary"):
            console.log("Converting binary to decimal");
            let binary = generateRandomNumber("binary", min, max);
            binaryAns = binary;
            break;
        case (selection === "hexadecimal"):
            console.log("Converting hexadecimal to binary");
            let hex = generateRandomNumber("hexadecimal", min, max);
            hexAns = hex;
            break;
        default:
            break;
    }
    
}

function checkAns() {
    let selection =  dropDownMenu1.value;
    let input1 = ansBox1.value.toString();
    let input2 = ansBox2.value.toString();
    
    //for decimal
    let decimal = parseInt(binaryAns, 2).toString();
    let hex1 =  decimalAns.toString(16).toUpperCase()
    //end deciaml

    //for binary
    let hex2 = parseInt(binaryAns, 2).toString(16).toUpperCase();
    //end binary

    //for hex
    let binary2 = parseInt(hexAns, 16).toString(2);
    count2 = parseInt(binary2.length);
    for (let i = 0; i < 16 - count2; i++){
        binary2 = '0' + binary2;
    }

    let binary;


    binary = (decimalAns >>> 0).toString(2);
    count = parseInt(binary.length);
    for (let i = 0; i < 16 - count; i++){
        binary = '0' + binary;
    }

    switch (true) {
        case (selection === "decimal"):
            console.log(binary);
            console.log(decimalAns.toString(16));
            if(input1 === binary.toString() && input2 === hex1){
                console.log("right")
                checkTrue = true;
                display.id = "display-right";
                display.innerHTML = "<h1>Correct!</h1>"
                clearText();
            }else{
                ansBox1.value = "";
                ansBox2.value = "";
                display.innerHTML = "<h1>Incorrect...Check your answer</h1>"
                display.id = "display-wrong";
                setInterval(myTimer, 2000);
            }
            break;
        case (selection === "binary"):
            console.log(decimal);
            console.log(hex2);
            if(input1 === decimal && input2 === hex2){ 
                console.log("right")
                checkTrue = true;
                display.id = "display-right";
                display.innerHTML = "<h1>Correct!</h1>"
                clearText();
            }else{
                ansBox1.value = "";
                ansBox2.value = "";
                display.innerHTML = "<h1>Incorrect...Check your answer</h1>"
                display.id = "display-wrong";
                setInterval(myTimer, 2000);
            }
            break;
        case (selection === "hexadecimal"):
            console.log(binary2)
            console.log(parseInt(hexAns, 16).toString());
            if(input1 === binary2 && input2 === parseInt(hexAns, 16).toString()){
                console.log("right")
                checkTrue = true;
                display.id = "display-right";
                display.innerHTML = "<h1>Correct!</h1>"
                clearText();
            }else{
                ansBox1.value = "";
                ansBox2.value = "";
                display.innerHTML = "<h1>Incorrect...Check your answer</h1>"
                display.id = "display-wrong";
                setInterval(myTimer, 2000);
                
            }
            break;
        default:
            break;
    }
}

function clearText() {
    if(checkTrue){
        ansBox1.value = "";
        ansBox2.value = "";
    }

    checkTrue = false;

    setInterval(myTimer, 7000);
    
    runEvent();
}

function myTimer(){
    display.innerHTML = "";
    display.id = "display";
}


function generateRandomNumber(option, min, max){ 
    let decimalNum =  Math.floor(Math.random() * max + min);
    let hexString = decimalNum.toString(16); 
    let sixteenBitBinary = (decimalNum >>> 0).toString(2);
    let binary = sixteenBitBinary;
    let count = parseInt(binary.length);

    for (let i = 0; i < 16 - count; i++){
       sixteenBitBinary = '0' + sixteenBitBinary;
    }
   
    if(option === "binary"){
        convertFrom.innerHTML = `<h1>${sixteenBitBinary}</h1>`
        ansBox1.placeholder = "Type you answer in decimal";
        ansBox2.placeholder = "Type you answer in hexadecimal (Uppercase Letters & No Extra Zeros)";
        return sixteenBitBinary;
    }else if (option === "decimal"){
        ansBox1.placeholder = "Type you answer in binary (16-bit)";
        ansBox2.placeholder = "Type you answer in hexadecimal (Uppercase Letters & No Extra Zeros)";
        convertFrom.innerHTML = `<h1>${decimalNum}</h1>`
        return decimalNum;
    }else if (option === "hexadecimal"){
        ansBox1.placeholder = "Type you answer in binary (16-bit)";
        ansBox2.placeholder = "Type you answer in decimal";
        convertFrom.innerHTML = `<h1>${hexString.toUpperCase()}</h1>`
        return hexString.toUpperCase();
    }
    
}

function convertTwosCompBinary(test) {
    const arr = test.split("").reverse(); // Convert string to array and reverse it.
    
    let total = 0;
    const MSB = arr.length - 1;
    total += -1 * (2 * arr[MSB]) ** MSB;
    
    for (let i = 0; i < arr.length - 1; ++i) {
        total += ((arr[i] * 2) ** i); // Add other bits
    }
   
    return total.toString();
}

function unsignedToTwosComp(test) {
    const arr = test.split(''); // Turn string into array
    
    // Create a new array that stores the flipped bits
    const newArr = arr.map((element) => {
      if (element === '1') return '0';
      if (element === '0') return '1';
    });
    
    // Adding two parseInt(binary, 2) conveniently does the binary addition 
    // algorithm for us
    const binaryAdd = parseInt(newArr.join(''), 2) + parseInt('1', 2);
    let twosComp = binaryAdd.toString(2);
    
    if (twosComp.length < test.length) {
        // If leading zeros are omitted, add them back
        return twosComp.padStart(test.length, '0'); 
    }
    else if (twosComp.length > test.length) {
        // Remove carry-out from leftmost column
       twosComp = twosComp.split('');
       let temp = twosComp.shift(); // Remove first element
       return twosComp.join(''); // Return concatenated string array
    }
    
    return twosComp;
  }


function main(){
    runEvent();
    x = 1010;
    hexString = parseInt(x, 2).toString(16).toUpperCase();
    console.log(hexString);
}

main();
