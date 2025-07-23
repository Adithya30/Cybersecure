"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { app } from "@/lib/backend"
import { useEffect } from "react"

export default function Component() {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = "/dashboard";
            } else {
                console.log("No user is logged in");
            }
        });
        return () => unsubscribe();
    }, [auth]);


     const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error:any) {
            // Popup failed (maybe blocked), suggest redirect
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                alert("Popup blocked. Trying redirect sign-in...");
                signInWithRedirect(auth, provider);
            } else {
                console.error("Google Sign-In Error:", error);
                alert("Google Sign-In failed. Please try again.");
            }
        }
    };



  return (
    <div className="mx-auto max-w-sm space-y-6 h-screen w-full flex flex-col justify-center items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button onClick={googleSignIn} variant="outline" className="w-full">
          Login with Google
        </Button>
        <Link href="#" className="inline-block w-full text-center text-sm underline" prefetch={false}>
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}