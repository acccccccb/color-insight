import {colorInsight} from './utils/index'

(function() {
    const bgColor = new Array(5);
    new Swiper('.swiper', {
        // Optional parameters
        // direction: 'vertical',
        autoplay: true,
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: async () => {
                const src = document.getElementById(`slide_1`)?.src;
                const rgba = bgColor[0] || await colorInsight(src);
                document.getElementById('app').style.background =  `linear-gradient(to bottom, rgba(255,255,255,1), rgba(${rgba.join(",")}))`;
                bgColor[0] = rgba;
            },
            slideChangeTransitionStart: async ({realIndex}) => {
                const src = document.getElementById(`slide_${realIndex + 1}`)?.src;
                const rgba = bgColor[realIndex] || await colorInsight(src);
                bgColor[realIndex] = rgba;
                setTimeout(() => {
                    document.getElementById('app').style.background =  `linear-gradient(to bottom, rgba(255,255,255,1), rgba(${rgba.join(",")}))`;
                }, 10)
            }
        }
    });
})()
