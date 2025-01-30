document.addEventListener('DOMContentLoaded', () => {
    const difficultySelect = document.getElementById('difficulty');
    const sampleText = document.getElementById('sample-text');
    const levelDisplay = document.getElementById('level');

    const texts = {
        easy: "The cat sat on the mat.",
        medium: "The quick brown fox jumps over the lazy dog.",
        hard: "Sphinx of black quartz, judge my vow."
    };

    difficultySelect.addEventListener('change', (event) => {
        const selectedDifficulty = event.target.value;
        sampleText.innerText = texts[selectedDifficulty];
        levelDisplay.innerText = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    });
});