//IIFE Immediately Invoked Function Expression
(function iife() {
const FACES = 6;
const MAX_ROLLS = 100;

function rollOnCommand() {
  const numOfDice = document.querySelector('.num-to-roll').value;
  let total = 0;
  for( rolls = 0; rolls < numOfDice; rolls++) {
    total += likeAD6();
  }
  document.querySelector('.result-rolled').innerText = total;
}

function rollALot() {
  const rolled = {};
  let rolls = 0;
  makeARoll( rolled, rolls);
}

function likeAD6() {
  return Math.floor(Math.random()*FACES) + 1
}

function makeARoll( rolled, rolls) {
  const num = likeAD6();
  rolled[num] = rolled[num] + 1 || 1;
  updatePage(rolled, rolls);
  rolls += 1;
  if( rolls < MAX_ROLLS ) {
    setTimeout( function() { makeARoll( rolled, rolls ) }, 100);
  }
}

function updatePage(rolled, rolls) {
  console.log(rolled);
  let output = '';
  for( let face = 1; face <= FACES; face++ ) {
    const chance = calcOdds( rolled[face], rolls );
    output += report( face, chance );
  }

  document.querySelector('.results').innerHTML = output;
}

function report( face, chance ) {
  console.log(`${face} was ${chance } of results`);
  return `
    <li>
      <span class='result'>${face}</span>
      <span class='chance'>${chance}</span>
    </li>
  `;
}

function calcOdds( numTimes, numTries ) {
  const chance = (( (numTimes / numTries) * 100) || 0).toFixed(2);
  return chance;
}

document.querySelector('.do-roll').addEventListener( 'click', rollOnCommand );

rollALot();

})();
