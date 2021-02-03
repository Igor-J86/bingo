const spinBtn = document.getElementById('bingoNumberBtn');
const playedNums = document.getElementById('playedNumbers');
const bingoNumSpinned = document.getElementById('bingoNumber');

const bingoNumbers = [];
const mixingNumbers = []
const min = 1;
const max = 75;

for (let i = min; i <= max; i++) {
    bingoNumbers.push(i);
    mixingNumbers.push(i);
}

mixNumbers(bingoNumbers);
mixNumbers(mixingNumbers);

function mixNumbers(arr) {
    for (let j = max - 1; j >= 0; j--) {
        let swapIndex = Math.floor(Math.random() * j);
        let tmp = arr[swapIndex];
        arr[swapIndex] = arr[j];
        arr[j] = tmp;
    }
}

spinBtn.addEventListener('click', spinNumbers);

function spinNumbers() {
    mixNumbers(mixingNumbers);
    let bingoNum = bingoNumbers[0];

    if(bingoNum !== undefined) {
        spinBtn.setAttribute('disabled','disabled');
        var i = 0;
        var intervalId = setInterval(function(){
            if(i === 20){
                clearInterval(intervalId);
            }
            bingoNumSpinned.innerHTML = '<span>' + mixingNumbers[i] + '</span>';
            i++;
        }, 100);

        setTimeout(function() {
            spinBtn.removeAttribute('disabled','disabled');
            bingoNumSpinned.innerHTML = '<span>' + bingoNum + '</span>';
            playedNums.innerHTML += '<span>' + bingoNum + '</span>';
        },2100);

        let num = bingoNumbers.indexOf(bingoNum);
        bingoNumbers.splice(num, 1);
    } else {
        alert('Ferdig! Tomt for tall..');
    }
}

