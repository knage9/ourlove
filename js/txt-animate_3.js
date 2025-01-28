const texts = [
    "19 ноября",
    "Наше первое свидание",
    "До сих пор помню, как волнительно было поцеловать тебя в щёку впервые",
    "Ты так мило улыбнулась и тихо засмеялась,",
    "И хотя со стороны я мог казаться спокойным,",
    "На самом деле меня переполняли эмоции",
    "Каждая деталь того дня отпечаталась в моей памяти",
    "Как мы пили кофе, и я нежно вытирал твоё лицо салфеткой",
    "Как мы впервые взялись за руки,",
    "И тот трепетный момент, когда я впервые поцеловал тебя в губы",
    "Как я поднял тебя на руки,",
    "И как ты сказала: «Люблю тебя»"
];

let currentTextIndex = 0; // Индекс текущего текста
const textOutput = document.getElementById('textOutput'); // Получаем элемент для вывода текста
const txtContainer = document.querySelector('.txt-container'); // Получаем контейнер для текста
const slider = document.getElementById('slider'); // Получаем контейнер для слайдера
const slideImage = document.getElementById('slideImage'); // Получаем элемент изображения в слайдере

// Массив с изображениями для слайдера
const images = [
    'our_date/1.jpg',
    'our_date/2.jpg',
    'our_date/3.jpg',
    'our_date/4.jpg',
    'our_date/5.jpg',
    'our_date/6.jpg',
    'our_date/7.jpg',
    'our_date/8.jpg',
    'our_date/9.jpg',
    'our_date/10.jpg',
    'our_date/11.jpg',
    'our_date/12.jpg',
    'our_date/13.jpg',
    'our_date/14.jpg',
    'our_date/15.jpg',
    'our_date/16.jpg',
    'our_date/17.jpg',
    'our_date/18.jpg',
    'our_date/19.jpg',
    'our_date/20.jpg',
    'our_date/21.jpg',
    'our_date/22.jpg',
    'our_date/23.jpg',
    'our_date/24.jpg',
    'our_date/25.jpg',
    'our_date/26.jpg',
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
    music.volume = 0.4; // Устанавливаем уровень громкости (от 0.0 до 1.0)
    music.currentTime = 23; // Устанавливаем таймкод, с которого начнётся песня (8 секунд)
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
            setTimeout(showNextImage, 300); // Увеличенная задержка между изображениями для медленного интернета
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
