// app/static/script.js

document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const chatHistory = document.getElementById('chat-history');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        let message = userInput.value.trim();
        if (message !== '') {
            sendMessage(message);
            userInput.value = '';
            createHeart();
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function sendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.innerHTML = `<strong>You:</strong> ${message}`;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the latest message

        fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'input': message })
        })
        .then(response => response.json())
        .then(data => {
            const therapistMessage = document.createElement('div');
            therapistMessage.classList.add('message', 'therapist-message');
            therapistMessage.innerHTML = `<strong>Therabot:</strong> ${data.response}`;
            chatHistory.appendChild(therapistMessage);
            chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the latest message
        })
        .catch(error => console.error('Error:', error));
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️'; // Heart emoji or image
        document.body.appendChild(heart);
        // Position heart at the bottom right of the send button
        const buttonRect = sendButton.getBoundingClientRect();
        heart.style.top = `${buttonRect.bottom}px`;
        heart.style.left = `${buttonRect.right}px`;

        // Remove the heart after the animation
        setTimeout(() => {
            heart.remove();
        }, 1000); // Matches the animation duration
    }
});
