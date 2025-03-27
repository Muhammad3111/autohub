import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: import.meta.env.VITE_S3_REGION as string, // region farqi yo‘q, Contabo uchun shunchaki yoziladi
  endpoint: import.meta.env.VITE_S3_URL as string, // Contabo S3 endpoint
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESSKEYID as string,
    secretAccessKey: import.meta.env.VITE_SECRETACCESSKEY as string,
  },
  forcePathStyle: true, // Contabo uchun ham false yoki true bo‘lishi mumkin, ammo odatda false ishlaydi
});
