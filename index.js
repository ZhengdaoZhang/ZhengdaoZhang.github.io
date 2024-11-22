const fs = require("fs");
const Exif = require("exif");
const { exec } = require('child_process')

// 指定文件夹路径
const folderPath = './assets/photos';

// 读取文件夹下的所有文件名
fs.readdir(folderPath, async (err, fileNames) => {
    console.log(fileNames)
    if (err) {
        console.error(err);
        return;
    }
    let arr = [];
    for (let fileName of fileNames) {
        const imgInfo = await readImg(folderPath + "/" + fileName);
        const { image: { Make, Model }, exif: { ExposureTime, FNumber, ISO, FocalLength, FocalLengthIn35mmFormat, CreateDate, LensModel } } = imgInfo;
        console.log(imgInfo);
        const data = {
            fileName,
            Make,
            Model,
            FocalLength,
            FocalLengthIn35mmFormat,
            ExposureTime,
            FNumber,
            ISO,
            LensModel,
            CreateDate: formatCareteDate(CreateDate),
        }
        arr.push(data)
    }
    //复制到剪切板

    exec('clip').stdin.end(JSON.stringify(arr))
});

function readImg(url) {
    return new Promise((resolve, reject) => {
        Exif(url, (err, info) => {
            if (err) {
                reject(err);
            }
            resolve(info)
        })
    })
}
//日期格式 2021:05:04 12:55:57
function formatCareteDate(date) {
    const a = date.split(" ");
    a[0] = a[0].replace(/:/g, "\/");
    return a.join(" ")
}

