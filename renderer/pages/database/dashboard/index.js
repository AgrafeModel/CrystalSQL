import React from 'react'
import Layout from '../../../components/Layout'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from "next/link"
import { useRouter } from 'next/router'
import MainDashboardFrame from '../../../components/dashboard/MainDashboardFrame'


export default function DashboardPage() {
    const router = useRouter();
    const {dashboardId} = router.query;

    return (
        <>
            <Layout>
                <DatabaseLayout >
                    <MainDashboardFrame dashboardId={dashboardId}/>
                </DatabaseLayout>
            </Layout>
        </>
    )
}
