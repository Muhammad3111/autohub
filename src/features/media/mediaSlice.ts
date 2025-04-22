/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../app/api/apiSlice";
import { s3 } from "../../s3/s3Client";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

type S3ListResponse = {
  keys: string[];
  isTruncated: boolean;
  nextContinuationToken?: string;
};

export const s3Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getS3Objects: builder.query<
      S3ListResponse,
      {
        bucket: string;
        prefix?: string;
        continuationToken?: string;
        maxKeys?: number;
      }
    >({
      async queryFn({ bucket, prefix = "", continuationToken, maxKeys = 20 }) {
        try {
          const command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: prefix,
            ContinuationToken: continuationToken,
            MaxKeys: maxKeys,
          });

          const response = await s3.send(command);

          return {
            data: {
              keys:
                response.Contents?.map((item) => item.Key).filter(
                  (key): key is string => !!key
                ) || [],
              isTruncated: response.IsTruncated || false,
              nextContinuationToken: response.NextContinuationToken,
            },
          };
        } catch (error) {
          return { error: error as any };
        }
      },
      providesTags: ["MEDIA"],
    }),

    uploadToS3: builder.mutation<
      { key: string },
      { bucket: string; key: string; body: any; contentType: string }
    >({
      async queryFn({ bucket, key, body, contentType }) {
        try {
          const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: contentType,
            ACL: "public-read",
          });

          await s3.send(command);
          return { data: { key } };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: ["MEDIA"],
    }),
    deleteFromS3: builder.mutation<
      { success: boolean },
      { bucket: string; key: string }
    >({
      async queryFn({ bucket, key }) {
        try {
          const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
          });

          await s3.send(command);
          return { data: { success: true } };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: ["MEDIA"],
    }),
  }),
});

export const {
  useGetS3ObjectsQuery,
  useLazyGetS3ObjectsQuery,
  useUploadToS3Mutation,
  useDeleteFromS3Mutation,
} = s3Api;
