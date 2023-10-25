import React from 'react'
import Layout from '../../../components/Layout'
import NewQuery from '../../../components/queries/NewQuery'
import DatabaseLayout from '../../../components/Layout/databaseNav/databaseLayout'
import Link from "next/link"


export default function NewQueryPage() {


    return (
        <>
            <Layout>
                <DatabaseLayout >
                    <NewQuery />
                </DatabaseLayout>
            </Layout>
        </>
    )
}
