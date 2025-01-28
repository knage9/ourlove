const iconmenu = document.querySelector(".header_burger");
if (iconmenu) {
    const menubody = document.querySelector(".telegram-sidebar");
    iconmenu.addEventListener("click", function(e) {
        document.body.classList.toggle("lock");
        iconmenu.classList.toggle("active");
        menubody.classList.toggle("active");
    });

    // Получаем все ссылки внутри бургер-меню
    // const menuLinks = menubody.querySelectorAll("a[href^='#']");
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Закрываем бургер-меню
            document.body.classList.remove("lock");
            iconmenu.classList.remove("active");
            menubody.classList.remove("active");

            // Получаем ID блока, к которому нужно перейти
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            // Прокручиваем страницу к целевому блоку
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

