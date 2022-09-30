import AWS from 'aws-sdk';
import bluebird from 'bluebird';
require("dotenv").config()
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-2'
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

export default s3;