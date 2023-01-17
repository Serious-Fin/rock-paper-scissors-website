function getComputerChoice() {
    const computerChoices = ["rock", "paper", "scissors"];

    let choiceIndex = getRandomInt(computerChoices.length);

    return computerChoices[choiceIndex];
}

function getRandomInt(maxInteger) {
    return Math.floor(Math.random() * maxInteger)
}

function playRound(event) {

    let playerSelection = this.dataset.type;
    let computerSelection = getComputerChoice();

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    let result = 0;

    if (playerSelection == computerSelection) {
        result = 0;
    }
    else if (playerSelection === "rock" && computerSelection === "scissors" ||
             playerSelection === "paper" && computerSelection === "rock" ||
             playerSelection === "scissors" && computerSelection === "paper") {
        result = 1;
    }
    else
    {
        result = -1;
    }

    displayRoundResults(result, playerSelection, computerSelection);
    updateScore(result);
}

function displayRoundResults(result, playerSelection, computerSelection) {
    const content = document.querySelector("#outcomeDisplay > #outcomeText");

    if (result > 0) {
        content.textContent = `You win! You chose ${playerSelection} while computer chose ${computerSelection}.`;
    }
    else if (result < 0) {
        content.textContent = `You lose... You chose ${playerSelection} while computer chose ${computerSelection}.`;
    }
    else {
        content.textContent = `Tie! You and computer both chose ${computerSelection}.`;
    }
}

function updateScore(result) {
    if (result > 0) {
        const computerHealth = document.querySelector('div[data-player="computer"] > p.health');
        computerHealth.textContent -= 1;

        if (computerHealth.textContent === "0") {
            winConditionMet(1);
        }
    }
    else if (result < 0) {
        const playerHealth = document.querySelector('div[data-player="user"] > p.health');
        playerHealth.textContent -= 1;

        if (playerHealth.textContent === "0") {
            winConditionMet(0);
        }
    }
}

function winConditionMet(outcome) {
    // 0 - computer won; 1 - user won

    // deactivate buttons
    const choiceButtons = document.querySelectorAll('button.choiceButton');

    choiceButtons.forEach((button) => {
        button.disabled = true;
    });

    // display winner
    const content = document.querySelector("#outcomeDisplay > #outcomeText");

    if (outcome === 0) {
        content.textContent = "You have been defeated";
    }
    else {
        content.textContent = "You emerge victorious!";
    }

    // add reload page button
    const mainContainer = document.querySelector('.mainContainer');
    const reloadButton = document.createElement('button');
    reloadButton.textContent = "Try again?";
    reloadButton.addEventListener('click', reloadPage);

    mainContainer.appendChild(reloadButton);
}

function reloadPage() {
    location.reload();
}

const choiceButtons = document.querySelectorAll('button.choiceButton');

choiceButtons.forEach((button) => {
    button.addEventListener('click', playRound);
});