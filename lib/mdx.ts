import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import readingTime from "reading-time"

const postsDirectory = path.join(process.cwd(), "content/posts")

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
  author: string
  authorImage: string
  authorRole: string
  content: string
  readingTime: string
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const source = fs.readFileSync(fullPath, "utf8")
    
    const { data, content } = matter(source)
    const { code } = await bundleMDX({ source: content })
    
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      author: data.author,
      authorImage: data.authorImage,
      authorRole: data.authorRole,
      content: code,
      readingTime: stats.text,
    }
  } catch (error) {
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(postsDirectory)
  const posts = []

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "")
    const post = await getPost(slug)
    if (post) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any))
}

export const allPosts = await getAllPosts()