const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');
const yourChoice = document.getElementById('your-choice');
const computerChoice = document.getElementById('computer-choice');

const prizeModal = document.getElementById('prize-modal');
const adModal = document.getElementById('ad-modal');
const closePrize = document.getElementById('close-prize');
const closeAd = document.getElementById('close-ad');

choices.forEach(choice => choice.addEventListener('click', playGame));

function playGame(e) {
    const userChoice = e.target.id;
    const compChoice = getComputerChoice();
    const winner = getWinner(userChoice, compChoice);

    yourChoice.textContent = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
    computerChoice.textContent = compChoice.charAt(0).toUpperCase() + compChoice.slice(1);
    resultText.textContent = `You ${winner}`;

    if (winner === 'Win') {
        triggerConfetti();
        showPrizeModal();
    } else if (winner === 'Lose') {
        showAdModal();
    }
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(user, computer) {
    if (user === computer) {
        return 'Tied';
    }
    if ((user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')) {
        return 'Win';
    }
    return 'Lose';
}

function triggerConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function showPrizeModal() {
    prizeModal.style.display = 'flex';
}

function showAdModal() {
    adModal.style.display = 'flex';
}

// Close the modals when the user clicks on the close button
closePrize.addEventListener('click', () => {
    prizeModal.style.display = 'none';
});

closeAd.addEventListener('click', () => {
    adModal.style.display = 'none';
});
