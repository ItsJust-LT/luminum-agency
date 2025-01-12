"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const projects = [
  {
    title: "E-commerce Platform",
    description: "Modern online shopping experience",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
  },
  {
    title: "Portfolio Website",
    description: "Creative showcase platform",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    title: "SaaS Dashboard",
    description: "Intuitive analytics interface",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
]

export function Work() {
  return (
    <section id="work" className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-950 dark:text-blue-100">Our Work</h2>
          <p className="text-blue-950/70 dark:text-blue-100/70 max-w-2xl mx-auto">
            Take a look at some of our recent projects and see how we've helped
            businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer bg-white/20 dark:bg-blue-950/20 backdrop-blur-sm border-blue-200/20 dark:border-blue-800/20">
                <CardContent className="p-0">
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent dark:from-black/80 flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90">{project.description}</p>
                      </div>
                    </div>
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