# color-insight

----

获取图片颜色均值，并返回rgba数组


## 使用说明
安装 `npm i color-insight`

```shell
import { colorInsight } from 'color-insight';

(async () => {
  const imgSrc = './src/assets/img/test.jpg'
  const rgba = await colorInsight(src);
  // return [255,255,255,1]
})()
```

## 注意事项
如果图片域和当前域不同时，需要配置CORS，否则无法获取到图片颜色

## 效果预览
轮播图由swiper实现，此插件不包含轮播图代码，可以参考./src/main.ts

![效果预览](https://ihtmlcss-npm.oss-cn-beijing.aliyuncs.com/%40ihtmlcss/color-insight/preview.gif "效果预览")

### 完整示例代码

```javascript
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
```

## 开发
```shell
npm i
npm run dev
```
