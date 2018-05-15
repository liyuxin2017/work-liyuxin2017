const ROLLS = 10000;
const FACES = 6;
const roll = function roll() {
  return Math.floor(Math.random() * FACES) + 1;
}


const tally = {};
for( let rollNum = 0; rollNum < ROLLS; rollNum++) {
  const result = roll();
  tally[result] = tally[result] ? tally[result] + 1 : 1;
}
let output = '';
for( let face = 1; face <= FACES; face++ ){
  const percent = (100 * tally[face]/ROLLS).toFixed(1);
  output += `<li>${ percent}%</li>`
}
document.querySelector('#root ol').innerHTML = `${output}`;




