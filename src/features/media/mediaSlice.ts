/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../app/api/apiSlice";
import { s3 } from "../../s3/s3Client";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

type S3ListResponse = {
  objects: {
    key: string;
    lastModified: string; // yoki Date bo‘lsa undan ham yaxshi
  }[];
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
        search?: string; // ✅ yangi qo‘shildi
      }
    >({
      async queryFn({
        bucket,
        prefix = "",
        continuationToken,
        maxKeys = 20,
        search,
      }) {
        try {
          const command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: prefix,
            ContinuationToken: continuationToken,
            MaxKeys: maxKeys,
          });

          const response = await s3.send(command);

          let objects =
            response.Contents?.map((item) => ({
              key: item.Key!,
              lastModified: item.LastModified!.toISOString(),
              size: item.Size,
            })) || [];

          // ✅ Search qo‘llab-quvvatlash: client tarafda filter
          if (search) {
            const lower = search.toLowerCase();
            objects = objects.filter((obj) =>
              obj.key.toLowerCase().includes(lower)
            );
          }

          return {
            data: {
              objects,
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
