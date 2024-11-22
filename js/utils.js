
export const loadImage = (url) => {

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (e) => {
            reject(e)
        }
        img.src = url;
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
    return {img,metaData};
}