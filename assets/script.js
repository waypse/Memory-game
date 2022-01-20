var board = document.querySelector('.memory-game');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardArray = [];
var new_game_button = document.getElementById('new_game_button');

new_game_button.addEventListener('click', (e) => {
    new_game();
});

var new_game = () => {
    let nb_row = document.getElementById('nb_row').value;
    let nb_col = document.getElementById('nb_col').value;

    let size = nb_row * nb_col;

    if (size % 2 !== 0) {
        alert('Le nombre de cases n\'est pas paire !');
    }
    else {
        make_board(nb_row, nb_col);
    }
};

var make_board = (nb_row, nb_col) => {
  board.innerHTML = '';
  for (let x = 0; x < nb_row; x++) {
      let cardrow = document.createElement('div');
      for (let y = 0; y < nb_col; y++) {
          let card = document.createElement('div');
          let imageback = document.createElement('img');
          let imagefront = document.createElement('img');

          imageback.className = 'back-face';
          card.className = 'memory-card';
          imagefront.className = 'front-face'
          imageback.setAttribute('src', `assets/img/cover.png`)

          cardArray.push(card);

          card.appendChild(imageback);
          card.appendChild(imagefront);

          cardrow.appendChild(card);

          for(i=0; i<cardArray.length/2 ; i++) {
            imagefront.setAttribute('src', `assets/img/${i}.png`)
            card.setAttribute('data-image', i)
          }
      }
      board.appendChild(cardrow);
  }
};

