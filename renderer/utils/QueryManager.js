import React, { createContext, useContext, useState, useEffect } from 'react';

const QueryContext = createContext('navigation');



export function QueryContextProvider({ children }) {
    const [queryList,setQueryList] = useState([]);

    //on querySaved
    useEffect(() => {
        window.ipc.on('query-saved',(event,arg) => {
            if(event.success){
                setQueryList(event.data)
            }
        })
        window.ipc.on('queries',(event,arg) => {
            if(event.success){
                setQueryList(event.data)
            }
        })
        window.ipc.on('query-deleted',(event,arg) => {
            if(event.success){
                //remove query from list
                setQueryList(queryList.filter(query => query.id !== event.data.id))

            }
        })
        window.ipc.on('query-updated',(event,arg) => {
            if(event.success){
                //update query from list
                

            }
        })
        window.ipc.on('database-connected', (event, arg) => {
            //if connection successful, change page to database page
            if (event.success) {
                //get queries for connection
                window.ipc.send('get-queries')
            }
        })
    },[queryList])

    React.useEffect(() => {
        window.ipc.send('get-queries')
    }
    ,[])


    return(
        <QueryContext.Provider value={{queryList,setQueryList}}>
            {children}
        </QueryContext.Provider>
    )
}

export function useQueryContext(){
    return useContext(QueryContext);
}

export function saveQuery(query){
    //check if query has a name
    if(!query.name || query.name === ''){
        return false;
    }
    window.ipc.send('save-query',query)
    return true;
}

export function updateQuery(query){
    //check if query has a name
    if(!query.name || query.name === ''){
        return false;
    }
    window.ipc.send('update-query',query)
    return true;
}

export function deleteQuery(queryId){
    window.ipc.send('delete-query',queryId)
}

export function clearQueries(){
    window.ipc.send('clear-queries')
}

export function getQueries(){
    window.ipc.send('get-queries')
}

