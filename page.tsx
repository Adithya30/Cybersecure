"use client"

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { getDatabase, ref, onValue,get } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/lib/backend'
import Loading from './loading'
import { PieChart } from 'lucide-react'
import { ChartPieDonutText } from './_components/PieChartShow'
import { ChartPieDonutTextAnomaly } from './_components/PieChartShowAnomaly'


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

    const [phishingEmails, setPhishingEmails] = useState([]);
    const [otherClassification, setOtherClassification] = useState([]);

    const[totalScans, settotalScans]=useState(0)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
                // console.log("User is logged in:", user)
            } else {
                window.location.href = "/login";
            }
        })
        return () => unsubscribe()
    }, [auth])


    useEffect(()=>{
        const fetchResults = async () => {
            if (!userId) return;

            const resultsRef = ref(db, `${userId}/results`);
            try {
                const snapshot = await get(resultsRef);
                if (snapshot.exists()) {
                const results = snapshot.val();
                const phishingList:any = [];
                const otherList:any = [];

                 results.forEach(item => {
                    if ('all_probabilities' in item) {
                        phishingList.push(item);
                    } else if ('conc' in item && 'input' in item) {
                        otherList.push(item);
                    }
                    });

                    console.log("Phishing Emails:", phishingList);
                    console.log("Other Classification:", otherList);

                    setPhishingEmails(phishingList);
                    setOtherClassification(otherList);

                } else {
                console.log("No results found.");
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
            }
            fetchResults()
    },[db, userId])


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


    useEffect(() => {
    if (!userId) return

    const resultsRef = ref(db, `${userId}/results`)
    const unsubscribeResults = onValue(resultsRef, (snapshot) => {
        const results = snapshot.val()
        if (Array.isArray(results)) {
            settotalScans(results.filter(item => item !== null).length)
        } else if (results && typeof results === 'object') {
            settotalScans(Object.keys(results).length)
        } else {
            settotalScans(0)
        }
    })

    return () => {
        unsubscribeResults()
    }
}, [db, userId])





  return (
   <Suspense fallback={<Loading/>}>
        <div className='w-full h-full p-4'>
        <div className='flex flex-col w-full'>
            <div className='flex w-full justify-between space-x-4'>
                <Card className='w-1/2'>
                    <CardHeader>
                        <CardTitle>
                            Credits Left
                        </CardTitle>

                        <CardDescription>
                            View your credits left
                            <h1 className='text-3xl font-bold '>{tokensLeft ? tokensLeft : "Fetching..."}</h1>

                        </CardDescription>

                        
                        </CardHeader>
                </Card>


                <Card className='w-1/2'>
                    <CardHeader>
                        <CardTitle>
                            Total Scans
                        </CardTitle>

                        <CardDescription>
                            Total scans till now
                                                        <h1 className='text-3xl font-bold '>{totalScans ? totalScans : "Fetching..."}</h1>

                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>


            <div className='flex w-full justify-between space-x-4 mt-4'>
                <ChartPieDonutText data={phishingEmails}/>
                <ChartPieDonutTextAnomaly data={otherClassification}/>

            </div>
        </div>
    </div>
   </Suspense>
  )
}

export default page