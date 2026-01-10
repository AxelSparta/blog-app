"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema, type PostFormData } from "@/lib/validations/post";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/RichTextEditor";
import { createPost } from "@/lib/services/posts";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Save, Send } from "lucide-react";
import Image from "next/image";

const DRAFT_STORAGE_KEY = "blog-post-draft";

const CATEGORIES = [
  { value: "technology", label: "Technology" },
  { value: "art", label: "Art" },
  { value: "science", label: "Science" },
  { value: "cinema", label: "Cinema" },
  { value: "design", label: "Design" },
  { value: "food", label: "Food" },
] as const;

export default function WritePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "technology",
      image: null,
    },
  });

  const watchedImage = form.watch("image");

  // Load draft from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          form.reset({
            title: draft.title || "",
            content: draft.content || "",
            category: draft.category || "technology",
            image: null,
          });
          if (draft.imagePreview) {
            setImagePreview(draft.imagePreview);
          }
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      }
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (typeof window !== "undefined") {
        const draft = {
          title: value.title || "",
          content: value.content || "",
          category: value.category || "technology",
          imagePreview: imagePreview || null,
        };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, imagePreview]);

  // Handle image preview
  useEffect(() => {
    if (watchedImage && watchedImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(watchedImage);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: PostFormData) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to create a post");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      await createPost(formData);

      // Clear draft after successful submission
      if (typeof window !== "undefined") {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }

      toast.success("Post created successfully!");
      form.reset();
      setImagePreview(null);
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const currentValues = form.getValues();
    const draft = {
      title: currentValues.title || "",
      content: currentValues.content || "",
      category: currentValues.category || "technology",
      imagePreview: imagePreview || null,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      toast.success("Draft saved!");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Write a New Post</h1>
        <p className="text-muted-foreground">
          Share your thoughts with the world
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your post title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field}>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Featured Image (Optional)</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file || null);
                      }}
                      {...field}
                    />
                    {imagePreview && (
                      <div className="relative w-full h-64 rounded-md overflow-hidden border">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            onChange(null);
                            setImagePreview(null);
                            form.setValue("image", null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Start writing your post content..."
                    error={!!form.formState.errors.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
