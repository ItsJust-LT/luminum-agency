"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Globe, ExternalLink, Settings } from "lucide-react"
import Link from "next/link"

interface Website {
  id: string
  name: string
  url: string
  status: string
  visits: number
  created_at: string
}

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWebsites() {
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setWebsites(data || [])
      } catch (error) {
        toast.error('Failed to load websites')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchWebsites()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Websites</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          websites.map((website, index) => (
            <motion.div
              key={website.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {website.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          website.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <p className="capitalize">{website.status}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Visits</p>
                      <p className="font-medium">{website.visits.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={website.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Site
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/websites/${website.id}`}>
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}