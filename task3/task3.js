const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');


// Выбор вопросов
let questionNum = '';
do {
    let NumQuestion = Math.random().toString().slice(2, 3);

    if (questionNum.includes(NumQuestion)) {continue} // исключение повторяющихся вопросов
    else {questionNum += NumQuestion}
}
while (questionNum.length !== 5);

// Викторина

console.log('Викторина началась! Выбирайте 1 из 4-ёх ответов!');


let correctAnswer = 0;
let fin = 0;

for (let key in questionNum) {

    let path = `questions/${questionNum[key]}.txt`;

    fs.readFile(path, 'utf8',  (err, data) => {
        if (err) {
            console.error(err);
            return
        }


        let playerResponse =  readlineSync.question(
            ` ${data.split('\n')[0]}\n  1 - ${data.split('\n')[2]}\n  2 - ${data.split(
                '\n')[3]}\n  3 - ${data.split(
                '\n')[4]}\n  4 - ${data.split('\n')[5]}\n`
        );

        if (+data.split('\n')[1] === +playerResponse) {
            correctAnswer++;
        }
        fin++;
        if (fin === 5) {console.log(`Правильных ответов ${correctAnswer}`)}

    });
}





