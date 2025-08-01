"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { app } from "@/lib/backend"
import { useEffect, useState } from "react"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarImage } from "@/components/ui/avatar"
import DarkModeToggleButton from "./DarkModeToggleButton"

export default function HomeTopbar() {

    const auth = getAuth(app)
    const [userId, setUserId] = useState("")
    const[photoUrl, setphotoUrl] = useState("")


     useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid)
                    setphotoUrl(user.photoURL || "")
                } else {
                    window.location.href = "/login";
                }
            })
            return () => unsubscribe()
        }, [auth])


    const signOutFeature =()=>{
      signOut(auth).then(()=>{
        window.location.href = "/login";
      }).catch((error)=>{
        alert("Error signing out: " + error.message)
      })
    }
    

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Services
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={photoUrl || undefined} alt="User Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            </Avatar>

            <DarkModeToggleButton />

            <Button
              variant=""
              className="hidden md:inline-flex"
              onClick={signOutFeature}>Sign Out</Button>

          </div>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}