const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');
let isCircleTurn;
const winningCombinations = [
  /* Primeira linha */
  [0, 1, 2],

  /* Segunda linha */
  [3, 4, 5],
  
  /* Terceira linha */
  [6, 7, 8],
  
  /* Primeira coluna */
  [0, 3, 6],
  
  /* Segunda coluna */
  [1, 4, 7],
  
  /* Terceira coluna */
  [2, 5, 8],
  
  /* Diagonal principal */
  [0, 4, 8],
  
  /* Diagonal secundária */
  [2, 4, 6]
];

const startGame = () => {
  isCircleTurn = false;
  
  for(const cell of cellElements){
    cell.classList.remove('x');
    cell.classList.remove('circle');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true});
  }


  setBoardHoverClass();
  winningMessageElement.classList.remove('show-winning-message');
}

const endGame = (isDraw) => {
  if(isDraw){
    winningMessageTextElement.innerText = 'Empate!';
  } else {
    winningMessageTextElement.innerText = isCircleTurn 
    ? 'O Venceu!' 
    : 'X Venceu!';
  }

  winningMessageElement.classList.add('show-winning-message');
}


const checkWin = (currentPlayer) => {
  /* Percorre todas as combinações de vitória */
  return winningCombinations.some((combination) => {
    /* Verifica se em cada index da combinação da lista contém a marca do jogador atual */
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

checkDraw = () => {
  
  return [...cellElements].every(cell => {
    
    /* Irá retornar se todas as células contém x ou circle */
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
  /* Pra não ser adicionado várias vezes as classes x ou o, vamos removê-las na mudança de turno */
  board.classList.remove('x');
  board.classList.remove('circle');

  if(isCircleTurn){
    board.classList.add('circle');
  } else {
    board.classList.add('x');
  }

}

const swipTurn = () => {
  /* isCircleTurn recebe o inverso que ele tinha */
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
}

const handleClick = (e) => {
  // Colocar a marca (x ou o)
  const cell = e.target;
  const classToAdd = isCircleTurn ? 'circle' : 'x';

  placeMark(cell, classToAdd);
  
  const isDraw = checkDraw();
  
  const isWin = checkWin(classToAdd);
  if(isWin){
    // Verificar vitória
    endGame(false);
  } else if (isDraw) {
    // Verificar empate
    endGame(true);
  } else{
    // Trocar jogador
    swipTurn();
  }

}

startGame();

restartButton.addEventListener('click', startGame);
