const texts = [
    "Я очень рад, что ты согласилась",
    "Я уже запланировал кое-что особенное для нашего свидания, и уверен, тебе это точно понравится",
    "Готовься к осеннему уюту)",
    "Я искренне счастлив, что нашел в тебе не только друга, но и человека, с кем хочется идти дальше",
    "Спасибо за доверие. Встретимся совсем скоро 😉",
    "Теперь осталось выбрать день, чтобы мы могли провести его полностью вместе)",
    "Остальные детали расскажу чуть позже"
];

let currentTextIndex = 0; // Индекс текущего текста
const textOutput = document.getElementById('textOutput'); // Получаем элемент для вывода текста
const txtContainer = document.querySelector('.txt-container'); // Получаем контейнер для текста
const slider = document.getElementById('slider'); // Получаем контейнер для слайдера
const slideImage = document.getElementById('slideImage'); // Получаем элемент изображения в слайдере

// Массив с изображениями для слайдера
const images = [
    'autumn/1.jpg',
    'autumn/2.jpg',
    'autumn/3.jpg',
    'autumn/4.jpg',
    'autumn/5.jpg',
    'autumn/6.jpg',
    'autumn/7.jpg',
    'autumn/8.jpg',
    'autumn/9.jpg',
    'autumn/10.jpg',
    'autumn/11.jpg',
    'autumn/12.jpg',
    'autumn/13.jpg',
    'autumn/14.jpg',
    'autumn/15.jpg',
    'autumn/16.jpg',
    'autumn/17.jpg',
    'autumn/18.jpg',
    'autumn/19.jpg',
    'autumn/20.jpg',
    // Добавьте больше изображений по мере необходимости
];

// Прелоад всех изображений для параллельной загрузки
function preloadImages(images) {
    return images.map(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
        return img;
    });
}

// Прелоад изображений перед запуском слайдера
preloadImages(images);

document.getElementById('playButton').addEventListener('click', function() {
    var music = document.getElementById('backgroundMusic');
    music.volume = 0.1; // Устанавливаем уровень громкости (от 0.0 до 1.0)
    music.currentTime = 8; // Устанавливаем таймкод, с которого начнётся песня (8 секунд)
    music.play().catch(function(error) {
        console.error('Ошибка воспроизведения:', error);
    });

    // Скрываем кнопку и показываем контейнер с текстом
    this.style.display = 'none';
    txtContainer.style.display = 'block';

    // Запускаем анимацию текста с задержкой в 2 секунды
    setTimeout(startSlideshow, 2000);
});

function typeText(text, callback) {
    textOutput.textContent = ''; // Очищаем текстовое поле
    let i = 0; // Индекс текущего символа

    const typingInterval = setInterval(() => {
        if (i < text.length) {
            textOutput.textContent += text.charAt(i); // Добавляем символ к тексту
            i++;
        } else {
            clearInterval(typingInterval); // Останавливаем интервал
            callback(); // Вызываем колбек после завершения печати
        }
    }, 50); // Задержка между символами в миллисекундах
}

function startSlideshow() {
    typeText(texts[currentTextIndex], function() {
        currentTextIndex++;
        if (currentTextIndex < texts.length) {
            setTimeout(startSlideshow, 2000); // Задержка перед следующим текстом
        } else {
            setTimeout(startImageSlider, 2000); // Задержка перед началом слайдера
        }
    });
}

function startImageSlider() {
    txtContainer.style.display = 'none'; // Скрываем текстовый контейнер
    slider.style.display = 'flex'; // Показываем слайдер
    let currentImageIndex = 0; // Индекс текущего изображения

    function showNextImage() {
        slideImage.src = images[currentImageIndex]; // Устанавливаем источник изображения
        currentImageIndex++;
        if (currentImageIndex < images.length) {
            setTimeout(showNextImage, 400); // Увеличенная задержка между изображениями для медленного интернета
        } else {
            setTimeout(hideElements, 2000); // Задержка перед переходом на новую страницу
        }
    }

    showNextImage(); // Запускаем показ изображений
}

function hideElements() {
    const music = document.getElementById('backgroundMusic');
    const fadeOutDuration = 2000; // Продолжительность уменьшения громкости в миллисекундах
    const interval = 50; // Интервал уменьшения громкости в миллисекундах
    const step = (music.volume / (fadeOutDuration / interval)); // Шаг уменьшения громкости

    const fadeOutInterval = setInterval(() => {
        if (music.volume > step) {
            music.volume -= step; // Уменьшаем громкость
        } else {
            music.volume = 0; // Устанавливаем громкость на 0
            clearInterval(fadeOutInterval); // Очищаем интервал
            music.pause(); // Останавливаем музыку
            window.location.href = "index.html"; // Переход на новую страницу
        }
    }, interval);
}
