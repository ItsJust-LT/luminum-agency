import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { BlogList } from '@/components/blog-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Luminum Agency',
  description: 'Latest insights on web development, design trends, and digital innovation from South Africa\'s leading digital agency.',
}

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="py-24">
      <BlogList posts={posts} />
    </div>
  )
}