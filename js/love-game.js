const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const levelDisplay = document.getElementById("level");

// Настройки игры
let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
const maxWidth = 600; // Максимальная ширина игрового поля
const maxHeight = 800; // Максимальная высота игрового поля
const minHeartSize = 35; // Минимальный размер сердечка
const maxHeartSize = 50; // Максимальный размер сердечка

canvas.width = gameWidth;
canvas.height = gameHeight;

let score = 0;
let playerX = (gameWidth - 50) / 2;
const playerY = gameHeight - 105;
const playerWidth = 100;
const playerHeight = 65;
let hearts = [];
let level = 1; // Начальный уровень сложности
let levelThreshold = 10; // Количество очков для перехода на следующий уровень
let heartSpeedFactor = 1; // Коэффициент для скорости падения

const heartImg = new Image();
heartImg.src = "img/pixel-heart.png"; // Пиксельное сердечко

const goldHeartImg = new Image();
goldHeartImg.src = "img/heart.png"; // Золотое сердечко

const frozenHeartImg = new Image();
frozenHeartImg.src = "img/cold_heart.png"; // Заморозочное сердечко

const fireHeartImg = new Image();
fireHeartImg.src = "img/fire.png"; // Огненное сердечко

let eatSound = new Audio("audio/heart.mp3"); // Звук съедания сердечка
eatSound.volume = 1;

// Изображение корзины
let basketImg = new Image();
basketImg.src = "img/bear.png"; // По умолчанию используем стандартное изображение корзины

function drawPlayer() {
    if (basketImg.complete) {
        ctx.drawImage(basketImg, playerX, playerY, playerWidth, playerHeight);
    } else {
        ctx.fillStyle = "#ff3366";
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }
}

// Функция для отрисовки сердца
function drawHeart(heart) {
    const heartSize = getHeartSize(); // Используем функцию для расчета размера
    const img = heart.isGold ? goldHeartImg :
                heart.isBig ? heartImg :
                heart.isFrozen ? frozenHeartImg :
                heart.isFire ? fireHeartImg :
                heartImg;

    // Рисуем сердечко с сохранением пропорций
    ctx.drawImage(img, heart.x, heart.y, heartSize, heartSize);
}

// Функция для расчета размера сердечка
function getHeartSize() {
    const baseSize = Math.min(gameWidth, gameHeight) * 0.06; // Размер зависит от экрана
    return Math.min(maxHeartSize, Math.max(minHeartSize, baseSize)); // Ограничиваем размер
}

let playerFrozen = false;
let freezeTime = 0;
let playerSpeedBoost = false;
let boostTime = 0;
let firePenaltyActive = false;
let firePenaltyDuration = 0;

