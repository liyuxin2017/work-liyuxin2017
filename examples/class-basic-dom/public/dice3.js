(function() { // IIFE

const ROLLS = 10000;
const FACES = 6;

const roll = function roll() {
  return Math.floor(Math.random() * FACES) + 1;
}

function rollNTimes( numOfDice, numOfRolls ) {
  const tally = {};
  for( let rollNum = 0; rollNum < numOfRolls; rollNum++) {
    let rollTotal = 0;
    for( let dieNum = 0; dieNum < numOfDice; dieNum++) {
      rollTotal += roll();
    }
    tally[rollTotal] = tally[rollTotal] ? tally[rollTotal] + 1 : 1;
  }
  return tally;
}

function formatRollData(tally, numOfRolls) {
  let output = '';
  const faces = Object.keys(tally).sort( (a,b) => a-b  );
  for( let face of faces ) {
    const percent = (100 * tally[face]/ROLLS).toFixed(1);
    output += `<li><span class="total">${face}</span> <span class="percent">${ percent }%</span></li>`
  }
  return `<ul>${output}</ul>`;
}

function doRolls(numOfDice) {
  const tally = rollNTimes(numOfDice, ROLLS);
  const htmlOutput = formatRollData(tally, ROLLS);
  return htmlOutput;
}


function updateRollOutput() {
  const numOfDice = document.querySelector('.num-of-dice').value;
  const output = doRolls(numOfDice);
  document.querySelector('#root').innerHTML = `${output}`;
}

document.querySelector('.roll').addEventListener('click', function(event) {
  updateRollOutput();
});

// setTimeout( updateRollOutput, 3000);
// function foo() {
// };

// const baz = (foo, bar) => {
//   console.log(foo);
// };

// foo => {
//   console.log(foo);
// }

// foo => foo*2;

// (foo, bar) => foo*bar;

// foo => bar => bar*2;


updateRollOutput();

window.dicey = {
  example: 'here'
};
})();
