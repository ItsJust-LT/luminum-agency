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
import { FcGoogle } from "react-icons/fc"
import { Loader2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const emailPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const emailCodeFormSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const verifyFormSchema = z.object({
  token: z.string().min(6, "Code must be 6 characters").max(6),
})

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState("")
  const [authMethod, setAuthMethod] = useState<"email-password" | "email-code">("email-password")

  const emailPasswordForm = useForm<z.infer<typeof emailPasswordFormSchema>>({
    resolver: zodResolver(emailPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const emailCodeForm = useForm<z.infer<typeof emailCodeFormSchema>>({
    resolver: zodResolver(emailCodeFormSchema),
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

  async function onEmailPasswordSubmit(values: z.infer<typeof emailPasswordFormSchema>) {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password")
        } else {
          toast.error("Failed to sign in. Please try again.")
        }
        return
      }

      toast.success("Successfully signed in!")
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function onEmailCodeSubmit(values: z.infer<typeof emailCodeFormSchema>) {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setVerifyEmail(values.email)
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
        email: verifyEmail,
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
    <div className="min-h-screen flex items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto px-4"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign In */}
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email/Password Sign In */}
            {authMethod === "email-password" && !showVerify && (
              <Form {...emailPasswordForm}>
                <form onSubmit={emailPasswordForm.handleSubmit(onEmailPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={emailPasswordForm.control}
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
                  <FormField
                    control={emailPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
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
                    Sign In
                  </Button>
                </form>
              </Form>
            )}

            {/* Email Code Sign In */}
            {authMethod === "email-code" && !showVerify && (
              <Form {...emailCodeForm}>
                <form onSubmit={emailCodeForm.handleSubmit(onEmailCodeSubmit)} className="space-y-4">
                  <FormField
                    control={emailCodeForm.control}
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
            )}

            {/* Verify Code Form */}
            {showVerify && (
              <Form {...verifyForm}>
                <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
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

            {/* Toggle between Email/Password and Email Code */}
            {!showVerify && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setAuthMethod(
                  authMethod === "email-password" ? "email-code" : "email-password"
                )}
              >
                {authMethod === "email-password"
                  ? "Sign in with email code instead"
                  : "Sign in with password instead"
                }
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}