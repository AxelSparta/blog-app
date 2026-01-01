import { Posts } from '@/components/Posts'
import { Suspense } from 'react'

function page() {
  return (
    <main className="flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </main>
  )
}

export default page