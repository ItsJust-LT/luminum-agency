"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"

const emailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const verifyFormSchema = z.object({
  token: z.string().min(6, "Code must be 6 characters").max(6),
})

export function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [email, setEmail] = useState("")

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const verifyForm = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      token: "",
    },
  })

  async function onEmailSubmit(values: z.infer<typeof emailFormSchema>) {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setEmail(values.email)
      setShowVerify(true)
      toast.success("Check your email for the login code!")
    } catch (error) {
      toast.error("Failed to send login code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function onVerifySubmit(values: z.infer<typeof verifyFormSchema>) {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: values.token,
        type: 'email',
      })

      if (error) throw error

      toast.success("Successfully signed in!")
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Invalid code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function signInWithGoogle() {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="email">Email Code</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          {!showVerify ? (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Send Code
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...verifyForm}>
              <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-6">
                <FormField
                  control={verifyForm.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter 6-digit code" 
                          maxLength={6}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Verify Code
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowVerify(false)}
                >
                  Back to Email
                </Button>
              </form>
            </Form>
          )}
        </TabsContent>

        <TabsContent value="google">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={signInWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="mr-2 h-5 w-5" />
            )}
            Continue with Google
          </Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}