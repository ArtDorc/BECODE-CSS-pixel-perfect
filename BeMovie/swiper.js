const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween:19,
        slidesPerView: 1,
        breakpoints: {
            500:{
                slidesPerView:2,
            },
            768:{
                slidesPerView:3,
            },
            1250: {
                slidesPerView:4,
            },
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        grabCursor: true,
    });