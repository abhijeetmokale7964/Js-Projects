let userScore = 0;
let compScore = 0;
let round = 1;
const totalRounds = 10;

const choises = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const playAgainBtn = document.querySelector("#play-again");

// 👉 NEW (Round display inside msg line)
const roundSpan = document.createElement("span");
roundSpan.style.marginRight = "15px";
roundSpan.style.fontWeight = "bold";
msg.before(roundSpan); // place left of msg

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIndx = Math.floor(Math.random() * 3);
    return options[randomIndx];
};

const drawGame = () => {
    msg.innerText = "Game was Draw, Please play Again..";
    msg.style.backgroundColor = "#0ebfa7";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win..!, Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost..!, ${compChoice} beats, Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

// 👉 FINAL RESULT
const showFinalWinner = () => {
    if (userScore > compScore) {
        msg.innerText = "🎉 You are the Final Winner!";
        msg.style.backgroundColor = "green";
    } else if (compScore > userScore) {
        msg.innerText = "💻 Computer is the Final Winner!";
        msg.style.backgroundColor = "red";
    } else {
        msg.innerText = "🤝 Match Draw!";
        msg.style.backgroundColor = "#0ebfa7";
    }
      playAgainBtn.style.display = "inline-block";
};

const playGame = (userChoice) => {

    // 👉 STOP after 10 rounds
    if (round > totalRounds) return;

    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;

        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }

    // 👉 Update Round Display (LEFT of msg)
    roundSpan.innerText = `Round: ${round}/10`;

    round++;

    // 👉 After 10 rounds → show final result
    if (round > totalRounds) {
        setTimeout(() => {
            showFinalWinner();
        }, 800);
    }
};

choises.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Restart Game
playAgainBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  round = 1;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  msg.innerText = "Play your move";
  msg.style.backgroundColor = "black";

  roundText.innerText = `Round: 1/10`;

  playAgainBtn.style.display = "none";
});