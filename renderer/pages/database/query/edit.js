import React from 'react'
import Layout from '../../../components/Layout'
import NewQuery from '../../../components/queries/NewQuery'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useQueryContext } from '../../../utils/QueryManager'


export default function NewQueryPage() {
    const router = useRouter()
    const { queryList } = useQueryContext()
    const { queryId } = router.query;
    
    const query = React.useMemo(() => {
        if(queryId){
            return queryList.find(query => query.id === parseInt(queryId))
        }
        return null
    },[queryId,queryList])


    return (
        <>
            <Layout>
                <DatabaseLayout >
                    <NewQuery defaultQuery={query}/>
                </DatabaseLayout>
            </Layout>
        </>
    )
}
