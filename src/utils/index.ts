// 均匀获取指定数量的图片坐标
export const generatePixelCoordinates = (ctx, width, height, num) => {
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
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export const colorInsight = async (dataUrl: string, max: number = 100) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;
            // 将图片缩放为 100 x 100
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,canvas.width, canvas.height);
            const colorArr = generatePixelCoordinates(ctx, canvas.width, canvas.height, max);

            // 计算rgba均值
            const rgba = colorArr.reduce((acc, cur) => {
                acc[0] += cur[0];
                acc[1] += cur[1];
                acc[2] += cur[2];
                acc[3] += cur[3];
                return acc;
            }, [0, 0, 0, 0]).map(item => Math.floor(item / colorArr.length));
            resolve(rgba);
        }
        img.src = dataUrl;
    })
}


