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

let user;
let comp;
let winner;

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

const updateUI = function () {
  rockUI.classList.toggle("animate-1");
  paperUI.classList.toggle("animate-2");
  scissorUI.classList.toggle("animate-3");
  optionText.forEach((item) => item.classList.toggle("animate-text2"));

  setTimeout(function () {
    userChoiceBtn.classList.toggle("inactive");
    resultWindow.classList.toggle("inactive");
  }, 2000);
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
  removePrevDesign();
  console.log(winner);
  if (winner === "user") {
    resultUserText.textContent = "You win!";
    resultCompText.textContent = "Computer Loses!";
    userResultDiv.classList.add("win");
    compResultDiv.classList.add("loss");
    console.log(userResultDiv.classList);
    console.log(compResultDiv.classList);
  }

  if (winner === "comp") {
    resultUserText.textContent = "You Lose!";
    resultCompText.textContent = "Computer Wins!";
    userResultDiv.classList.add("loss");
    compResultDiv.classList.add("win");
    console.log(userResultDiv.classList);
    console.log(compResultDiv.classList);
  }
};

const implementResults = function (winner) {
  if (winner === "draw") {
    insertDrawDesign();
  } else {
    winnerDesignUI(winner);
  }
};

userChoiceBtn.addEventListener("click", function (e) {
  userChoiceBtn.style.pointerEvents = "none";
  const userChoiceHtml = e.target.closest(".option");
  if (!userChoiceHtml) return;
  user = userChoiceHtml.dataset.choice;
  console.log(userResultDiv.classList.contains("draw"));
  updateUI();
  userHand(user);
  compHand();
  winner = determineWinner(user, comp);
  implementResults(winner);
});
