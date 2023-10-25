import React from 'react'
import Layout from '../../../components/Layout'
import TestQuery from '../../../components/test/TestQuery'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from 'next/link'
export default function DatabasePage() {


    return (
        <>
            <Layout>
                <DatabaseLayout >
                   database
                   <Link href="/database/query/new">
                          <p>query</p>
                    </Link>
                </DatabaseLayout>
            </Layout>
        </>
    )
}
