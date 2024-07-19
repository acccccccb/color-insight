import {colorInsight} from './utils/index'

(function() {
    const bgColor = new Array(5);
    new Swiper('.swiper', {
        autoplay: true,
        loop: true,
        speed: 100,
        delay: 1000,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: async () => {
                const src = document.getElementById(`slide_1`)?.src;
                const rgba = bgColor[0] || await colorInsight(src);
                document.getElementById('app').style.background =  `rgba(${rgba.join(",")})`;
                const titleMaskColor = [...rgba];
                titleMaskColor[titleMaskColor.length - 1] = 0.7;
                document.getElementById('slide_title_1').style.background =  `rgba(${titleMaskColor.join(",")})`;
                bgColor[0] = rgba;
            },
            slideChangeTransitionStart: async ({realIndex}) => {
                const src = document.getElementById(`slide_${realIndex + 1}`)?.src;
                const rgba = bgColor[realIndex] || await colorInsight(src);
                bgColor[realIndex] = rgba;
                setTimeout(() => {
                    document.getElementById('app').style.background =  `rgba(${rgba.join(",")})`;
                    const titleMaskColor = [...rgba];
                    titleMaskColor[titleMaskColor.length - 1] = 0.7;
                    document.getElementById(`slide_title_${realIndex + 1}`).style.background =  `rgba(${titleMaskColor.join(",")})`;
                }, 10)
            }
        }
    });
})()
