'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ShoppingBasketIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SigninBlock = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      console.log("signin result: ", result.user)

      // Get the ID token
      const idToken = await result.user.getIdToken()

      // Send token to your backend via HTTPS
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('token:', data.decodedToken)
        const { user } = data
        console.log('User info:', user) // Log or use the user info as needed
        toast({
          title: `Welcome ${user.name.split[0]}`,
          variant: "default",
        })
        router.push('/dashboard')
      } else {
        throw new Error('Failed to create session')
      }
    } catch (error) {
      console.error('SignIn error:', error)
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center">
              <ShoppingBasketIcon className="h-8 w-8" />
              <h1 className="ml-2 text-4xl font-bold">SmartShelf</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Signin through your google account
            </p>
          </div>
          <div className="grid gap-4">
            <Button className="w-full" onClick={handleSignIn}>
              {isLoading ? "Signing in..." : "Signin with Google"}

            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted sm:block h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/grocery_background_still.jpg"
        >
          <source src="/grocery_background.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}