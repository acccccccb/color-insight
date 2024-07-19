import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        target: 'esnext',
        // 设置输出格式
        lib: {
            entry: './src/utils/index.ts', // 入口文件
            name: 'colorInsight',       // 打包后的全局变量名
            fileName: (format) => `index.${format}.js`, // 输出文件名
            formats: ['es'],  // 输出格式
        },
    }
});
