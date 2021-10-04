import React from "react"
import { useState, useEffect } from 'react'
import Layout from "../layouts"
import ChatHome from "../components/ChatHome"
import { useSession } from 'next-auth/client'
import AccessDenied from '../components/access-denied'

export default function Page () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <ChatHome name="AIN" />
    </Layout>
  )
}
