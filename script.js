"strict ";

const userChoiceBtn = document.querySelector(".user-options");
const rockUI = document.querySelector(".rock");
const paperUI = document.querySelector(".paper");
const scissorUI = document.querySelector(".scissor");
const resultWindow = document.querySelector(".result-window");
const optionText = document.querySelectorAll(".option-text");
const userChoiceText = document.querySelector(".user-choice-text");
const userResultImage = document.querySelector(".user-result-image");
const compChoiceText = document.querySelector(".comp-choice-text");
const compResultImage = document.querySelector(".comp-result-image");
const resultUserText = document.querySelector(".result-text-user");
const resultCompText = document.querySelector(".result-text-comp");
const userResultDiv = document.querySelector(".left");
const compResultDiv = document.querySelector(".right");
const userScore = document.querySelector(".user-score");
const compScore = document.querySelector(".comp-score");
const dog = document.querySelector(".dog");

let user;
let comp;
let winner;
let gameStatus = true;
let dogPosition = 0;

let score = {
  user: 0,
  comp: 0,
};

const handImages = {
  rock: "./img/rock.png",
  paper: "./img/paper.png",
  scissor: "./img/scissor.png",
};

const choices = {
  1: "rock",
  2: "paper",
  3: "scissor",
};

const compChoice = function () {
  const choice = Math.floor(Math.random() * 3 + 1);
  return choices[`${choice}`];
};

const updateUI = function (sec) {
  rockUI.classList.toggle("animate-1");
  paperUI.classList.toggle("animate-2");
  scissorUI.classList.toggle("animate-3");
  optionText.forEach((item) => item.classList.toggle("animate-text2"));

  setTimeout(function () {
    userChoiceBtn.classList.toggle("inactive");
    resultWindow.classList.toggle("inactive");
  }, sec);
};

// Update UI for User choice
const userHand = function (hand) {
  userResultImage.src = `./img/${hand}.png`;
  userChoiceText.textContent = `Player choose ${user}`;
};

// Update UI for comp choice
const compHand = function () {
  comp = compChoice();
  compResultImage.src = `./img/${comp}.png`;
  compChoiceText.textContent = `Computer choose ${comp}`;
};

// Game Logic

const determineWinner = function (user, comp) {
  if (user === comp) return "draw";
  if (user === "rock" && comp === "paper") return "comp";
  if (user === "rock" && comp === "scissor") return "user";
  if (user === "paper" && comp === "rock") return "user";
  if (user === "paper" && comp === "scissor") return "comp";
  if (user === "scissor" && comp === "paper") return "user";
  if (user === "scissor" && comp === "rock") return "comp";
};

// Display winner

const removePrevDesign = function () {
  userResultDiv.classList.remove("draw", "win", "loss");
  compResultDiv.classList.remove("draw", "win", "loss");
};

const insertDrawDesign = function () {
  removePrevDesign();
  resultUserText.textContent = "It's a draw";
  resultCompText.textContent = "It's a draw";
  userResultDiv.classList.add("draw");
  compResultDiv.classList.add("draw");
};

const winnerDesignUI = function (winner) {
  // removePrevDesign();
  console.log(winner);
  if (winner === "user") {
    score.user += 1;
    userScore.textContent = score.user;
    resultUserText.textContent = "You win!";
    resultCompText.textContent = "Computer Loses!";
    userResultDiv.classList.add("win");
    compResultDiv.classList.add("loss");
  }

  if (winner === "comp") {
    score.comp += 1;
    compScore.textContent = score.comp;
    resultUserText.textContent = "You Lose!";
    resultCompText.textContent = "Computer Wins!";
    userResultDiv.classList.add("loss");
    compResultDiv.classList.add("win");
    dogPosition += 50;
    dog.style.top = `${dogPosition}px`;
  }
};

const implementResults = function (winner) {
  removePrevDesign();
  setTimeout(function () {
    userChoiceBtn.style.pointerEvents = "auto";
    if (winner === "draw") {
      insertDrawDesign();
    } else {
      winnerDesignUI(winner);
    }

    if (isGameEnd()) {
      gameStatus = false;
    }
  }, 3000);
};

const endRound = function (sec) {
  setTimeout(function () {
    resultWindow.addEventListener("click", function () {
      if (gameStatus) {
        updateUI(sec);
      } else {
        gameRestart();
        updateUI(sec);
        gameStatus = true;
      }
    });
  }, 2000);
};

const isGameEnd = function () {
  return Object.values(score).includes(5);
};

const gameRestart = function () {
  score = {
    user: 0,
    comp: 0,
  };
  userScore.textContent = score.user;
  compScore.textContent = score.comp;
  dog.style.top = "0px";
  dogPosition = 0;
};

const gameRound = function () {
  userChoiceBtn.addEventListener("click", function (e) {
    const userChoiceHtml = e.target.closest(".option");
    if (!userChoiceHtml) return;
    user = userChoiceHtml.dataset.choice;
    userChoiceBtn.style.pointerEvents = "none";
    updateUI(2000);
    userHand(user);
    compHand();
    winner = determineWinner(user, comp);
    implementResults(winner);

    // endRound();
  });
};

// while (!isGameEnd()) {
//   gameRound();
// }

gameRound();

endRound(0);
