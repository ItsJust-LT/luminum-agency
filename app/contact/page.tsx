import type { Metadata } from 'next'
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  title: 'Contact Us | Luminum Agency',
  description: 'Get in touch with South Africa\'s leading web development agency. We\'re here to help transform your digital presence.',
}

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Contact />
    </div>
  )
}