document.addEventListener('DOMContentLoaded', function () {
    const chatBody = document.getElementById('chat-body');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    const dialogs = {
        dialog1: [
            { sender: 'sent', text: 'Солнышко моё ❤️' },
            { sender: 'sent', text: 'Как тебе начало? Я очень старался 🥺❤️' },
            { sender: 'sent', text: 'Люблю тебя очень очень сильно ❤️❤️' },
            { sender: 'image', text: 'img/1.jpg' } // Последнее сообщение - изображение
        ],
    };

    let currentDialog = 'dialog1';
    let messageIndex = 0;

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('telegram-message', sender);
    
        if (sender === 'image') {
            const img = document.createElement('img');
            img.src = text; // путь к изображению
            img.classList.add('responsive-image'); // Добавляем класс для стилизации
            messageDiv.appendChild(img);
        } else {
            messageDiv.textContent = text;
        }
    
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Автопрокрутка вниз
    }

    function showNextMessage() {
        if (messageIndex < dialogs[currentDialog].length) {
            const { sender, text } = dialogs[currentDialog][messageIndex];
            addMessage(sender, text);
            messageIndex++;
        }

        // Проверяем, если это последнее сообщение
        if (messageIndex >= dialogs[currentDialog].length) {
            // Задержка перед переходом на новую страницу
            setTimeout(() => {
                window.location.href = 'page_4.html'; // Замените 'new-page.html' на нужный URL
            }, 2000); // 2 секунды задержки перед переходом
        }
    }

    // Обработка отправки сообщений
    sendButton.addEventListener('click', () => {
        const userInput = messageInput.value.trim();
        if (userInput) {
            addMessage('received', userInput); // Сообщение от Юли
            messageInput.value = ''; // Очищаем поле ввода
            // Задержка перед показом следующего сообщения
            setTimeout(showNextMessage, 1000); 
        } else {
            // Если последнее сообщение, просто показываем следующее сообщение
            showNextMessage();
        }
    });

    // Начинаем с первого диалога
    showNextMessage();
});
