document.addEventListener('DOMContentLoaded', () => {
    const difficultySelect = document.getElementById('difficulty');
    const sampleText = document.getElementById('sample-text');
    const levelDisplay = document.getElementById('level');
    const userInput = document.getElementById('user-input');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const retryBtn = document.getElementById('retry-btn');
    const instructionsBtn = document.getElementById('instructions-btn');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');

    const texts = {
        easy: "The cat sat on the mat.",
        medium: "The quick brown fox jumps over the lazy dog.",
        hard: "Sphinx of black quartz, judge my vow."
    };

    let startTime;
    let interval;
    let isStarted = false;

    difficultySelect.addEventListener('change', (event) => {
        const selectedDifficulty = event.target.value;
        sampleText.innerText = texts[selectedDifficulty];
        levelDisplay.innerText = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    });

    userInput.addEventListener('input', () => {
        if (!isStarted) {
            isStarted = true;
            startTime = new Date().getTime();
            interval = setInterval(() => {
                const currentTime = new Date().getTime();
                const elapsedTime = Math.floor((currentTime - startTime) / 1000);
                timeDisplay.innerText = elapsedTime;
            }, 1000);
        }
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            stopTest();
        }
    });

    stopBtn.addEventListener('click', () => {
        stopTest();
    });

    retryBtn.addEventListener('click', () => {
        userInput.value = '';
        userInput.disabled = false;
        clearInterval(interval);
        timeDisplay.innerText = '0';
        wpmDisplay.innerText = '0';
        isStarted = false;
    });

    instructionsBtn.addEventListener('click', () => {
        const instructionsModal = new bootstrap.Modal(document.getElementById('instructions-modal'));
        instructionsModal.show();
    });

    function stopTest() {
        clearInterval(interval);
        userInput.disabled = true;
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        const userText = userInput.value.trim();
        const sampleWords = sampleText.innerText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / elapsedTime) * 60);
        wpmDisplay.innerText = wpm;
    }
});