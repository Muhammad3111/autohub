import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3 } from "../../s3/s3Client";

export const listObjectsFromS3 = async (
  bucket: string,
  prefix: string = "",
  continuationToken?: string,
  maxKeys: number = 20 // Bir sahifada 20 ta fayl olib kelish uchun
): Promise<{
  keys: string[];
  isTruncated: boolean;
  nextContinuationToken?: string;
}> => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: continuationToken,
      MaxKeys: maxKeys,
    });

    const response = await s3.send(command);

    return {
      keys:
        response.Contents?.map((item) => item.Key).filter(
          (key): key is string => !!key
        ) || [],
      isTruncated: response.IsTruncated || false,
      nextContinuationToken: response.NextContinuationToken,
    };
  } catch (error) {
    console.error("List error:", error);
    throw error;
  }
};
