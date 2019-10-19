// Closure
{
    // ****************** Variable Setup ******************

    const newGame = document.querySelector(".newgame");
    const rock = document.querySelector(".rock");
    const paper = document.querySelector(".paper");
    const scissors = document.querySelector(".scissors");
    const hands = document.querySelector(".hands");
    let yourHand = document.querySelector(".yourID");
    let compHand = document.querySelector(".compID");
    let yourScore = document.querySelector(".yourScore");
    let compScore = document.querySelector(".compScore");
    let results = document.querySelector(".resultsText");

    const yourStartingHand = `<span class="yourID yourHand__rock rock"><i class="far fa-hand-rock"></i></span>`;
    const compStartingHand = `<span class="compID compHand__rock rock"><i class="far fa-hand-rock fa-flip-vertical"></i></span>`;

    // ****************** Data Structures Setup ******************

    scores = {
        yourScore: 0,
        compScore: 0
    }

    choices = {
        rock: "rock",
        paper: "paper",
        scissors: "scissors"
    };

    outcomes = {
        rock: {
            winsAgainst: "scissors",
            losesAgainst: "paper"
        },

        scissors: {
            winsAgainst: "paper",
            losesAgainst: "rock"
        },

        paper: {
            winsAgainst: "rock",
            losesAgainst: "scissors"
        }
    }

    selections = {
        yourSelection: "",
        compSelection: ""
    };

    // ****************** Event Listeners Setup ******************

    newGame.addEventListener("click", () => {
        resetGame();
    });

    rock.addEventListener("click", () => {
        resetHands();
        selections.yourSelection = "rock";
        compLogic();
        const win = outcomes.rock.winsAgainst;
        const loss = outcomes.rock.losesAgainst;
        gameResults(win, loss);
        resetBounce();
    });

    paper.addEventListener("click", () => {
        resetHands();
        selections.yourSelection = "paper";
        compLogic();
        const win = outcomes.paper.winsAgainst;
        const loss = outcomes.paper.losesAgainst;
        gameResults(win, loss);
        resetBounce();
    });

    scissors.addEventListener("click", () => {
        resetHands();
        selections.yourSelection = "scissors";
        compLogic();
        const win = outcomes.scissors.winsAgainst;
        const loss = outcomes.scissors.losesAgainst;
        gameResults(win, loss);
        resetBounce();
    });

    // ****************** Game Function Logic Setup ******************

    // Computer logic used to decide selection
    compLogic = () => {
        let randomNum = Math.floor((Math.random() * 3));
        if (randomNum == 0) {
            selections.compSelection = "rock";
        } else if (randomNum == 1) {
            selections.compSelection = "paper";
        } else if (randomNum == 2) {
            selections.compSelection = "scissors";
        } else {
            console.log("error!");
        }
    };

    // Necessary to ensure hand symbols are correctly formatted for screen display
    HandSignHTMLFormatting = () => {

        if (selections.yourSelection === "scissors") {
            yourHandSign = `<span class="yourID yourHand__${selections.yourSelection} ${selections.yourSelection}"><i class="far fa-hand-${selections.yourSelection} fa-flip-vertical"></i></span>`;
        } else {
            yourHandSign = `<span class="yourID yourHand__${selections.yourSelection} ${selections.yourSelection}"><i class="far fa-hand-${selections.yourSelection}"></i></span>`;
        }

        if (selections.compSelection === "scissors") {
            compHandSign = `<span class="compID compHand__${selections.compSelection} ${selections.compSelection}"><i class="far fa-hand-${selections.compSelection} fa-flip"></i></span>`;
        } else {
            compHandSign = `<span class="compID compHand__${selections.compSelection} ${selections.compSelection}"><i class="far fa-hand-${selections.compSelection} fa-flip-vertical"></i></span>`;
        }

        hands.innerHTML = yourHandSign + compHandSign;
    };

    // Runs game logic to decide round results, updates scores and displays result text
    gameResults = (win, loss) => {
        hands.classList.toggle("bounce");

        setTimeout(() => {

            HandSignHTMLFormatting();
            if (win === selections.compSelection) {
                scores.yourScore++;
                results.textContent = "You Win!";
                yourScore.textContent = scores.yourScore;

            } else if (loss === selections.compSelection) {
                scores.compScore++;
                results.textContent = "You Lose!";
                compScore.textContent = scores.compScore;

            } else {
                results.textContent = "Tie!";
            }

        }, 1800);
    };

    // New Game, resets all values
    resetGame = () => {
        scores.yourScore = 0;
        scores.compScore = 0;

        yourScore.textContent = scores.yourScore;
        compScore.textContent = scores.compScore;

        results.textContent = "";

        hands.innerHTML = yourStartingHand + compStartingHand;
    };

    // Causes hand symbols to reset back to rock at start of each round 
    // and removes results text
    resetHands = () => {
        hands.innerHTML = yourStartingHand + compStartingHand;

        results.textContent = "";
    };

    // Toggles bounce class off, so that on next round the gameResults function
    // can toggle the class back on
    resetBounce = () => {
        setTimeout(() => {

            hands.classList.toggle("bounce");

            let yourTempHand = document.querySelector(".yourID");
            let compTempHand = document.querySelector(".compID");

            yourHand = yourTempHand;
            compHand = compTempHand;

        }, 2000);
    };
}