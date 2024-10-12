// User's initial balance
var balance = 100;
// Flag if the game has started
var apostando = 0;
// Amount of bet
var apost = 0;
// Profit from one successful hit
var profit = 0;
// Num of successful hits
var hits = 0;
// List of cell numbers that have been clicked
var cliques = [];
// Multiplier for hits' profit
var multiplc = [0,1.13, 1.35, 1.64, 2, 2.48, 3, 3.92, 5, 6.6, 8.8, 12, 16.8, 24.27, 36.41, 57.22, 95.37, 171.67, 343.35, 801.16, 2400, 12020];
// Array where the numbers of the cells with bombs will be stored
var bombas = [0, 0, 0, 0];

// Show balance
document.getElementById('value').innerHTML = balance

// Generate bombs
function gerarBomb() {
    // Generates integer number from 1 to 25
    let rand = 0;
    for (let i = 0; i < 4; i++) {
        // Make sure that all cell nums are unique
        while (bombas.includes(rand)) {
            rand = Math.floor(Math.random() * (26 - 1) + 1);
        }
        bombas[i] = rand;
        
    }
    // Sort array in ascending order
    bombas.sort(sortfunction);
}

// Sorts an array
function sortfunction(a, b){
    return (a - b) //array is sorted in ascending order
  }

// Makes the game field blurred or not
function blurs (value) {
    if (value == 1) {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'none');
    } else {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'blur(4px)');
    }

}

function max() {
    // Choosing the maximum bet
    apost = balance;
    document.getElementById('inp').value = apost;
}

function mid() {
    apost = (Math.round(balance/2))
    document.getElementById('inp').value = apost;
}

function make_bet() {
    // If the game has not started yet
     if (apostando == 0) {
        // Reset elements from last game and unblocks cells
        reset();
        // Get game bet from input field
        apost = document.querySelector('#inp').value
        // Check bet amount
        if (apost == '' || apost == 0) {
            alert("Нужно сделать ставку!")
        } else if (balance == 0) {
            alert("Твой баланс: " + balance + " - Пополните свой баланс!")
        }
        else if (apost > balance) {
            alert("Твой баланс: " + balance + ' Ставка не может быть больше, чем твой баланс, или меньше, чем 1')
        } else {
            // If the bet is correct
            balance = balance - apost;
            // Update balance (substract bet)
            document.getElementById('value').innerHTML = balance
            // Generate bombs
            gerarBomb()
            // Update bet input field
            document.getElementById('inp').value = 0;
            // Show the game title
            document.getElementById('alert').innerText = 'Игра начата. Ставка: ' + apost
            // Turn off blur
            blurs(1);
            // Flag that the game has started
            apostando = 1;
        }
    // If the game has already started
     } else if (apostando = 1){
        alert("Игра уже начата!")
        // Reset bet input field
        document.getElementById('inp').value = 0;
     }
}

function mudarBotao(cell_num) {
    // Check if cell is already clicked
    let has_clicked = cliques.includes(cell_num);
    if (has_clicked) {
        // If cell is clicked, do nothing
        return;
    }
    else {
    // Check if cell has bomb
    let has_bomb = bombas.includes(cell_num);
    if (has_bomb) {
        // Show bomb image
        document.getElementById('btJgImage' + cell_num).src = 'bomb.png'
        // Make button unclickable
        document.getElementById('btJg' + cell_num).disabled = true;
        // Show that user has lost
        // Откладываем выполнение alert, чтобы изменения успели отобразиться
        setTimeout(function() {
            alert('Ты проиграл!');
            // Block the game
            block_game();
        }, 100); // 100 миллисекунд
    }

    else {
        // Show diamond image
        document.getElementById('btJgImage' + cell_num).src = 'diamond.png'
        // Make button unclickable
        document.getElementById('btJg' + cell_num).disabled = true;
        // Add cell num to array of clicked cells
        cliques.push(cell_num);
        // Increase hit count
        hits ++;
        document.getElementById('hits').innerText = hits
        // Calculate profit
        profit = Math.round(apost * multiplc[hits])
        document.getElementById('profit').innerText = profit
    }

    }
}

function take() {
    // Check if the game has started
    if (apostando == 1) {
        // If user did not do anything
        if (hits <= 0) {
            alert("Чтобы забрать выигрыш нужно сделать хотя бы одно действие!")
        } else {
            // Update balance
            balance = balance + profit;
            // Show win and new balance
            document.querySelector('#alert').style.color = 'green'
            document.getElementById('alert').innerText = 'Ты выиграл ' + profit + ' голды!'
            document.getElementById('value').innerHTML = balance
            document.getElementById('btBet').innerText = 'Новая ставка'

            alert('Ты выиграл ' + profit + ' голды!');

            block_game();

            // Reset all game variables
            profit = 0;
            hits = 0;
            apostando = 0;
            bet = 0;
            bombas = [0, 0, 0, 0];
            cliques = [];
        }
    }
}

function reset() {
    // Reset visual elements of game
    document.getElementById('alert').innerText = 'Выберите ставку'
    document.getElementById('alert').style.color = 'white'
    document.getElementById('btBet').innerText = 'Ставка'
    document.getElementById('profit').innerText = ''
    document.getElementById('hits').innerText = 0

    // reset all game variables
    bet = 0;
    hits = 0;
    profit = 0;
    bombas = [0, 0, 0, 0];
    cliques = [];

    // Unblock cells
    for (let i = 1; i < 26; i++) {
        document.getElementById('btJg' + i).disabled = false
    }
}

function block_game() {
    // Reset visual elements of game
    document.getElementById('alert').innerText = 'Выберите ставку'
    document.getElementById('alert').style.color = 'white'
    document.getElementById('btBet').innerText = 'Ставка'
    document.getElementById('profit').innerText = ''
    document.getElementById('hits').innerText = 0

    // Make buttons unclickable and show default picture
    for (let i = 1; i < 26; i++) {
        document.getElementById('btJg' + i).disabled = true
        document.getElementById('btJgImage' + i).src = 'question.png'
    }

    // Add blur
    blurs(0);

    // Change flag of game
    apostando = 0
}