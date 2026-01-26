'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postFormSchema, type PostFormData } from '@repo/validations'
import { validateImageFile } from '@repo/validations'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/RichTextEditor'
import { createPost, getPostById, updatePost } from '@/lib/services/posts'
import { useAuthStore } from '@/store/auth.store'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { Send } from 'lucide-react'
import Image from 'next/image'

const DRAFT_STORAGE_KEY = 'blog-post-draft'

const CATEGORIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'art', label: 'Art' },
  { value: 'science', label: 'Science' },
  { value: 'cinema', label: 'Cinema' },
  { value: 'design', label: 'Design' },
  { value: 'food', label: 'Food' },
] as const

function WritePageContent() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const token = useAuthStore((state) => state.token)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const editPostId = searchParams.get('edit')
  const isEditMode = Boolean(editPostId)

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'technology',
      image: null,
    },
  })

  const watchedImage = form.watch('image')

  // Load draft from localStorage on mount (only in create mode)
  useEffect(() => {
    if (isEditMode) return

    if (typeof window !== 'undefined') {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft)
          form.reset({
            title: draft.title || '',
            content: draft.content || '',
            category: draft.category || 'technology',
            image: null,
          })
          if (draft.imagePreview) {
            setImagePreview(draft.imagePreview)
          }
        } catch (error) {
          console.error('Error loading draft:', error)
        }
      }
    }
  }, [form, isEditMode])

  // Save draft to localStorage on change (only in create mode)
  useEffect(() => {
    if (isEditMode) return

    const subscription = form.watch(
      (value: Partial<Omit<PostFormData, 'image'>>) => {
        if (typeof window !== 'undefined') {
          // Only save if there's actual content (title or content)
          if (value.title?.trim() || value.content?.trim()) {
            const draft = {
              title: value.title || '',
              content: value.content || '',
              category: value.category || 'technology',
            }
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
          } else {
            // Remove draft if form is empty
            localStorage.removeItem(DRAFT_STORAGE_KEY)
          }
        }
      },
    )
    return () => {
      if (subscription && 'unsubscribe' in subscription) {
        ;(subscription as { unsubscribe: () => void }).unsubscribe()
      }
    }
  }, [form, isEditMode])

  // Load post data when editing
  useEffect(() => {
    if (!isEditMode || !editPostId) return

    const loadPost = async () => {
      try {
        const post = await getPostById(editPostId)
        form.reset({
          title: post.title || '',
          content: post.content || '',
          category: post.category || 'technology',
          image: null,
        })

        if (post.image?.url) {
          setImagePreview(post.image.url)
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load post data',
        )
      }
    }

    void loadPost()
  }, [isEditMode, editPostId, form])

  // Handle image preview and validation
  useEffect(() => {
    if (watchedImage && watchedImage instanceof File) {
      // Validate image file
      const validationResult = validateImageFile(watchedImage, 2)
      if (validationResult.error) {
        toast.error(validationResult.message || 'Invalid image file')
        setImagePreview(null)
        form.setValue('image', null)
        // Clear the file input
        const fileInput = document.querySelector(
          'input[type="file"]',
        ) as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
        return
      }

      // If validation passes, create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.onerror = () => {
        toast.error('Error reading image file')
        setImagePreview(null)
        form.setValue('image', null)
      }
      reader.readAsDataURL(watchedImage)
    } else {
      setImagePreview(null)
    }
  }, [watchedImage, form])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: PostFormData) => {
    if (!isAuthenticated) {
      toast.error(
        `You must be logged in to ${isEditMode ? 'update' : 'create'} a post`,
      )
      return
    }

    // Validate image if provided
    if (data.image && data.image instanceof File) {
      const imageValidation = validateImageFile(data.image, 2)
      if (imageValidation.error) {
        toast.error(imageValidation.message || 'Invalid image file')
        form.setError('image', {
          type: 'manual',
          message: imageValidation.message || 'Invalid image file',
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('category', data.category)
      if (data.image && data.image instanceof File) {
        formData.append('image', data.image)
      } else if (!imagePreview) {
        // To remove existing image when editing
        formData.append('image', null as unknown as Blob)
      }

      if (isEditMode && editPostId) {
        await updatePost(editPostId, formData, token!)
        toast.success('Post updated successfully!')
        router.push(`/post/${editPostId}`)
      } else {
        await createPost(formData, token!)

        // Clear draft and reset form only after successful submission
        if (typeof window !== 'undefined') {
          localStorage.removeItem(DRAFT_STORAGE_KEY)
        }
        form.reset({
          title: '',
          content: '',
          category: 'technology',
          image: null,
        })
        setImagePreview(null)

        toast.success('Post created successfully!')
        router.push('/')
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create post',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>
          {isEditMode ? 'Edit Post' : 'Write a New Post'}
        </h1>
        <p className='text-muted-foreground'>
          {isEditMode
            ? 'Update your post and keep your content fresh'
            : 'Share your thoughts with the world'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className='text-base dark:text-white dark:bg-slate-900'
                    placeholder='Enter your post title...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    className='text-base dark:text-white dark:bg-slate-900'
                    {...field}
                  >
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
            name='image'
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Featured Image (Optional)</FormLabel>
                <FormControl>
                  <div className='space-y-4'>
                    <Input
                      className='text-base dark:text-white dark:bg-slate-900 cursor-pointer'
                      type='file'
                      accept='image/png,image/jpeg,image/jpg'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // Validate immediately when file is selected
                          const validation = validateImageFile(file, 2)
                          if (validation.error) {
                            toast.error(
                              validation.message || 'Invalid image file',
                            )
                            form.setError('image', {
                              type: 'manual',
                              message:
                                validation.message || 'Invalid image file',
                            })
                            e.target.value = '' // Clear the input
                            onChange(null)
                            return
                          }
                          // Clear any previous errors
                          form.clearErrors('image')
                        }
                        onChange(file || null)
                      }}
                      {...field}
                    />
                    <p className='text-sm text-muted-foreground'>
                      Accepted formats: PNG, JPG, JPEG. Max size: 2MB
                    </p>
                    {imagePreview && (
                      <div className='relative w-full h-64 rounded-md overflow-hidden border'>
                        <Image
                          src={imagePreview}
                          alt='Preview'
                          className='w-full h-full object-cover'
                          width={100}
                          height={100}
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          size='sm'
                          className='absolute top-2 right-2'
                          onClick={() => {
                            onChange(null)
                            setImagePreview(null)
                            form.setValue('image', null)
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
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    className='dark:text-white dark:bg-slate-900'
                    content={field.value}
                    onChange={field.onChange}
                    placeholder='Start writing your post content...'
                    error={!!form.formState.errors.content}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-4 pt-4'>
            <Button variant='outline' type='submit' disabled={isSubmitting}>
              <Send className='mr-2 h-4 w-4' />
              {isSubmitting
                ? isEditMode
                  ? 'Saving changes...'
                  : 'Publishing...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Publish Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default function WritePage() {
  return (
    <Suspense
      fallback={
        <div className='container mx-auto max-w-4xl px-4 py-8'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold mb-2'>Write a New Post</h1>
            <p className='text-muted-foreground'>Loading...</p>
          </div>
        </div>
      }
    >
      <WritePageContent />
    </Suspense>
  )
}
