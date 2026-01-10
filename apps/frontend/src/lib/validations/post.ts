import { z } from "zod";

export const categorySchema = z.enum([
  "technology",
  "art",
  "science",
  "cinema",
  "design",
  "food",
]);

// Helper function to strip HTML tags and get text content length
const getTextContentLength = (html: string): number => {
  if (typeof window === "undefined") {
    // Server-side: simple regex to remove tags (not perfect but works for validation)
    return html.replace(/<[^>]*>/g, "").trim().length;
  }
  // Client-side: use DOM to get accurate text content
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent?.trim().length || 0;
};

export const postFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be at most 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (val) => getTextContentLength(val) >= 20,
      "Content must be at least 20 characters (excluding formatting)"
    )
    .refine(
      (val) => getTextContentLength(val) <= 3000,
      "Content must be at most 3000 characters (excluding formatting)"
    ),
  category: categorySchema,
  image: z.instanceof(File).optional().or(z.null()),
});

export type PostFormData = z.infer<typeof postFormSchema>;
