"strict ";

const choices = {
  1: "rock",
  2: "paper",
  3: "scissor",
};

const compChoice = function () {
  const choice = Math.floor(Math.random() * 3 + 1);
  return choices[`${choice}`];
};

// Game Logic

const gameLogic = function (user, comp) {
  if (user === comp) return "draw";
  if (user === "rock" && comp === "paper") return "comp";
  if (user === "rock" && comp === "scissor") return "user";
  if (user === "paper" && comp === "rock") return "user";
  if (user === "paper" && comp === "scissor") return "comp";
  if (user === "scissor" && comp === "paper") return "user";
  if (user === "scissor" && comp === "rock") return "comp";
};

// Display winner

const renderWinner = function (winner) {
  if (winner === "draw") {
    console.log(`It's a draw`);
    return;
  }
  console.log(`${winner} is the winner`);
};

let play = {
  choice: true,
};
const game = function () {
  // Get computer choice
  let computer = compChoice();
  console.log(`AI choice ${computer}`);

  // Get user choice
  let userChoice = prompt("rock, paper or scissor?");
  console.log(`User choice ${userChoice}`);
  let winner = gameLogic(userChoice, computer);
  renderWinner(winner);
  play.choice = prompt("Play again");
};

while (play.choice) {
  game();
}