function updateGame() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    drawPlayer();

    if (playerFrozen) {
        freezeTime--;
        if (freezeTime <= 0) {
            playerFrozen = false;
        }
    }

    if (playerSpeedBoost) {
        boostTime--;
        if (boostTime <= 0) {
            playerSpeedBoost = false;
        }
    }

    if (firePenaltyActive) {
        firePenaltyDuration--;
        if (firePenaltyDuration <= 0) {
            firePenaltyActive = false;
        }
    }

    for (let i = hearts.length - 1; i >= 0; i--) {
        if (!playerFrozen) {
            hearts[i].y += hearts[i].speed * heartSpeedFactor;

            if (hearts[i].type === "moving") {
                hearts[i].x += hearts[i].dx;
                if (hearts[i].x <= 0 || hearts[i].x >= gameWidth - 30) hearts[i].dx = -hearts[i].dx;
            }

            if (hearts[i].type === "disappearing" && hearts[i].disappearTime > 0) {
                hearts[i].disappearTime--;
                ctx.globalAlpha = hearts[i].disappearTime / 100;
            } else {
                ctx.globalAlpha = 1;
            }

            if (hearts[i].type === "parabolic" && level >= 7) {
                hearts[i].x += hearts[i].dx;
                hearts[i].y += hearts[i].dy;
                hearts[i].dy += 0.1; // Гравитация для параболической траектории
            }

            drawHeart(hearts[i]);

            const heartSize = Math.min(gameWidth, gameHeight) * 0.06;
            if (
                hearts[i].y > playerY &&
                hearts[i].x > playerX &&
                hearts[i].x < playerX + playerWidth
            ) {
                let points = 0;
                if (hearts[i].isGold) {
                    points = 3; // Если золотое сердце, даем больше очков
                } else if (hearts[i].isBig) {
                    points = -3; // Если большое сердце, вычитаем очки
                } else if (hearts[i].isFrozen) {
                    points = -10; // Если заморозочное сердце, вычитаем очки
                } else if (hearts[i].isFire) {
                    playerSpeedBoost = true;
                    boostTime = 200; // Ускорение на 2 секунды (при 60 FPS)
                } else {
                    points = 1; // Обычное сердце
                }

                if (!firePenaltyActive) {
                    score += points;
                    scoreDisplay.textContent = score;
                    eatSound.play(); // Проигрываем звук съедания сердечка
                }

                hearts.splice(i, 1);
            } else if (hearts[i].y > gameHeight) {
                if (hearts[i].isBig) {
                    score -= 1; // Если большое сердце пропущено, вычитаем очки
                } else if (hearts[i].isFrozen) {
                    playerFrozen = true;
                    freezeTime = 200; // Заморозка на 2 секунды (при 60 FPS)
                } else if (hearts[i].isFire) {
                    firePenaltyActive = true;
                    firePenaltyDuration = 600; // 10 секунд (при 60 FPS)
                }
                hearts.splice(i, 1);
            }
        }
    }

    // Обновляем отображение уровня
    levelDisplay.textContent = `Уровень: ${level}`;

    // Увеличение уровня сложности при достижении порога очков
    if (score >= level * levelThreshold) {
        level++;
        levelThreshold += 10; // Увеличиваем порог для следующего уровня
        heartSpeedFactor += 0.2; // Увеличиваем коэффициент скорости падения
        updateHeartDifficulty(); // Обновляем сложность сердец
    }

    if (score >= 1000) {
        message.style.display = "block";
    } else {
        requestAnimationFrame(updateGame);
    }

    // Обновляем лучший результат
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        bestScoreDisplay.textContent = bestScore;
    }
}

function spawnHeart() {
    const heartSize = Math.min(gameWidth, gameHeight) * 0.06;
    const x = Math.random() * (gameWidth - heartSize);
    const speed = Math.random() * 2 + 1 + (level - 1) * 0.5; // Скорость падения зависит от уровня
    let type = "normal"; // Обычное сердце
    let isGold = false; // Флаг для золотого сердца
    let isBig = false; // Флаг для большого сердца
    let isFrozen = false; // Флаг для заморозочного сердца
    let isFire = false; // Флаг для огненного сердца

    // Добавляем случайность для золотого сердца
    if (Math.random() < 0.1) {
        isGold = true; // 10% шанс на золотое сердце
    }

    // Добавляем случайность для большого сердца
    if (Math.random() < 0.05) {
        isBig = true; // 5% шанс на большое сердце
    }

    // Добавляем случайность для заморозочного сердца
    if (Math.random() < 0.03) {
        isFrozen = true; // 3% шанс на заморозочное сердце
    }

    // Добавляем случайность для огненного сердца
    if (Math.random() < 0.02) {
        isFire = true; // 2% шанс на огненное сердце
    }

    // Добавляем типы сердец на более высоких уровнях
    if (level > 3 && Math.random() < 0.2) {
        type = "moving"; // Сердечко с движущейся траекторией
    } else if (level > 5 && Math.random() < 0.2) {
        type = "disappearing"; // Исчезающее сердечко
    } else if (level > 7 && Math.random() < 0.2 && isBig) {
        type = "parabolic"; // Параболическое движение для большого сердца
    }

    hearts.push({
        x,
        y: 0,
        speed,
        type,
        isGold, // Передаем флаг золотого сердца
        isBig, // Передаем флаг большого сердца
        isFrozen, // Передаем флаг заморозочного сердца
        isFire, // Передаем флаг огненного сердца
        dx: Math.random() * 2 - 1, // Двигается ли по оси X
        dy: -Math.random() * 2, // Начальная скорость по оси Y для параболического движения
        disappearTime: Math.random() * 100, // Время исчезновения
    });

    setTimeout(spawnHeart, 1000 - Math.min(level * 50, 500)); // Уменьшаем интервал с каждым уровнем
}

