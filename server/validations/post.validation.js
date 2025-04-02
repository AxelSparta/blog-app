export const titleValidation = title => {
  if (title.length > 3 && title.length < 200) {
    return { error: false }
  }
  return { error: true, message: 'Title must be between 3 and 200 characters.' }
}
export const contentValidation = content => {
  if (content.length > 20 && content.length < 3000) {
    return { error: false }
  }
  return { error: true, message: 'Content must be between 20 and 3000 characters.' }
}

export const categoryValidation = category => {
  const categoriesAllowed = [
    'technology',
    'art',
    'science',
    'cinema',
    'design',
    'food'
  ]
  if (!categoriesAllowed.includes(category)) {
    return { error: true, message: 'Invalid category.' }
  }
  return { error: false }
}
