let MAX_HEALTH = 4;

let userHealth = MAX_HEALTH;
let computerHealth = MAX_HEALTH;

let TEXT_TYPE_INDEX = 0;
let TEXT_TYPE_SPEED = 15;
let TEXT_TYPE_TEXT = ""

let timeoutHandler;

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

    transformSprites(result);
    displayRoundResults(result, playerSelection, computerSelection);
    updateScore(result);
    
}

function displayRoundResults(result, playerSelection, computerSelection) {
    if (result > 0) {
        typeToConsole(`You win! You chose ${playerSelection} while computer chose ${computerSelection}.`);
    }
    else if (result < 0) {
        typeToConsole(`You lose... You chose ${playerSelection} while computer chose ${computerSelection}.`);
    }
    else {
        typeToConsole(`Tie! You and computer both chose ${computerSelection}.`);
    }
}

function updateScore(result) {
    if (result > 0) {
        const computerHealthCounter = document.querySelector('div.healthBarBase > div[data-player="computer"]');
        computerHealth -= 1;
        computerHealthCounter.style.width = `${(computerHealth * 100) / MAX_HEALTH}%`;

        if (computerHealth === 0) {
            const computerSprite = document.querySelector('img.characterSprite[data-type="computer"]');
            computerSprite.classList.add("computerDeath");
            winConditionMet(1);
        }
    }
    else if (result < 0) {
        const userHealthCounter = document.querySelector('div.healthBarBase > div[data-player="user"]');
        userHealth -= 1;
        userHealthCounter.style.width = `${(userHealth * 100) / MAX_HEALTH}%`;

        if (userHealth === 0) {
            const playerSprite = document.querySelector('img.characterSprite[data-type="user"]');
            playerSprite.classList.add("userDeath");
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
    if (outcome === 0) {
        typeToConsole("You have been defeated");
    }
    else {
        typeToConsole("You emerge victorious!");
    }

    // add reload page button
    const consoleContainer = document.querySelector('.consoleTextBox');
    const reloadButton = document.createElement('button');
    reloadButton.textContent = "Retry?";
    reloadButton.addEventListener('click', reloadPage);
    reloadButton.classList.add('retryButton');
    consoleContainer.appendChild(reloadButton);
}

function reloadPage() {
    location.reload();
}

function typeToConsole(text) {
    document.querySelector('p#consoleText').textContent = "";
    TEXT_TYPE_INDEX = 0;
    TEXT_TYPE_TEXT = text;

    typeOutChar();
}

function typeOutChar() {
    if (TEXT_TYPE_INDEX < TEXT_TYPE_TEXT.length) {
        const paragraph = document.querySelector('p#consoleText');
        paragraph.textContent += TEXT_TYPE_TEXT.charAt(TEXT_TYPE_INDEX);
        TEXT_TYPE_INDEX++;
        setTimeout(typeOutChar, TEXT_TYPE_SPEED);
    }
}

function transformSprites(result) {
    const playerSprite = document.querySelector('img.characterSprite[data-type="user"]');
    const computerSprite = document.querySelector('img.characterSprite[data-type="computer"]');

    if (result > 0) {
        playerSprite.classList.add("userAttack");
        computerSprite.classList.add("computerDamage");
    }
    else if (result < 0) {
        playerSprite.classList.add("userDamage");
        computerSprite.classList.add("computerAttack");
    }
    else {
        playerSprite.classList.add("userAttack");
        computerSprite.classList.add("computerAttack");
    }
}

function removeTransition(e) {
    if (e.propertyName != "transform") return;

    if (this.dataset.type === "user") {
        this.classList.remove("userAttack", "userDamage");
    }
    
    if (this.dataset.type === "computer") {
        this.classList.remove("computerAttack", "computerDamage");
    }
}


const choiceButtons = document.querySelectorAll('button.choiceButton');

// Play a round on click
choiceButtons.forEach((button) => {
    button.addEventListener('click', playRound);
});

// Add on transition-end event listener to revert images to their original states
const sprites = document.querySelectorAll("div.spriteContainer > img.characterSprite");

sprites.forEach((sprite) => {
    sprite.addEventListener('transitionend', removeTransition)
});