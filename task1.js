const readlineSync = require('readline-sync');

console.log ('Игра началась, у Вас 3 попытки, чтобы угадать число');


let randomNum = Math.random().toString().slice(2,5);;


let sumCorrectNumOnPosition = 0, correctNumOnPosition = '', sumNotCorrectNumOnPosition = 0, NotCorrectNumOnPosition = '';
let round = 1;
let end = false;


function game() {
    round += 1;
    const userNum = readlineSync.question('Input you num: ');
    if (randomNum === userNum) {console.log('Все числа совпали, Вы молодец'); end = true; return}
    else {
        for (let i = 0; i < randomNum.length; i++) {
            if (userNum[i] === randomNum[i]) {
                sumCorrectNumOnPosition += 1;
                correctNumOnPosition += userNum[i];
            }
            else if (userNum[i] !== randomNum[i] && randomNum.includes(userNum[i])) {
                sumNotCorrectNumOnPosition += 1;
                NotCorrectNumOnPosition += userNum[i];
            }
        }
    }
    console.log(`На своём месте ${sumCorrectNumOnPosition} чисел (${correctNumOnPosition}); не на своём месте ${sumNotCorrectNumOnPosition} чисел (${NotCorrectNumOnPosition})`);
    sumCorrectNumOnPosition = 0; correctNumOnPosition = ''; sumNotCorrectNumOnPosition = 0; NotCorrectNumOnPosition = '';
    if (round === 4) {
        end = true;
        console.log("Вы проиграли, число было " + randomNum);

    }
}

do {
    game()
}
while (end === false);















