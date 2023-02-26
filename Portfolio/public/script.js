document.addEventListener("DOMContentLoaded", function (event) {
    // Dark theme
    var prevActiveTheme = localStorage.getItem("theme-color");
    document.documentElement.setAttribute("data-theme", prevActiveTheme ? prevActiveTheme : "light");
    var themeToggle = document.getElementsByClassName('theme-color-toggle')[0];
    themeToggle.onclick = function () {
        var currentTheme = document.documentElement.getAttribute("data-theme");
        var switchToTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme-color", switchToTheme)
        document.documentElement.setAttribute("data-theme", switchToTheme);
    }
    // AOS
    AOS.init({
        once: true,
        offset: 10,
        duration: 600,
        easing: 'cubic-bezier(0.42, 0, 0.12, 1.28)'
    });
    // kursor
     new kursor({
         type: 4,
         color: '#7E74F1'
     });
    
    // CSS Var support
    cssVars({});
    // Sticky Menu
    var menu = document.getElementsByClassName("header")[0];
    if (window.pageYOffset >= 32) { // fix middle load page issue
        menu.classList.add('sticky');
    }
    var lastScroll = 0;
    window.addEventListener("scroll", function () {
        var currentScroll = window.pageYOffset;
        if (currentScroll <= 32) {
            menu.classList.remove('sticky');
            return;
        } else {
            menu.classList.add('sticky');
        }
        lastScroll = currentScroll;
    });
    // Smooth scroll
    document.querySelectorAll('.header .nav .nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        });
    });
    // Active section
    var sections = document.querySelectorAll("section");
    var navLi = document.querySelectorAll(".header .nav .nav-links li");
    window.onscroll = function () {
        var current = "";
        sections.forEach((section) => {
            var sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 282) {
                current = section.getAttribute("id");
            }
        });
        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.classList.contains(current)) {
                li.classList.add("active");
            }
        });
    };
    // Back to top
    var trigger = document.getElementsByClassName('logo')[0];
    trigger.onclick = function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    // Mobile menu
    var mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle')[0];
    mobileMenuToggle.onclick = function () {
        document.querySelector(".header .nav .nav-links").classList.toggle('active');
    }
    // Portfolio slider
    var numberOfSlides = document.querySelectorAll('.swiper-slide').length;
    new Swiper('.swiper', {
        loop: false,
        allowSlidePrev: numberOfSlides !== 1,
        allowSlideNext: numberOfSlides !== 1,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
            1151: {
                slidesPerView: 3,
                spaceBetween: 56,
            },
        },
        navigation: {
            nextEl: '.slider-navigation .next',
            prevEl: '.slider-navigation .prev',
        },
    });
    // Skill
    var bars = document.querySelectorAll(".progress-bar .main-bar .fill");
    window.addEventListener('scroll', function () {
        if (isInViewport(document.getElementsByClassName('progress-bar-wrapper')[0])) {
            bars.forEach(item => {
                if (isInViewport(item)) {
                    item.style.width = item.getAttribute('data-width') + '%';
                }
            })
        }
    });

    function isInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
})
