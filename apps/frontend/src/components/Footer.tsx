import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

export function Footer() {
  return (
    <footer className='w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-200'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            Built by{' '}
            <a
              className='font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              href='https://axelsparta.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Axel Sparta
            </a>
          </p>
          <div className='flex space-x-6'>
            <a
              className='text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors transform hover:scale-110'
              href='https://www.linkedin.com/in/axel-sparta-web/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <AiFillLinkedin className='text-2xl' />
            </a>
            <a
              className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors transform hover:scale-110'
              href='https://github.com/AxelSparta'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
            >
              <AiFillGithub className='text-2xl' />
            </a>
          </div>
          <p className='text-gray-500 dark:text-gray-500 text-xs mt-4'>
            © {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

