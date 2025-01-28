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
