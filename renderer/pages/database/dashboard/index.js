import React from 'react'
import Layout from '../../../components/Layout'
import TestQuery from '../../../components/test/TestQuery'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from "next/link"
export default function DashboardPage() {


    return (
        <>
            <Layout>
                <DatabaseLayout >
                    dashboard
                </DatabaseLayout>
            </Layout>
        </>
    )
}
