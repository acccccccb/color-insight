// 均匀获取指定数量的图片坐标
export const generatePixelCoordinates = (ctx: CanvasRenderingContext2D, width:number, height:number, num:number) => {
    const n = width * height < num ? num : width * height;
    const coordinates = [];
    const cols = Math.ceil(Math.sqrt(n * (width / height))); // 计算列数
    const rows = Math.ceil(n / cols); // 计算行数
    const xInterval = width / (cols - 1); // 计算水平间隔
    const yInterval = height / (rows - 1); // 计算垂直间隔

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (coordinates.length >= n) break; // 如果已经获得了n个点，则退出循环
            const x = Math.round(j * xInterval);
            const y = Math.round(i * yInterval);
            const imageData = ctx.getImageData(
                x,
                y,
                1,
                1,
            );
            const rgba = [imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3]];
            coordinates.push(rgba);
        }
        if (coordinates.length >= n) break; // 如果已经获得了n个点，则退出循环
    }

    return coordinates;
}

// 图片文件转base64
export const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export const colorInsight = async (dataUrl: string, max: number = 1440) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            const width = img.width;
            const height = img.height;
            const rate = width / height;
            const canvasWidth = 120;
            canvas.width = canvasWidth;
            canvas.height = canvasWidth * rate;
            // 将图片缩放为 100 x 100
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,canvas.width, canvas.height);
            const colorArr = generatePixelCoordinates(ctx, canvas.width, canvas.height, canvas.width * canvas.height).filter(item => {
                return item[0] > 10 && item[0] < 250 &&
                    item[1] > 10 && item[1] < 250 &&
                    item[2] > 10 && item[2] < 250 &&
                    item[3] > 50
            });
            // 抽取中间值
            const range = 0.6;
            const resultArr = colorArr.splice(Math.floor(colorArr.length * (range / 2)), Math.floor(colorArr.length * (1 - range)));
            // 计算rgba均值
            const rgba = resultArr.reduce((acc, cur) => {
                acc[0] += cur[0];
                acc[1] += cur[1];
                acc[2] += cur[2];
                acc[3] += cur[3];
                return acc;
            }, [0, 0, 0, 0]).map(item => Math.floor(item / resultArr.length));
            resolve(rgba);
        }
        img.src = dataUrl;
    })
}


