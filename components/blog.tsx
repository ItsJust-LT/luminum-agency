"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

const posts = [
  {
    title: "The Future of Web Development: 2024 Trends",
    excerpt: "Explore the latest trends shaping the future of web development, from AI integration to advanced animations.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    date: "Mar 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "Maximizing Performance in Modern Web Apps",
    excerpt: "Learn the best practices for optimizing your web applications for speed and efficiency.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    date: "Mar 12, 2024",
    readTime: "4 min read",
  },
  {
    title: "Design Systems: Building for Scale",
    excerpt: "How to create and maintain a design system that grows with your organization.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    date: "Mar 10, 2024",
    readTime: "6 min read",
  },
]

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-blue-950/20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology, design, and digital innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="group/btn p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}