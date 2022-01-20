
//Définiton des variables globales
let board = document.querySelector('.memory-game');
let new_game_button = document.getElementById('new_game_button');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairCount = 0;
let pairs;
let nmb_elem;
let interval

new_game_button.addEventListener('click', (e) => {
    new_game();
});

var new_game = () => {
    clearInterval(interval);
    var nb_row = document.getElementById('nb_row').value;
    var nb_col = document.getElementById('nb_col').value;
    var time = document.getElementById('time').value;

    pairs = nb_row * nb_col;

    if (pairs % 2 !== 0) {
        alert('Le nombre de cases n\'est pas paire !');
    }
    else {
        make_board(nb_row, nb_col);
        nmb_elem = document.querySelectorAll('.memory-card').length / 2
        interval = setInterval(function () {   
            time--
            document.querySelector('#chrono').innerHTML= 'Temps :' + time
            if(time === 0){
                board.innerHTML = 'tu as perdu, temps écoulé'
                pairCount=0;
                clearInterval(interval)
            } 
        },1000)
    }
};

var range = (start, end) => {
    var ary = [];
    for (let i = start; i <= end; i++) {
        ary.push(i);
        ary.push(i);
    }
    return ary;
}

var make_board = (nb_row, nb_col) => {
    board.innerHTML = '';
    let cells = range(0, (nb_row * nb_col / 2) -1);
    cells = cells.sort(() => 0.5 - Math.random());
    let index = 0;
    for (let i = 0; i < nb_row; i++) {
        const cardrow = document.createElement('div');
        for (let j = 0; j < nb_col; j++) {
            //Construction des éléments de la grille
            const card = document.createElement('div');
            let imageback = document.createElement('img');
            let imagefront = document.createElement('img');
            card.className = 'memory-card';
            const cell_number = cells[index];
            imageback.className = 'back-face';
            imagefront.className = 'front-face'
            imageback.src = `assets/img/cover.png`;
            imagefront.src = `assets/img/${cell_number}.png`;
            card.appendChild(imagefront);
            card.appendChild(imageback);

            //card.innerHTML = cell_number;
            card.setAttribute('data-number', cell_number);

            //On ajoute un event listener sur chaque cellule pour lancer un tour de jeu à chaque click du joueur
            card.addEventListener('click', flipCard);

            //Initialisation du tableau des valeurs de "coups joués"
            cardrow.appendChild(card);
            index++;
        }
        board.appendChild(cardrow);
    }
};

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip')

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;
    if(isMatch) {
        disableCards()
        pairCount++
        winCheck();
    }else {
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 1500);
}

function winCheck() {
    if(nmb_elem === pairCount){
        setTimeout (() => {
            board.innerHTML = 'Bien joue vous avez gagné! veuillez recommencer'
        },1500)
        clearInterval(interval)
        pairCount=0;
    }
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}