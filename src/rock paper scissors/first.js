export const text_html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Webpage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1 class="fancy-heading">Welcome to My Interactive Webpage</h1>
        <p class="intro-text">Click the button below to reveal a surprise!</p>
        <button id="surpriseButton" class="button">Show Surprise</button>
        <div id="surpriseMessage" class="hidden surprise-message">✨ Surprise! ✨</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;



export const text_css = `body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #ff7e5f, #feb47b);
}

.container {
    text-align: center;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fancy-heading {
    font-size: 3rem;
    color: #ff7e5f;
    text-transform: uppercase;
    margin-bottom: 20px;
    animation: fadeIn 2s ease;
}

.intro-text {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 30px;
    animation: fadeIn 3s ease;
}

.button {
    background-color: #ff7e5f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #feb47b;
}

.hidden {
    display: none;
}

.surprise-message {
    font-size: 2rem;
    color: #ff7e5f;
    margin-top: 20px;
    animation: fadeIn 1s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;



export const text_js = `document.addEventListener('DOMContentLoaded', () => {
    const surpriseButton = document.getElementById('surpriseButton');
    const surpriseMessage = document.getElementById('surpriseMessage');

    surpriseButton.addEventListener('click', () => {
        if (surpriseMessage.classList.contains('hidden')) {
            surpriseMessage.classList.remove('hidden');
            surpriseMessage.style.animation = 'fadeIn 1s ease';
            surpriseButton.textContent = 'Hide Surprise';
        } else {
            surpriseMessage.classList.add('hidden');
            surpriseButton.textContent = 'Show Surprise';
        }
    });
});
`;
