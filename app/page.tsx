import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { BlogPreview } from "@/components/blog-preview"
import { ContactPreview } from "@/components/contact-preview"
import { AnimatedMain } from "@/components/animated-main"

export default function Home() {
  return (
    <AnimatedMain>
      <div className="min-h-screen">
        <Hero />
        <Services />
        <Work />
        <BlogPreview />
        <ContactPreview />
      </div>
    </AnimatedMain>
  )
}