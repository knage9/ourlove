const texts = [
    "Часть 2",
    "Наша встреча была внезапной,",
    "Но в тебе я сразу увидел что-то особенное, что никогда не видел раньше",
    "Я сразу влюбился в твою улыбку,",
    "И я понял: хочу радовать тебя снова и снова",
    "Впервые в жизни мне захотелось подарить цветы",
    "И это были мои первые цветы",
    "Мы гуляли по Царицыно,",
    "Но, если честно, я не мог отвести от тебя взгляд",
    "В голове крутилась лишь одна мысль: как тебе понравиться?",
    "Вдруг я что-то сделаю не так?",
    "Мы прекрасно погуляли и поехали в центр",
    "Всю дорогу я думал, что надо позвать тебя на свидание,",
    "И сделал это, не сомневаясь в своём решении",
    "Я чувствовал, что меня тянет к тебе всем сердцем",
    "Что именно ты — моя судьба"
];


let currentTextIndex = 0; // Индекс текущего текста
const textOutput = document.getElementById('textOutput'); // Получаем элемент для вывода текста
const txtContainer = document.querySelector('.txt-container'); // Получаем контейнер для текста
const slider = document.getElementById('slider'); // Получаем контейнер для слайдера
const slideImage = document.getElementById('slideImage'); // Получаем элемент изображения в слайдере

// Массив с изображениями для слайдера
const images = [
    'first_day/1.jpg',
    'first_day/2.jpg',
    'first_day/3.jpg',
    'first_day/4.jpg',
    'first_day/5.jpg',
    'first_day/6.jpg',
    'first_day/7.jpg',
    'first_day/8.jpg',
    'first_day/9.jpg',
    'first_day/10.jpg',
    'first_day/11.jpg',
    'first_day/12.jpg',
    'first_day/13.jpg',
    'first_day/14.jpg',
    'first_day/15.jpg',
    'first_day/16.jpg',
    'first_day/17.jpg',
    'first_day/18.jpg',
    'first_day/19.jpg',
    'first_day/20.jpg',
    'first_day/21.jpg',
    'first_day/22.jpg',
    'first_day/23.jpg',
    'first_day/24.jpg',
    'first_day/25.jpg',
    'first_day/26.jpg',
    'first_day/27.jpg',
    'first_day/28.jpg',
    'first_day/29.jpg',
    'first_day/30.jpg',
    'first_day/31.jpg',
    'first_day/32.jpg',
    'first_day/33.jpg',
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
    music.volume = 0.2; // Устанавливаем уровень громкости (от 0.0 до 1.0)
    music.currentTime = 37; // Устанавливаем таймкод, с которого начнётся песня
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
            window.location.href = "page_2.html"; // Переход на новую страницу
        }
    }, interval);
}
