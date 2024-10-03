let score = 0;
let gameOn = false;
const buttonEle = document.getElementById('restart-btn');

const cardsArray = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

const designObj = {
  'A': '<i class="fa fa-star" aria-hidden="true"></i>',
  'B': '<i class="fa fa-heart" aria-hidden="true"></i>',
  'C': '<i class="fa fa-play" aria-hidden="true"></i>',
  'D': '<i class="fa fa-diamond" aria-hidden="true"></i>',
  'E': '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  'F': '<i class="fa fa-arrow-up" aria-hidden="true"></i>',
  'G': '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
  'H': '<i class="fa fa-arrow-down" aria-hidden="true"></i>',
};

let firstCard = null;
let secondCard = null;

// shuffle the initial cardsArray
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const front = document.createElement('div');
  front.classList.add('front');
  
  const back = document.createElement('div');
  back.classList.add('back');
  back.setAttribute("data-value",cardValue);
  back.innerHTML = designObj[cardValue];

  card.appendChild(front);
  card.appendChild(back);
  
  card.addEventListener('click', flipIt);
  
  return card;
}

// flip the cards 
function flipIt() {
  if (gameOn || this === firstCard) return;
  this.classList.toggle('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  isMatching();

  if (score===8){
    setTimeout(() => {
      alert("Congrats You've WON,Click Restart to Play Again");
      buttonEle.classList.add('game-over');
    }, 500);
  }
}

// find if selected cards match 
function isMatching() {
  gameOn = true;
  const firstValue = firstCard.querySelector('.back').dataset.value;
  const secondValue = secondCard.querySelector('.back').dataset.value;

  if (firstValue === secondValue) {
    score += 1
    firstCard.removeEventListener('click', flipIt);
    secondCard.removeEventListener('click', flipIt);
    resetCards();
    return;
  }

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetCards();
  }, 1000);
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  gameOn = false;
}

// Start the game 
function startGame() {
  buttonEle.classList.remove('game-over');
  const shuffledCards = shuffle(cardsArray);
  let mainGameEle = document.querySelector("#main");
  shuffledCards.forEach(cardValue => {
    const card = createCard(cardValue);
    mainGameEle.appendChild(card);
  });
}

//  restart the game 
buttonEle.addEventListener('click', () => {
  document.getElementById('main').innerHTML = '';
  score = 0;
  startGame();
});

startGame();
