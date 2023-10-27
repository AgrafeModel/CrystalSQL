import React from 'react'
import Layout from '../../../components/Layout'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from "next/link"
import { useRouter } from 'next/router'
import MainDashboardFrame from '../../../components/dashboard/MainDashboardFrame'
import { useDashboardContext } from '../../../utils/DashboardManager'

export default function DashboardPage() {
    const router = useRouter();
    const {dashboardId} = router.query;
    const {dashboardList} = useDashboardContext();
    const [dashboard,setDashboard] = React.useState(null);

    React.useEffect(() => {
        if(dashboardId){
            const dashboard = dashboardList.find(dashboard => dashboard.id === parseInt(dashboardId))
            setDashboard(dashboard)
        }
    },[dashboardId,dashboardList])

    return (
        <>
            <Layout>
                <DatabaseLayout >
                    {dashboard && <MainDashboardFrame dashboard={dashboard} setDashboard={setDashboard}/> }
                </DatabaseLayout>
            </Layout>
        </>
    )
}
