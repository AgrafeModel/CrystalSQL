import React from 'react'
import LandingPage from '../components/LandingPage'
import Layout from '../components/Layout'

export default function HomePage() {


  return (
    <>
      <Layout>
        <div className="flex flex-row w-full h-full justify-center items-center p-4">
          <LandingPage />
        </div>
      </Layout>
    </>
  )
}
