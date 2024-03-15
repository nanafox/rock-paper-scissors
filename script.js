const acceptedChoices = ['ROCK', 'PAPER', 'SCISSORS'];

/**
 * Generates a random option for the computer.
 *
 * @returns A random option for the computer
 */
function getComputerChoice () {
  return acceptedChoices[
    (Math.floor(Math.random() * acceptedChoices.length))
  ];
}

/**
 * Simulates a single round of the game.
 * @param {string} playerSelection The player's selection.
 * @param {string} computerSelection The computer's generated option.
 * @returns The player who wins the round. "computer", "player", or "tie".
 */
function playRound (playerSelection, computerSelection) {
  runningScore.innerHTML = `Round ${++round}`;

  if (computerSelection === playerSelection) { return 'tie'; }

  if (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') {
    return 'computer';
  }

  if (computerSelection === 'PAPER' && playerSelection === 'ROCK') {
    return 'computer';
  }

  if (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') {
    return 'computer';
  }

  // the player won the round
  return 'player';
}

function announceWinner (playerScore, computerScore) {
  if (playerScore === computerScore) { return "No one won. It's a tie"; }

  return (playerScore > computerScore)
    ? 'You won the challenge :)'
    : 'You lost the challenge :(';
}

/**
 * Simulates the rock, paper, scissors game.
 * @returns 0 on success, 1 otherwise.
 */
function playGame (playerSelection) {
  const computerSelection = getComputerChoice();

  const result = playRound(playerSelection, computerSelection);
  if (result === 'computer') {
    para.innerText = `You Lose! ${computerSelection} beats ${playerSelection}`;
    computerScore++;
  } else if (result === 'player') {
    para.innerText = `You Win! ${playerSelection} beats ${computerSelection}`;
    playerScore++;
  } else {
    para.innerText = "It's a tie";
  }

  runningScore.innerText +=
    `\nComputer: ${computerScore}.\nYou: ${playerScore}.`;

  if (playerScore === 5 || computerScore === 5) {
    winner.innerText = announceWinner(playerScore, computerScore);

    if (winner.innerText.includes('lost')) {
      winner.classList.add('lost');
    } else {
      winner.classList.add('won');
    }

    results.append(winner);
    para.remove();
    runningScore.remove();
    round = playerScore = computerScore = 0;
  } else {
    winner.classList.remove('lost', 'won');
    winner.remove();
    results.append(runningScore, para);
  }
}

//
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playGame(button.value.toUpperCase());
  });
});

let playerScore = 0;
let computerScore = 0;
let round = 0;

const container = document.querySelector('.container');

// a div to hold the contents of the results while playing
const results = document.createElement('div');
results.classList = 'results center-text';
results.innerText = 'Results';
container.append(results);

const para = document.createElement('p');
para.setAttribute('class', 'center-text');
para.id = 'outcome';

const runningScore = document.createElement('p');
runningScore.setAttribute('class', 'center-text score');

const winner = document.createElement('p');
winner.setAttribute('class', 'center-text winner');