function updateHeartDifficulty() {
    // Увеличиваем скорость падения сердечек, добавляем новые типы
    if (level > 3) {
        spawnHeart = () => {
            const heartSize = Math.min(gameWidth, gameHeight) * 0.06;
            const x = Math.random() * (gameWidth - heartSize); // Ограничиваем область появления
            const speed = Math.random() * (1 + level * 0.5) + 1;
            let type = "normal";

            // Добавляем случайность для других типов сердец
            if (level > 3 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "moving",
                    dx: Math.random() * 2 - 1,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else if (level > 5 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "disappearing",
                    dx: 0,
                    disappearTime: Math.random() * 100,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else if (level > 7 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "parabolic",
                    dx: Math.random() * 2 - 1,
                    dy: -Math.random() * 2,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type,
                    dx: 0,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            }

            setTimeout(spawnHeart, 1000 - Math.min(level * 50, 500));
        };
    }
}


function movePlayer(event) {
    if (!playerFrozen) {
        const step = playerSpeedBoost ? 60 : 30; // Увеличенный шаг при ускорении
        if (event.key === "ArrowLeft" && playerX > 0) {
            playerX -= step;
        } else if (event.key === "ArrowRight" && playerX < gameWidth - playerWidth) {
            playerX += step;
        }
    }
}

window.addEventListener("keydown", movePlayer);

let touchStartX = 0;
window.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX; // Запоминаем начальную позицию касания
});

window.addEventListener("touchmove", (event) => {
    if (!playerFrozen) {
        const touchX = event.touches[0].clientX; // Текущая позиция касания
        const deltaX = touchX - touchStartX; // Разница между текущей и начальной позицией
        const speedMultiplier = 2; // Коэффициент ускорения движения

        // Перемещаем игрока с учетом ускорения
        playerX += deltaX * speedMultiplier;

        // Ограничиваем перемещение игрока в пределах игрового поля
        if (playerX < 0) playerX = 0;
        if (playerX > gameWidth - playerWidth) playerX = gameWidth - playerWidth;

        touchStartX = touchX; // Обновляем начальную позицию для следующего движения
    }
});
// Обновление размеров канваса и позиций при изменении размера окна
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    const maxWidth = 600;
    const maxHeight = 800;
    gameWidth = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
    gameHeight = window.innerHeight > maxHeight ? maxHeight : window.innerHeight;
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    playerX = (gameWidth - playerWidth) / 2;
    playerY = gameHeight - playerHeight - 10;
    hearts.forEach(heart => {
        heart.y += heart.speed * heartSpeedFactor;
        if (heart.type === "moving") {
            heart.x += heart.dx;
            if (heart.x <= 0 || heart.x >= gameWidth) heart.dx = -heart.dx;
        }
        if (heart.type === "parabolic") {
            heart.x += heart.dx;
            heart.y += heart.dy;
            heart.dy += 0.1;
        }
    });
}

