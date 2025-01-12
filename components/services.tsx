"use client"

import { motion } from "framer-motion"
import { Code, Layout, Smartphone, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
    title: "Custom Development",
    description: "Tailored web solutions built with cutting-edge technologies.",
  },
  {
    icon: <Layout className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
    title: "UI/UX Design",
    description: "Beautiful and intuitive interfaces that users love.",
  },
  {
    icon: <Smartphone className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
    title: "Responsive Design",
    description: "Websites that work perfectly on all devices.",
  },
  {
    icon: <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
    title: "Web Applications",
    description: "Powerful web apps that solve real business problems.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-950 dark:text-blue-100">Our Services</h2>
          <p className="text-blue-950/70 dark:text-blue-100/70 max-w-2xl mx-auto">
            We offer a comprehensive range of web development services to help your
            business succeed in the digital world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group bg-white/20 dark:bg-blue-950/20 backdrop-blur-sm border-blue-200/20 dark:border-blue-800/20 hover:bg-white/30 dark:hover:bg-blue-950/30 transition-colors">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-blue-950 dark:text-blue-100">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-950/70 dark:text-blue-100/70">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}