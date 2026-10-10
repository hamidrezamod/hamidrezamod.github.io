document.addEventListener("DOMContentLoaded", () => {
    
    // 1. انتخاب خودکار عناصر برای انیمیشن
    
    // الف) عناصر تک ستونه (حرکت عمودی)
    // با اضافه کردن :not(.no-animate) به جاوا اسکریپت میگیم عکس هایی که این کلاس رو دارن رو انیمیشن نده
    const verticalElements = document.querySelectorAll(`
        .bottom-card, 
        .content-image:not(.no-animate), 
        .full-width-image, 
        .final-box, 
        .charts-wrapper, 
        .about-product-section .card-white:not(.grid-2 .card-white)
    `);
    
    verticalElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });

    // ب) عناصر دو ستونه یا سمت چپ
    const leftElements = document.querySelectorAll(`
        .top-card:nth-child(odd),
        .projects-grid-2 .small-project-card:nth-child(odd),
        .projects-grid-3 .small-project-card:nth-child(1),
        .grid-2 > div:nth-child(odd),
        .square-card:nth-child(odd)
    `);
    
    leftElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-left');
    });

     // ج) عناصر دو ستونه یا سمت راست
    const rightElements = document.querySelectorAll(`
        .top-card:nth-child(even),
        .projects-grid-2 .small-project-card:nth-child(even),
        .projects-grid-3 .small-project-card:nth-child(3),
        .grid-2 > div:nth-child(even),
        .square-card:nth-child(even)
    `);
    
    rightElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-right');
    });

    // د) کارت وسطی در صفحات وب دیزاین در صفحات داخلی
    const middleElements = document.querySelectorAll('.projects-grid-3 .small-project-card:nth-child(2)');
    middleElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-vertical', 'from-bottom');
    });

    // 2. راه اندازی Intersection Observer برای اجرای انیمیشن ها
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
                if (entry.target.classList.contains('fade-vertical')) {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('from-top');
                        entry.target.classList.add('from-bottom');
                    } else {
                        entry.target.classList.remove('from-bottom');
                        entry.target.classList.add('from-top');
                    }
                }
            }
        });
    }, observerOptions);
    // --- تغییر تمام انیمیشن ها به حالت عمودی در موبایل ---
    if (window.innerWidth <= 768) {
        const allAnimated = document.querySelectorAll('.animate-on-scroll');
        allAnimated.forEach(el => {
            el.classList.remove('fade-left', 'fade-right');
            if (!el.classList.contains('fade-vertical')) {
                el.classList.add('fade-vertical', 'from-bottom');
            }
        });
    }
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

});

    // --- Language Switcher Logic ---
    const btnEn = document.getElementById('btn-en');
    const btnFa = document.getElementById('btn-fa');
    const textEn = document.querySelectorAll('.lang-en');
    const textFa = document.querySelectorAll('.lang-fa');

    if (btnEn && btnFa) {
        // تغییر به فارسی
        btnFa.addEventListener('click', () => {
            btnFa.classList.add('active');
            btnEn.classList.remove('active');
            
            textEn.forEach(el => el.style.display = 'none');
            textFa.forEach(el => el.style.display = 'block');
            
            // آپدیت انیمیشن ها بعد از تغییر زبان
            scrollObserver.disconnect();
            animatedElements.forEach(el => scrollObserver.observe(el));
        });

        // تغییر به انگلیسی
        btnEn.addEventListener('click', () => {
            btnEn.classList.add('active');
            btnFa.classList.remove('active');
            
            textFa.forEach(el => el.style.display = 'none');
            textEn.forEach(el => el.style.display = 'block');
            
            // آپدیت انیمیشن ها
            scrollObserver.disconnect();
            animatedElements.forEach(el => scrollObserver.observe(el));
        });
    }
  