function spawnHeart() {
    const heartSize = Math.min(gameWidth, gameHeight) * 0.06;
    const x = Math.random() * (gameWidth - heartSize);
    const speed = Math.random() * 2 + 1 + (level - 1) * 0.5; // Скорость падения зависит от уровня
    let type = "normal"; // Обычное сердце
    let isGold = false; // Флаг для золотого сердца
    let isBig = false; // Флаг для большого сердца
    let isFrozen = false; // Флаг для заморозочного сердца
    let isFire = false; // Флаг для огненного сердца

    // Добавляем случайность для золотого сердца
    if (Math.random() < 0.1) {
        isGold = true; // 10% шанс на золотое сердце
    }

    // Добавляем случайность для большого сердца
    if (Math.random() < 0.05) {
        isBig = true; // 5% шанс на большое сердце
    }

    // Добавляем случайность для заморозочного сердца
    if (Math.random() < 0.03) {
        isFrozen = true; // 3% шанс на заморозочное сердце
    }

    // Добавляем случайность для огненного сердца
    if (Math.random() < 0.02) {
        isFire = true; // 2% шанс на огненное сердце
    }

    // Добавляем типы сердец на более высоких уровнях
    if (level > 3 && Math.random() < 0.2) {
        type = "moving"; // Сердечко с движущейся траекторией
    } else if (level > 5 && Math.random() < 0.2) {
        type = "disappearing"; // Исчезающее сердечко
    } else if (level > 7 && Math.random() < 0.2 && isBig) {
        type = "parabolic"; // Параболическое движение для большого сердца
    }

    hearts.push({
        x,
        y: 0,
        speed,
        type,
        isGold, // Передаем флаг золотого сердца
        isBig, // Передаем флаг большого сердца
        isFrozen, // Передаем флаг заморозочного сердца
        isFire, // Передаем флаг огненного сердца
        dx: Math.random() * 2 - 1, // Двигается ли по оси X
        dy: -Math.random() * 2, // Начальная скорость по оси Y для параболического движения
        disappearTime: Math.random() * 100, // Время исчезновения
    });

    setTimeout(spawnHeart, 1000 - Math.min(level * 50, 500)); // Уменьшаем интервал с каждым уровнем
}

function updateHeartDifficulty() {
    // Увеличиваем скорость падения сердечек, добавляем новые типы
    if (level > 3) {
        spawnHeart = () => {
            const heartSize = Math.min(gameWidth, gameHeight) * 0.06;
            const x = Math.random() * (gameWidth - heartSize); // Ограничиваем область появления
            const speed = Math.random() * (1 + level * 0.5) + 1;
            let type = "normal";

            // Добавляем случайность для других типов сердец
            if (level > 3 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "moving",
                    dx: Math.random() * 2 - 1,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else if (level > 5 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "disappearing",
                    dx: 0,
                    disappearTime: Math.random() * 100,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else if (level > 7 && Math.random() < 0.2) {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type: "parabolic",
                    dx: Math.random() * 2 - 1,
                    dy: -Math.random() * 2,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            } else {
                hearts.push({
                    x,
                    y: 0,
                    speed,
                    type,
                    dx: 0,
                    disappearTime: 0,
                    isGold: Math.random() < 0.1, // 10% шанс на золотое сердце
                    isBig: Math.random() < 0.05, // 5% шанс на большое сердце
                    isFrozen: Math.random() < 0.03, // 3% шанс на заморозочное сердце
                    isFire: Math.random() < 0.02, // 2% шанс на огненное сердце
                });
            }

            setTimeout(spawnHeart, 1000 - Math.min(level * 50, 500));
        };
    }
}

const bestScoreDisplay = document.getElementById("bestScore");
let bestScore = localStorage.getItem("bestScore") ? parseInt(localStorage.getItem("bestScore"), 10) : 0; // Загружаем лучший результат из localStorage
bestScoreDisplay.textContent = bestScore;

// Обработка изменения размера окна
function resizeCanvas() {
    gameWidth = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
    gameHeight = window.innerHeight > maxHeight ? maxHeight : window.innerHeight;
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    playerX = (gameWidth - playerWidth) / 2;
}

window.addEventListener("resize", resizeCanvas);

spawnHeart();
updateGame();