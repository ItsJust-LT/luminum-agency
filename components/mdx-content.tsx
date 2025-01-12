"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import Link from "next/link"

const components = {
  Image,
  a: ({ href, ...props }: any) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      )
    }

    if (href.startsWith("#")) {
      return <a {...props} href={href} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} href={href} />
  },
}

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}