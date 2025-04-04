import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../s3/s3Client";

export const uploadToObjectStorage = async (
  bucket: string,
  key: string,
  body: Uint8Array,
  contentType = "application/json"
) => {
  try {
    console.log("Type of the body________________");

    console.log(body);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: "public-read",
    });

    await s3.send(command);
    console.log("✅ Upload successful!");
    return key;
  } catch (error) {
    console.error("❌ Upload error:", error);
    throw error;
  }
};
