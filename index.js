const fs = require("fs");
const Exif = require("exif");
const { exec } = require('child_process')

// 指定文件夹路径
const folderPath = './1';

// 读取文件夹下的所有文件名
fs.readdir(folderPath, async (err, fileNames) => {
    if (err) {
        console.error(err);
        return;
    }
    let arr = [];
    for (let fileName of fileNames) {

        const { image: { Make, Model }, exif: { ExposureTime, FNumber, ISO, FocalLength, CreateDate, LensModel } } = await readImg(folderPath + "/" + fileName);

        const data = {
            fileName,
            Make,
            Model,
            FocalLength,
            ExposureTime,
            FNumber,
            ISO,
            LensModel,
            CreateDate: formatCareteDate(CreateDate),
            type: 0
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

