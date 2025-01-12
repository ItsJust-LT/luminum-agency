"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-sm font-medium px-4 py-2 bg-blue-950/10 dark:bg-blue-100/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-800/20 text-blue-950 dark:text-blue-100 rounded-full shadow-sm mb-6">
              South Africa's Premier Digital Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-blue-700 dark:from-blue-100 dark:to-blue-400"
          >
            Transforming African Businesses Through Digital Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-blue-950/80 dark:text-blue-100/80 mb-8 max-w-2xl mx-auto"
          >
            From Cape Town to Johannesburg, we help businesses across South Africa
            build powerful digital experiences that drive growth and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-950/90 hover:bg-blue-900/90 text-white dark:bg-blue-100/10 dark:text-blue-100 dark:hover:bg-blue-200/20 backdrop-blur-sm"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#work">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-blue-200/20 dark:border-blue-800/20 hover:bg-blue-950/5 dark:hover:bg-blue-100/5 backdrop-blur-sm"
              >
                View Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}