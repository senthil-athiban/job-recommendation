import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import ApiError from "../config/error";
import { awsConfig } from "../config/config";

export  const getS3Client = () => {
  return new S3Client({
    credentials: {
      accessKeyId: awsConfig.accessKey,
      secretAccessKey: awsConfig.secretKey,
    },
    region: awsConfig.region,
  });
};

export const uploadFileToS3 = async ({ path, file }: { path: string; file: any }) => {
  try {
    const command = new PutObjectCommand({
      Bucket: awsConfig.s3Bucket,
      Key: path,
      Body: file,
      ContentType: file.mimetype,
      ContentDisposition: 'inline' 
    });
    const s3Client = getS3Client();
    return await s3Client.send(command);
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error(
        `Error from S3 while uploading object to ${awsConfig.s3Bucket}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      );
    } else if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${awsConfig.s3Bucket}.  ${caught.name}: ${caught.message}`
      );
    } else {
      throw caught;
    }
  }
};

export const getFileFromS3 = async (params:any): Promise<string> => {
  try {
    const s3Client = getS3Client();
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.log('failed to fetch file from s3:', error);
    throw new ApiError(500, 'Internal server error');
  }
}

export const constructS3Url = (path: string) => {
  return `https://${awsConfig.s3Bucket}.s3.amazonaws.com/${path}`
}