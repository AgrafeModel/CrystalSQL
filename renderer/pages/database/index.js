import React from 'react'
import Layout from '../../components/Layout'
import TestQuery from '../../components/test/TestQuery'
import DatabaseLayout from '../../components/Layout/databaseLayout'

export default function HomePage() {


    return (
        <>
            <Layout>
                <DatabaseLayout >
                    <TestQuery />
                </DatabaseLayout>
            </Layout>
        </>
    )
}
