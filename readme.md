# color-insight

----

获取图片颜色均值，并返回rgba数组

## 预览
```shell
npm i
npm run start
```

## 使用说明
引入 `./src/utils/index.ts`

```shell
import { colorInsight } from './utils/index';

(async () => {
  const imgSrc = './src/assets/img/test.jpg'
  const rgba = await colorInsight(src);
  // return [255,255,255,1]
})()
```
