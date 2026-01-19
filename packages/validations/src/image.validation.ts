import { z } from "zod";

// Backend schema (for server-side validation with express-fileupload)
export const imageSchema = (maxSizeInMb: number) =>
  z
    .object({
      mimetype: z.enum(["image/png", "image/jpeg", "image/jpg"], {
        message: "Image must be a png, jpg or jpeg.",
      }),
      size: z.number(),
    })
    .refine((file) => file.size <= maxSizeInMb * 1024 * 1024, {
      message: `The image size must be less than ${maxSizeInMb}MB.`,
      path: ["size"],
    });

// Frontend schema (for File objects in the browser)
export const imageFileSchema = (maxSizeInMb: number) =>
  z
    .any()
    .refine((file) => file?.size !== undefined, {
      message: "Please select an image file.",
    })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      {
        message: "Image must be a PNG, JPG, or JPEG file.",
      },
    )
    .refine((file) => file.size <= maxSizeInMb * 1024 * 1024, {
      message: `Image size must be less than ${maxSizeInMb}MB.`,
    });

export const imageValidation = (image: any, maxSizeInMb: number) => {
  const parseResult = imageSchema(maxSizeInMb).safeParse(image);
  if (!parseResult.success) {
    return {
      error: true,
      message: parseResult.error.flatten().fieldErrors,
    };
  }
  return { error: false };
};

// Frontend validation function for File objects
export const validateImageFile = (
  file: File | null,
  maxSizeInMb: number,
): { error: boolean; message?: string } => {
  if (!file) {
    return { error: false };
  }

  const result = imageFileSchema(maxSizeInMb).safeParse(file);
  if (!result.success) {
    const issues = result.error.issues;
    const firstError = issues[0];
    return {
      error: true,
      message: firstError?.message || "Invalid image file.",
    };
  }
  return { error: false };
};
