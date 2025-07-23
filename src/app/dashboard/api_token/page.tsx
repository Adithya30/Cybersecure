"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/lib/backend'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const page = (props: Props) => {

     const auth = getAuth(app)
    const db = getDatabase(app)

    const [userId, setUserId] = useState("")
    const [apiToken, setApiToken] = useState("")
    const [tokensLeft, setTokensLeft] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inputWidth, setInputWidth] = useState(300)
    const spanRef = useRef(null)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
                console.log("User is logged in:", user)
            } else {
                window.location.href = "/login";
            }
        })
        return () => unsubscribe()
    }, [auth])



    useEffect(() => {
        if (!userId) return
        // Listen for API key
        const apiKeyRef = ref(db, `${userId}/api_key`)
        const unsubscribeApiKey = onValue(apiKeyRef, (snapshot) => {
            const apiKey = snapshot.val()
            if (apiKey) {
                setApiToken(apiKey)
            } else {
                setApiToken("")
            }
        })
        // Listen for tokens left
        const tokensLeftRef = ref(db, `${userId}/tokens_left`)
        const unsubscribeTokensLeft = onValue(tokensLeftRef, (snapshot) => {
            setTokensLeft(snapshot.val())
        })
        return () => {
            unsubscribeApiKey()
            unsubscribeTokensLeft()
        }
    }, [db, userId])


     const sendRequest = async (e:any) => {
        e.preventDefault()
        if (!userId) {
            alert("User not authenticated.")
            return
        }
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8000/generate_api_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            })
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`)
            }
            const data = await response.json()
            setApiToken(data.token || "")
            console.log(data)
        } catch (error) {
            console.error('Error:', error)
            setApiToken("")
            alert("Failed to generate API token. Please check the backend server.")
        } finally {
            setLoading(false)
        }
    }



  return (
    <div className='w-full h-screen flex items-center justify-center'>
        {
            apiToken ? 
            <Input value={apiToken} disabled></Input>
            :

            <form action="#" method='POST' onSubmit={sendRequest}>

                <Button className=' font-bold' type='submit'>Generate API token</Button>
            </form>
        }
    </div>
  )
}

export default page