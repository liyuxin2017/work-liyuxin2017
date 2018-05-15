function roll() {
  return Math.floor(Math.random() * 6) + 1;
}

const ROLLS = 10000;

const tally = [0,0,0,0,0,0];
for( let i = 0; i < ROLLS; i++) {
  const result = roll();
  tally[result-1] += 1;
}
let output = '';
tally.forEach( function( element ) {
  const percent = (100 * element/ROLLS).toFixed(1);
  output += `<li>${percent}%</li>`;
});
document.querySelector('#root ol').innerHTML = `${output}`;




