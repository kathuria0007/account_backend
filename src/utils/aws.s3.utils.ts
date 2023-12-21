import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';
require('dotenv').config();



export const UploadedFileToAWS = (filename: string, data: Buffer | string, ContentType: 'image/jpeg' | 'image/jpg' | 'image/png' | 'video/mp4' | 'application/pdf') => {
    
    return new Promise((resolve, reject) => {

        const S3 = new AWS.S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION,
        });


        let num = Math.round(
            Math.pow(36, 10 + 1) - Math.random() * Math.pow(36, 10)
        )
            .toString(36)
            .slice(1);
        let imageName = num + filename.split(' ').join('');
        if (ContentType == "application/pdf") {
            imageName = filename
        }

        let bucketName = process.env.BUCKET_NAME || '';
        const save = S3.upload({
            Bucket: bucketName,
            Key: imageName,
            Body: data,
            ContentType,
            ACL: "public-read-write"
        }, (err: any, dist: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(dist.Location);
            }
        });
    });
}

export default UploadedFileToAWS;

