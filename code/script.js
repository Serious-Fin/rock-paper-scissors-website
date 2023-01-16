function getComputerChoice() {
    const computerChoices = ["rock", "paper", "scissors"];

    let choiceIndex = getRandomInt(computerChoices.length);

    return computerChoices[choiceIndex];
}

function getRandomInt(maxInteger) {
    return Math.floor(Math.random() * maxInteger)
}

console.log(getComputerChoice());