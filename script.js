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
 * Receives the player's option.
 *
 * @returns The player's option.
 */
function getPlayerChoice () {
  const playerSelection = prompt('Your turn: rock, paper, scissors');

  // This check ensures that we have the required input before continuing any
  // further with execution.
  if (
    playerSelection === null ||
    playerSelection.trim() === '' ||
    !acceptedChoices.includes(playerSelection.toUpperCase())) {
    console.error(
      `Allowed options: ${acceptedChoices.join(', ')}. Try again!`
    );
    return null;
  }

  return playerSelection.trim().toUpperCase();
}

/**
 * Simulates a single round of the game.
 * @param {string} playerSelection The player's selection.
 * @param {string} computerSelection The computer's generated option.
 * @returns The player who wins the round. "computer", "player", or "tie".
 */
function playRound (playerSelection, computerSelection) {
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
    ? 'You won the challenge'
    : 'You lost the challenge';
}

/**
 * Simulates the rock, paper, scissors game.
 * @returns 0 on success, 1 otherwise.
 */
function playGame () {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 1; i <= 5; i++) {
    const computerSelection = getComputerChoice();
    const playerSelection = getPlayerChoice();

    if (playerSelection === null) {
      console.error("Invalid player option... Can't continue");
      return 1;
    }

    const result = playRound(playerSelection, computerSelection);
    if (result === 'computer') {
      console.log(
        `You Lose! ${computerSelection} beats ${playerSelection}`
      );
      computerScore++;
    } else if (result === 'player') {
      console.log(
        `You Win! ${playerSelection} beats ${computerSelection}`
      );
      playerScore++;
    } else {
      console.log("It's a tie");
    }

    console.log(
      `Round ${i} scores
        Computer: ${computerScore}.
        You: ${playerScore}.`
    );
  }

  console.log(announceWinner(playerScore, computerScore));

  return 0;
}

playGame();
