import React from 'react'

interface GenericAuthLayoutProps {
  title: string
  description?: string
  children?: React.ReactNode
}

const GenericAuthLayout = ({
  children,
  title,
  description,
  ...props
}: GenericAuthLayoutProps) => {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto w-80 sm:w-96 flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          {
            title && (
              <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                {title}
              </h1>
            )
          }
          {
            description &&
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {description}
            </p>
          }
        </div>
        {children}
      </div>
    </div>
  )
}

export default GenericAuthLayout