const profileCard = document.getElementById('profile-card');
const rejectBtn = document.getElementById('reject-btn');
const matchBtn = document.getElementById('match-btn');
const photos = ['img/photo_1.jpg', 'img/photo_2.jpg', 'img/photo_3.jpg', 'img/photo_4.jpg', 'img/photo_5.jpg'];
let currentPhoto = 0;

document.getElementById('total-photos').textContent = photos.length; // Установка общего числа фото

// Переменные для перетаскивания
let isDragging = false;
let startX, currentX, offsetX = 0;

// Перетаскивание карточки
profileCard.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - offsetX;
    profileCard.classList.add('grabbing');
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        currentX = event.clientX - startX;
        offsetX = currentX;
        profileCard.style.transform = `translateX(${currentX}px) rotate(${currentX / 10}deg)`;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        profileCard.classList.remove('grabbing');
        if (currentX > 100) {
            profileCard.style.transform = 'translateX(1000px) rotate(30deg)';
            setTimeout(() => {
                window.location.href = 'match_page.html';
            }, 500);
        } else if (currentX < -100) {
            profileCard.style.transform = 'translateX(-1000px) rotate(-30deg)';
            setTimeout(() => {
                window.location.href = 'reject_page.html';
            }, 500);
        } else {
            profileCard.style.transform = 'translateX(0) rotate(0deg)';
        }
    }
});

// Смена фото по клику на карточку
profileCard.addEventListener('click', () => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    document.getElementById('profile-photo').src = photos[currentPhoto];
    document.getElementById('photo-number').textContent = currentPhoto + 1;
});

// Кнопки отказа и мэтча
rejectBtn.addEventListener('click', () => {
    profileCard.style.transform = 'translateX(-1000px) rotate(-30deg)';
    setTimeout(() => {
        window.location.href = 'page_3.html';
    }, 500);
});

matchBtn.addEventListener('click', () => {
    profileCard.style.transform = 'translateX(1000px) rotate(30deg)';
    setTimeout(() => {
        window.location.href = 'page_3.html';
    }, 500);
});
