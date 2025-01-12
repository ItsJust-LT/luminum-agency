"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const posts = [
  {
    title: "Digital Transformation in South Africa: 2024 Trends",
    excerpt: "Explore how South African businesses are embracing digital transformation.",
    image: "https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?w=800&q=80",
    date: "Mar 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "E-commerce Growth in African Markets",
    excerpt: "Insights into the rapidly expanding e-commerce sector across Africa.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
    date: "Mar 12, 2024",
    readTime: "4 min read",
  },
  {
    title: "Mobile-First Design for African Users",
    excerpt: "Best practices for designing mobile experiences for the African market.",
    image: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=800&q=80",
    date: "Mar 10, 2024",
    readTime: "6 min read",
  },
]

export function BlogPreview() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-950 dark:text-blue-100">Latest Insights</h2>
          <p className="text-blue-950/70 dark:text-blue-100/70 max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology and digital innovation in South Africa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden bg-white/20 dark:bg-blue-950/20 backdrop-blur-sm border-blue-200/20 dark:border-blue-800/20 hover:bg-white/30 dark:hover:bg-blue-950/30 transition-colors">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-blue-950/60 dark:text-blue-100/60 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="mb-3 text-blue-950 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </CardTitle>
                    <p className="text-blue-950/70 dark:text-blue-100/70 mb-4">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="group/btn p-0 h-auto text-blue-600 dark:text-blue-400">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200/20 dark:border-blue-800/20 hover:bg-blue-950/5 dark:hover:bg-blue-100/5 backdrop-blur-sm"
            >
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}