// Настройка таймеров с уникальными текстами, временем и ссылками для каждой карточки
const cardsData = [
    {
        id: "timer-2",
        unlockDate: new Date("2025-02-10T00:00:00").getTime(),
        text: "Секрет №1",
        url: "page_1.html" // Уникальная ссылка для карточки
    },
    {
        id: "timer-3",
        unlockDate: new Date("2025-02-14T00:00:00").getTime(),
        text: "Секрет №2",
        url: "page_2.html" // Уникальная ссылка для карточки
    }
];

// Обновление таймера
function updateTimers() {
    const now = new Date().getTime(); // Текущее время в миллисекундах

    cardsData.forEach(card => {
        const timeLeft = card.unlockDate - now; // Время до разблокировки
        const timerElement = document.getElementById(card.id);
        const cardElement = timerElement?.previousElementSibling;

        if (!timerElement || !cardElement) {
            console.error(`Элемент таймера или карточки не найден для ${card.id}`);
            return;
        }

        if (timeLeft <= 0) {
            // Если время прошло, открываем карточку
            timerElement.style.display = 'none'; // Скрываем таймер
            cardElement.classList.remove("locked");
            cardElement.classList.add("open", "unlocked");
            cardElement.innerHTML = `<a href="${card.url}" class="card-link">${card.text}</a>`; // Добавляем ссылку и текст
        } else {
            // Выводим оставшееся время
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 240);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);

            timerElement.innerText = `Откроется через ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    });
}

// Запуск обновления таймеров каждую секунду
setInterval(updateTimers, 1000);

// Музыка
let isPlaying = false;
function toggleMusic() {
    const music = document.getElementById("bg-music");
    if (music) {
        if (isPlaying) {
            music.pause();
        } else {
            music.play();
        }
        isPlaying = !isPlaying;
    } else {
        console.error("Элемент музыки не найден.");
    }
}

// Инициализация таймеров при загрузке страницы
updateTimers();

function updateDaysCounter() {
    const startDate = new Date("2024-11-19T00:00:00+03:00"); // Дата начала отношений с учётом московского времени
    const now = new Date();

    // Учитываем московский часовой пояс (UTC+3)
    const moscowOffset = 3 * 60 * 60 * 1000; // Смещение в миллисекундах
    const moscowTime = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + moscowOffset);

    const diffTime = moscowTime - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Функция для правильного склонения слова "день"
    function getDayWord(number) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return "дней";
        }
        if (lastDigit === 1) {
            return "день";
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return "дня";
        }
        return "дней";
    }

    const daysCounterElement = document.getElementById("days-counter");
    if (daysCounterElement) {
        daysCounterElement.innerText = `Мы вместе ${diffDays} ${getDayWord(diffDays)}`;
    } else {
        console.error("Элемент счётчика дней не найден.");
    }
}

// Запуск обновления счётчика дней
updateDaysCounter();
setInterval(updateDaysCounter, 60 * 1000); // Обновление каждую минуту
