export const imageValidation = (image, maxSizeInMb) => {
  const arrayOfAllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

  if (!arrayOfAllowedFileTypes.includes(image.mimetype)) {
    return {
      error: true,
      message: 'Image must be a png, jpg or jpeg.'
    }
  }

  if (image.size / (1024 * 1024) > maxSizeInMb) {
    return {
      error: true,
      message: 'The image size must be less than ' + maxSizeInMb + 'MB.'
    }
  }

  return { error: false }
}
