function getComputerChoice() {
    const computerChoices = ["rock", "paper", "scissors"];

    let choiceIndex = getRandomInt(computerChoices.length);

    return computerChoices[choiceIndex];
}

function getRandomInt(maxInteger) {
    return Math.floor(Math.random() * maxInteger)
}

function playRound(playerSelection, computerSelection) {

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection == computerSelection) {
        console.log(`Tie! You and computer both chose ${computerSelection}.`);
        return 0;
    }
    else if (playerSelection === "rock" && computerSelection === "scissors" ||
             playerSelection === "paper" && computerSelection === "rock" ||
             playerSelection === "scissors" && computerSelection === "paper") {
        console.log(`You win! You chose ${playerSelection} while computer chose ${computerSelection}.`);
        return 1;
    }
    else
    {
        console.log(`You lose... Computer chose ${computerSelection} while you chose ${playerSelection}`);
        return -1;
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++)
    {
        console.log(`--- Round ${i + 1} ---`);

        let playerSelection = prompt("Choose rock, paper of scissors");
        let computerSelection = getComputerChoice();

        let result = playRound(playerSelection, computerSelection);

        if (result === 1) {
            playerScore += 1;
        }
        else if (result === -1) {
            computerScore += 1;
        }

        console.log(`Score: Human ${playerScore} | Computer ${computerScore}`);
    }

    console.log("----- FINAL RESULTS ARE IN -----");

    console.log(`Score: Human ${playerScore} | Computer ${computerScore}`);

    if (playerScore > computerScore) {
        console.log("Human won!");
    }
    else if (computerScore > playerScore) {
        console.log("Computer won...")
    }
    else {
        console.log("It's a tie.");
    }
}


console.log(game());