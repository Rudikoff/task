const readlineSync = require('readline-sync');

let game = true;

// персонажи
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 0
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 0
        },
    ]
};
const player = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 0
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 0
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 0
        },
    ]
};

// Выбор сложности
const difficult = readlineSync.question(
    'select the difficulty level: \n  1 - easy (15hp)\n  2 - normal (10hp)\n  3 - hard (5hp)\n'
);
if (+difficult === 1) player.maxHealth = 15;
if (+difficult === 2) player.maxHealth = 10;
if (+difficult === 3) player.maxHealth = 5;

//-----------------
console.log('ДА СВЕРШИТЬСЯ ВЕЛИКАЯ БИТВА!');


// Выбор атаки Лютого
let selectMonsterShot;
let monsterAttack;

function attackMonster() {
    selectMonsterShot = Math.random().toString().slice(2,3);

    if (+selectMonsterShot <=3) { monster.moves[1].cooldown -= 1; monster.moves[2].cooldown -= 1; monsterAttack = monster.moves[0]; }
    else if (+selectMonsterShot > 3 && +selectMonsterShot <= 6 && monster.moves[1].cooldown <= 0) { monster.moves[1].cooldown = 4; monster.moves[1].cooldown -= 1; monster.moves[2].cooldown -= 1; monsterAttack = monster.moves[1];}
    else if (+selectMonsterShot > 6 && monster.moves[2].cooldown <= 0) {monster.moves[2].cooldown = 3;  monster.moves[1].cooldown -= 1; monster.moves[2].cooldown -= 1; monsterAttack = monster.moves[2];}
    else {attackMonster()}

}

// Выбор атаки персонажа
let selectPlayerShot;
let playerAttack;

function attackPlayer() {
    selectPlayerShot = readlineSync.question(
        'Select you attack: \n  1 - Ygap 6oeBbIM kaguJIoM\n  2 - Bepmywka JIeBou n9mkou\n  3 - KaHoHu4HbIu qoym6oJI\n  4 - Maru4eckuu 6JIok\n'
    );


    if (+selectPlayerShot === 1) { player.moves[1].cooldown -= 1; player.moves[2].cooldown -= 1; player.moves[3].cooldown -= 1; playerAttack = player.moves[0] }
    else if (+selectPlayerShot === 2 && player.moves[1].cooldown <= 0) { player.moves[1].cooldown = 4; player.moves[2].cooldown -= 1; player.moves[3].cooldown -= 1;  playerAttack = player.moves[1];}
    else if (+selectPlayerShot === 3 && player.moves[2].cooldown <= 0) { player.moves[2].cooldown = 3; player.moves[1].cooldown -= 1; player.moves[3].cooldown -= 1; playerAttack = player.moves[2];}
    else if (+selectPlayerShot === 4 && player.moves[3].cooldown <= 0) { player.moves[3].cooldown = 4; player.moves[1].cooldown -= 1; player.moves[2].cooldown -= 1; playerAttack = player.moves[3];}
    else {console.log('Выбранная атака ещё не перезарядилась!'); attackPlayer();}

}

// Бой

function fight(playerAttack, monsterAttack) {
    console.log(`Лютый совершает ${monsterAttack.name}, Евстасий наносит ${playerAttack.name}`);
    player.maxHealth = player.maxHealth - (monsterAttack.physicalDmg - ((monsterAttack.physicalDmg/100) * playerAttack.physicArmorPercents))- (monsterAttack.magicDmg - ((monsterAttack.magicDmg/100) * playerAttack.magicArmorPercents));
    monster.maxHealth = monster.maxHealth - (playerAttack.physicalDmg - ((playerAttack.physicalDmg/100) * monsterAttack.physicArmorPercents))- (playerAttack.magicDmg - ((playerAttack.magicDmg/100) * monsterAttack.magicArmorPercents));
    console.log(`У Лютого осталось ${monster.maxHealth} hp, у Евстасия ${player.maxHealth} hp`);
}

// Игра

while(game){
    attackMonster();
    attackPlayer();
    fight(playerAttack, monsterAttack);
    if (monster.maxHealth <=0 && player.maxHealth > 0) {console.log('Вы победили!'); game = false}
    if (monster.maxHealth > 0 && player.maxHealth <= 0) {console.log('Вы проиграли!'); game = false}
    if (monster.maxHealth <= 0 && player.maxHealth <= 0) {console.log('Ничья!'); game = false}
}



