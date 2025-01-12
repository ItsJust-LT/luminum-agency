"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function ContactPreview() {
  return (
    <section className="py-24 bg-blue-950 text-white dark:bg-blue-950/50">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing Together</h2>
            <p className="text-blue-200 mb-8 text-lg">
              Ready to transform your digital presence? Our team of experts is here to help
              you achieve your goals.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-900">
                  <MapPin className="h-6 w-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-blue-200">100 Main Road, Cape Town, 8001</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-900">
                  <Phone className="h-6 w-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-blue-200">+27 21 987 6543</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-900">
                  <Mail className="h-6 w-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-blue-200">hello@luminumagency.co.za</p>
                </div>
              </div>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-950 hover:bg-blue-100"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.2235174654!2d18.4241!3d-33.9249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU1JzI5LjYiUyAxOMKwMjUnMjYuOCJF!5e0!3m2!1sen!2sza!4v1647954415212!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}