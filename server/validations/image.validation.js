import { z } from 'zod'

const imageSchema = maxSizeInMb =>
  z
    .object({
      mimetype: z.enum(['image/png', 'image/jpeg', 'image/jpg'], {
        message: 'Image must be a png, jpg or jpeg.'
      }),
      size: z.number()
    })
    .refine(file => file.size <= maxSizeInMb * 1024 * 1024, {
      message: `The image size must be less than ${maxSizeInMb}MB.`,
      path: ['size']
    })

export const imageValidation = (image, maxSizeInMb) => {
  const parseResult = imageSchema(maxSizeInMb).safeParse(image)
  if (!parseResult.success) {
    return {
      error: true,
      message: z.flattenError(parseResult.error).fieldErrors
    }
  }
  return { error: false }
}
