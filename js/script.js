function startChat() {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = ''; // Очистить предыдущие сообщения

    const messages = [
        { delay: 1000, sender: 'sent', text: 'Привет, как твои дела?' },
        { delay: 3000, sender: 'received', text: 'Привет! Всё отлично, как у тебя?' },
        { delay: 5000, sender: 'sent', text: 'Тоже хорошо, давай завтра встретимся?' },
        { delay: 8000, sender: 'received', text: 'Да, конечно! Буду рада.' },
    ];

    let lastMessageTime = 0;

    messages.forEach((msg) => {
        setTimeout(() => {
            addMessage(msg.sender, msg.text);
            lastMessageTime = msg.delay;
        }, msg.delay);
    });

    // Разблокировать поле для ввода через 10 секунд
    setTimeout(() => {
        document.getElementById('user-message').disabled = false;
        document.querySelector('button').disabled = false;
    }, lastMessageTime + 1000);
}

function addMessage(sender, text) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = text;

    messageElement.appendChild(messageContent);
    chatBody.appendChild(messageElement);

    // Скролл вниз при добавлении новых сообщений
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('user-message');
    const userText = input.value;
    
    if (userText.trim() !== '') {
        addMessage('sent', userText);
        input.value = ''; // Очистить поле ввода
    }
}
