"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Globe, 
  BarChart, 
  Settings,
  Users,
  LogOut
} from "lucide-react"

const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/dashboard/websites",
    label: "Websites",
    icon: Globe
  },
  {
    path: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart
  },
  {
    path: "/dashboard/users",
    label: "Users",
    icon: Users
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex flex-col w-64 border-r bg-muted/10">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="font-bold">Luminum Agency</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <Button
              key={route.path}
              variant={pathname === route.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.path && "bg-muted"
              )}
              asChild
            >
              <Link href={route.path}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}