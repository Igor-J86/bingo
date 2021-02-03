const board = document.getElementById('bingo');
const pickedNumbers = document.getElementById('pickedNumbers');

const rows = 3;
const cols = 5;
//const maxBingoVal = 75;

const minB = 1;
const minI = 16;
const minN = 31;
const minG = 46;
const minO = 61;

const maxB = 15;
const maxI = 30;
const maxN = 45;
const maxG = 60;
const maxO = 75;

let b = [];
let i = [];
let n = [];
let g = [];
let o = [];

let boardVals = [];
let clickedVals = [];

let arrays = [];

let bingoNum = 0;
let colNum = 0;

for(let i=0; i < rows; i++) {
    board.innerHTML += '<div class="row"></div>';
}

function makeArray(min,max,arr) {
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
}

function mixNumbers(arr) {
    for (let j = arr.length - 1; j >= 0; j--) {
        let swapIndex = Math.floor(Math.random() * j);
        let tmp = arr[swapIndex];
        arr[swapIndex] = arr[j];
        arr[j] = tmp;
    }
}

generateBoardNumbers();

arrays.forEach(mixNumbers);

let row = board.querySelectorAll('.row');
row.forEach(generateCells);

function generateBoardNumbers() {
    pushToArrays(minB,maxB,b);
    pushToArrays(minI,maxI,i);
    pushToArrays(minN,maxN,n);
    pushToArrays(minG,maxG,g);
    pushToArrays(minO,maxO,o);

    arrays.push(b);
    arrays.push(i);
    arrays.push(n);
    arrays.push(g);
    arrays.push(o);
}

function pushToArrays(min,max,array) {
    for(let h=min; h <= max; h++) {
        //bingoNum = Math.floor(Math.random() * (max-min + 1)) + min;
        array.push(h);
    }
   //console.log(max);
    //mixNumbers(max,array);

    //let checkArray = array.includes(bingoNum);
   // console.log(checkArray);

    /*if(!checkArray) {
       array.push(bingoNum);
       boardVals.push(bingoNum);
    } else {
        bingoNum = Math.floor(Math.random() * (max-min + 1)) + min;
        checkArray = array.includes(bingoNum);
        if(!checkArray) {
            array.push(bingoNum);
            boardVals.push(bingoNum);
        } else {
            bingoNum = Math.floor(Math.random() * (max-min + 1)) + min;
            array.push(bingoNum);
            boardVals.push(bingoNum);
        }
    }*/
}

let cell = board.querySelectorAll('.cell');
    cell.forEach(clickCell);

function clickCell(c) {
    c.addEventListener('click', clickFn);
}

function clickFn() {
        this.classList.toggle('clicked');

        if(this.classList.contains('clicked')) {
            let clickedNumber = this.querySelector('.clicked span').innerText;
            let checkClickedNumber = clickedVals.includes(parseInt(clickedNumber));
            if(!checkClickedNumber) {
                //console.log('Found');
                clickedVals.push(parseInt(clickedNumber));
                pickedNumbers.innerHTML += '<span id="number'+clickedNumber+'">'+clickedNumber+'</span>';
            }
        } else {
            let val = this.querySelector('span').innerText;
            let clk = clickedVals.indexOf(parseInt(val));
                clickedVals.splice(clk, 1);
            let deleteNumber = pickedNumbers.querySelector('#number'+val);
                deleteNumber.remove();
        }
        
        row.forEach(checkRows);

        /*let bingoRow = checkBingoFn(row);
        
        if(bingoRow) {
            alert('Bingo!');
        }*/
}


function checkBingoFn(r) {
    for(i = 0; i < r.length; i++) {
        let rowClicked = r[i].querySelectorAll('.cell.green');
        //console.log(r[i]);
        if(rowClicked.length === 5) {
            return true;
        } else {
            return false;
        }
    }
}

function checkRows(row) {
    let rowClicked = row.querySelectorAll('.clicked');
    for(r=0; r <= rowClicked.length; r++) {
        if(r === cols) {
            rowClicked.forEach(function(e) {
                e.classList.add('green');
                e.removeEventListener('click', clickFn);
            });
        }
    }
}

function generateCells(row) {
    row.innerHTML = '';
    for(j=0; j < cols; j++) {
        let num = random_item(arrays[j]);

        row.innerHTML += '<div class="cell"><span>'+num+'</span></div>';

        let idx = arrays[j].indexOf(num);
        arrays[j].splice(idx, 1);

    }
}

function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}

//console.log(arrays);