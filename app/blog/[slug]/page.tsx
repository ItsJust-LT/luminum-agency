// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { MDXContent } from '@/components/mdx-content'
import Image from 'next/image'
import { format } from 'date-fns'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) return null
  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Luminum Agency Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-24 px-4">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 -ml-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readingTime}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={post.authorImage}
            alt={post.author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{post.author}</p>
          <p className="text-sm text-muted-foreground">{post.authorRole}</p>
        </div>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <MDXContent code={post.body.code} />
      </div>
    </article>
  )
}
