import { wordList } from './wordList.js';

const letterValues = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1,
    J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
    S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

// Filter words by prefix
function filterWordsByPrefix(prefix) {
    return wordList.filter(word => word.startsWith(prefix.toUpperCase()));
}

// Display filtered words
function displayFilteredWords(prefix) {
    const resultDiv = document.getElementById('wordListOutput');
    const words = filterWordsByPrefix(prefix);
    resultDiv.innerHTML = words.length > 0
        ? words.join(', ')
        : 'No words found.';
}

// Calculate and display Scrabble score
function calculateScore() {
    const input = document.getElementById("inputText").value.toUpperCase();
    const outputDiv = document.getElementById("output");
    const totalScoreEl = document.getElementById("totalScore");
    const scoreMessageEl = document.getElementById("output2");

    outputDiv.innerHTML = ""; // Clear previous results
    totalScoreEl.innerText = ""; // Clear total score
    scoreMessageEl.innerText = ""; // Clear message

    if (!wordList.includes(input)) {
        totalScoreEl.innerText = "That's not a valid word!";
        return;
    }

    let totalScore = 0;
    let delay = 0;

    for (let char of input) {
        if (letterValues[char]) {
            totalScore += letterValues[char];
            const letterBox = document.createElement("div");
            letterBox.classList.add("letter-box");
            
            // Create letter and value elements
            const letterEl = document.createElement("div");
            letterEl.classList.add("letter");
            letterEl.innerText = char;
            
            const valueEl = document.createElement("div");
            valueEl.classList.add("value");
            valueEl.innerText = letterValues[char];
            
            letterBox.appendChild(letterEl);
            letterBox.appendChild(valueEl);

            setTimeout(() => {
                outputDiv.appendChild(letterBox);
            }, delay);

            delay += 200;
        }
    }

    setTimeout(() => {
        totalScoreEl.innerText = `Total Scrabble Score: ${totalScore}`;
        scoreMessageEl.innerText = getScoreMessage(totalScore);
    }, delay);
}

// Generate message based on score
function getScoreMessage(totalScore) {
    if (totalScore <= 5) return "That's a terrible score.";
    if (totalScore <= 8) return "OK, better than that 5-point crap.";
    if (totalScore <= 10) return "Still weak, but you're trying.";
    if (totalScore <= 15) return "Okay! You're playing some scrabble now.";
    if (totalScore <= 20) return "Pushing it! Are you hoarding tiles?";
    return "You're unstoppable... or are you cheating?";
}

// Attach filtering and scoring functionality on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("filterButton").addEventListener("click", () => {
        const prefix = document.getElementById("filterInput").value.trim();
        displayFilteredWords(prefix);
    });

    document.getElementById("scoreButton").addEventListener("click", calculateScore);
});