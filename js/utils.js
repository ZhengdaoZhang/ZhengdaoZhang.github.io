
export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (e) => {
            reject(e)
        }
        img.src = url
    })
}

export const getImageInfo = async (url) => {
    const img = await loadImage(url);
    let promise = new Promise((resolve) => {
        EXIF.getData(img, function () {
            var allMetaData = EXIF.getAllTags(this);
            resolve(allMetaData)
        });
    })
    const metaData = await promise
    return { img, metaData }
}

export const canvasToImage = (canvas, MIMEType = "image/png") => {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const newImg = new Image()
            const url = URL.createObjectURL(blob)
            newImg.onload = () => {
                // 不再需要读取该 blob，因此释放该对象 
                // URL.revokeObjectURL(url)
                resolve(newImg)
            };
            newImg.src = url
        }, MIMEType)
    })
}

export const getBaseScaleRate = (width, heihgt, baseSize = 1080) => {
    const shortSide = width > heihgt ? heihgt : width;
    return shortSide / baseSize
}