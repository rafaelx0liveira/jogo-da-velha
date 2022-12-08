const cellElements = document.querySelectorAll('[data-cell]');

for(const cell of cellElements){
    cell.addEventListener('click', handleClick, {once: true});
}

const handleClick = () => {
  // Colocar a marca (x ou o)

  // Verificar vitória

  // Verificar empate

  // Trocar jogador
}