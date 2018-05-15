(() => { // IIFE to avoid polluting global namespace

  let count = 0;
  const boxes = [];

  const renderBoxes = () => {
    const root = document.querySelector('#demo-root');
    let output = '';
    boxes.forEach( ( box, index ) => {
      output += `
      <div class="added-box" data-position="${index}">
      <span class="left">&lt;</span>
      ${box.count}
      <span class="right">&gt;</span>
      </div>
      `;
    });
    root.innerHTML = output;
  };

  const shiftBox = event => {
    const target = event.target;
    if( target.classList.contains('left') ) {
      const toMove = target.closest('.added-box');
      const current = boxes[toMove.dataset.position];
      const swappingWith = boxes[toMove.dataset.position - 1];
      boxes.splice(toMove.dataset.position - 1, 2, current, swappingWith );
      renderBoxes();
    };
    if( target.classList.contains('right') ) {
      const toMove = target.closest('.added-box');
      const current = boxes[toMove.dataset.position];
      const swappingWith = boxes[+toMove.dataset.position + 1];
      boxes.splice(toMove.dataset.position, 2, swappingWith, current );
      renderBoxes();
    };
  };

  const addBoxToPage = () => {
    count += 1;
    boxes.push({ count });
    renderBoxes();
  };

  const attachHandlers = ( ) => {
    document.querySelector('.add').addEventListener('click', addBoxToPage);
    const root = document.querySelector('#demo-root');
    root.addEventListener('click', shiftBox);
  };

  attachHandlers();
})();
