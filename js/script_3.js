document.addEventListener('DOMContentLoaded', function () {
    const chatBody = document.getElementById('chat-body');
    const dialogItems = document.querySelectorAll('.dialog-item');

    const dialogs = {
        dialog1: [
            { sender: 'sent', text: 'привет' },
        ],
        dialog2: [
            { sender: 'received', text: 'Здарова' },
            { sender: 'received', text: 'Че как жизнь?' },
            { sender: 'sent', text: 'прекрасно все' },
            { sender: 'received', text: 'Много путешествуешь ?' },
            { sender: 'sent', text: 'ну как много' },
            { sender: 'sent', text: 'мне как 18 исполнилось так начал' },
            { sender: 'sent', text: 'летом на месяц в турцию ездил' },
            { sender: 'sent', text: 'А ты любишь путешествия?' },
            { sender: 'received', text: 'Ееас' },
            { sender: 'received', text: 'Ну' },
            { sender: 'received', text: 'Мне 17 ток' },
            { sender: 'received', text: 'Но я ездила летом ток по Москве Подольску Серпухову , Чехову , окраинам Чехова' },
        ],
        dialog3: [
            { sender: 'received', text: 'Спокойной ночи' },
            { sender: 'sent', text: 'спокойной ночи' },
            { sender: 'sent', text: 'пошли завтра погуляем может?' },
            { sender: 'sent', text: 'у меня как раз свободный день' },
            { sender: 'received', text: 'У меня завтра 5 пар 🥲' },
            { sender: 'received', text: 'Давай в пятницу наверное' },
            { sender: 'received', text: 'Или субботу' },
            { sender: 'sent', text: 'давай тогда обсудим поближе к субботе' },
            { sender: 'sent', text: 'Привет' },
            { sender: 'sent', text: 'Как день у тебя?' },
            { sender: 'received', text: 'Здарова' },
            { sender: 'received', text: 'Ток домой буду ехать' },
            { sender: 'sent', text: 'ты только учится закончила' },
            { sender: 'sent', text: 'или гуляла?' },
            { sender: 'received', text: 'Еаас' },
            { sender: 'sent', text: 'как погуляла?' },
            { sender: 'received', text: 'С кайфом, ток плечи от рюкзака немного болят' },
            { sender: 'received', text: 'Можем как нибудь встретится когда будет свободное время' },
            { sender: 'sent', text: 'ты сегодня вечером свободна?' },
            { sender: 'received', text: 'Да' },
            { sender: 'sent', text: 'Пошли погуляем тогда' },
            { sender: 'received', text: 'Могу, но ток тогда не слишком далеко было ехать до мцд или лесопарковой' },
            { sender: 'received', text: 'Тип просто если гулять долго, то лучше тогда в выходной' },
            { sender: 'sent', text: 'Я так подумал ты наверное уставшая сегодня будешь, можем на выходных в целом' },
            { sender: 'received', text: 'Ну смари' },
            { sender: 'received', text: 'Я сегодня не накрашена, кое как собралась' },
            { sender: 'received', text: 'Опоздала' },
            { sender: 'received', text: 'Ещё и голова грязная' },
            { sender: 'received', text: 'Короче весь спектор минусов' },
            { sender: 'sent', text: 'Давай на выходных короче' },
            { sender: 'sent', text: 'Спокойно погуляем, отдохнем' },
            { sender: 'sent', text: 'Так лучше будета' },
            { sender: 'image', text: 'img/2.jpg' },
            { sender: 'received', text: 'Вчера я выглядела вот так' },
            { sender: 'image', text: 'img/3.jpg' },
            { sender: 'received', text: 'Сегодня так' },
            { sender: 'sent', text: 'Ты все равно красивая и милая' },
            { sender: 'received', text: 'У тебя ахуенный телеграм канал, я не выдержала и вступила' },
            { sender: 'sent', text: 'спасибоо' },
            { sender: 'sent', text: 'приятно' },
            { sender: 'video', text: 'img/5.mp4' },
            { sender: 'received', text: 'От этого видео такой же приятный вайб как и от тебя' },
            { sender: 'sent', text: 'спасибоо' },
        ],
        dialog4:[
            { sender: 'sent', text: 'Так по поводу завтра, давай в 15 на Царицыно' },
            { sender: 'sent', text: 'Встретимся там, а потом решим куда дальше' },
            { sender: 'sent', text: 'Я вот думаю можно и в Царицыно погулять' },
            { sender: 'sent', text: 'Там парк вроде хороший' },
            { sender: 'received', text: 'Ага' },
            { sender: 'received', text: 'Я там раньше часто гуляла' },
            { sender: 'received', text: 'У меня там всё детство прошло' },
            { sender: 'received', text: 'Оки' },
            { sender: 'sent', text: 'ну все значит там погуляем' },
            { sender: 'sent', text: 'если что потом в центр можно съездить будет' },
            { sender: 'sent', text: 'если там надоест' },
            { sender: 'received', text: 'Оки' },
            { sender: 'received', text: 'А какой вообще шоколад ты любишь?' },
            { sender: 'sent', text: 'темный' },
            { sender: 'received', text: 'Вау, классно' },
            { sender: 'sent', text: 'Мне кажется темный вообще никому не нравится' },
            { sender: 'received', text: 'Тёмный обычно любят умные люди' },
            { sender: 'received', text: 'А какую марку шоколада предпочитаешь ?' },
            { sender: 'sent', text: 'да вообще все равно, но вот недавно бабаевский покупал' },
            { sender: 'sent', text: 'мне прям понравился' },
            { sender: 'received', text: 'Ясненько' },
            { sender: 'received', text: ':)' },
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
        } else if (sender === 'video') {
            const video = document.createElement('video');
            video.src = text; // путь к видео
            video.autoplay = true; // видео начинается автоматически
            video.classList.add('responsive-video'); // Добавляем класс для стилизации
            video.muted = false; // отключаем мутинг
            video.volume = 0.5; // ставим максимальную громкость
    
            messageDiv.appendChild(video);
    
            video.play().catch(error => {
                console.warn('Браузер заблокировал воспроизведение со звуком:', error);
                video.muted = true; // если не получилось, включаем без звука
                video.play(); // продолжаем воспроизведение без звука
            });
    
            // Создаем кнопку "Пропустить"
            const skipButton = document.createElement('button');
            skipButton.textContent = 'Пропустить';
            skipButton.classList.add('skip-button'); // Добавляем класс для стилизации
    
            // Обработка нажатия на кнопку "Пропустить"
            skipButton.addEventListener('click', () => {
                video.pause(); // Останавливаем видео
                showNextMessage(); // Переходим к следующему сообщению
            });
    
            messageDiv.appendChild(skipButton);
    
            // Обрабатываем событие завершения видео
            video.addEventListener('ended', () => {
                if (messageIndex < dialogs[currentDialog].length - 1) {
                    setTimeout(showNextMessage, 1000); // Переход к следующему сообщению
                } else {
                    setTimeout(switchDialog, 2000); // Переключение на следующий диалог
                }
            });
        } else {
            messageDiv.textContent = text;
        }
    
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Автопрокрутка вниз
    
        // Если это не видео, следующее сообщение отправляем через 1 секунду
        if (sender !== 'video') {
            if (messageIndex < dialogs[currentDialog].length - 1) {
                setTimeout(showNextMessage, 1000); // Задержка перед показом следующего сообщения
            } else {
                setTimeout(switchDialog, 2000); // Переключение на следующий диалог
            }
        }
    }
    
    
    
    
    
    
    function showNextMessage() {
        if (messageIndex < dialogs[currentDialog].length) {
            const { sender, text } = dialogs[currentDialog][messageIndex];
            addMessage(sender, text);
            messageIndex++;
        } else {
            switchDialog(); // Если закончилась переписка, переключаем на следующий диалог
        }
    }

    function switchDialog() {
        const currentIndex = Array.from(dialogItems).findIndex(item => item.dataset.dialog === currentDialog);
        const nextIndex = (currentIndex + 1) % dialogItems.length; // Переключаемся на следующий диалог

        // Удаляем класс 'item_1' у текущего элемента
        dialogItems[currentIndex].classList.remove('item_1');

        currentDialog = dialogItems[nextIndex].dataset.dialog;
        messageIndex = 0; // Сбрасываем индекс сообщений
        chatBody.innerHTML = ''; // Очищаем чат

        // Проверяем, если мы дошли до конца диалогов
        if (nextIndex === 0) {
            // Если все диалоги были просмотрены, переходим на другую страницу
            setTimeout(() => {
                window.location.href = 'page_1.html'; // Переход на другую страницу
            }, 1000); // Задержка перед переходом на другую страницу
        } else {
            showNextMessage(); // Показываем первое сообщение нового диалога
        }

        // Добавляем класс 'item_1' к новому элементу
        dialogItems[nextIndex].classList.add('item_1');
    }

    dialogItems.forEach(item => {
        item.addEventListener('click', () => {
            // Удаляем класс 'item_1' у всех элементов
            dialogItems.forEach(dialogItem => dialogItem.classList.remove('item_1'));

            currentDialog = item.dataset.dialog;
            messageIndex = 0;
            chatBody.innerHTML = ''; // Очищаем чат
            showNextMessage(); // Показать первое сообщение нового диалога

            // Добавляем класс 'item_1' к текущему элементу
            item.classList.add('item_1');
        });
    });

    // Начинаем с первого диалога
    dialogItems[0].classList.add('item_1'); // Добавляем класс 'item_1' к первому элементу
    showNextMessage(); // Показываем первое сообщение
});
