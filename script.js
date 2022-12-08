const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
let isCircleTurn;

const startGame = () => {
  for(const cell of cellElements){
    cell.addEventListener('click', handleClick, {once: true});
  }

  isCircleTurn = false;

  board.classList.add('x');

}

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
}

const swipTurn = () => {
  /* isCircleTurn recebe o inverso que ele tinha */
  isCircleTurn = !isCircleTurn;

  /* Pra não ser adicionado várias vezes as classes x ou o, vamos removê-las na mudança de turno */
  board.classList.remove('x');
  board.classList.remove('circle');

  if(isCircleTurn){
    board.classList.add('circle');
  } else {
    board.classList.add('x');
  }
}

const handleClick = (e) => {
  // Colocar a marca (x ou o)
  const cell = e.target;
  const classToAdd = isCircleTurn ? 'circle' : 'x';

  placeMark(cell, classToAdd);

  // Verificar vitória

  // Verificar empate

  // Trocar jogador
  swipTurn();
}

startGame();

