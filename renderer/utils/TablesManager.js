import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigation } from './NavigationContext';

const TablesContext = createContext('queries');



export function TablesContextProvider({ children }) {
    const [tableList,setTableList] = useState([]);
    const { currentConnection } = useNavigation();

    React.useEffect(() => {
        window.ipc.on('database-tables', (event, arg) => {
            if(event.data){
                setTableList(event.data)
            }
        })
    },[])

    React.useEffect(() => {
        window.ipc.send('get-database-tables')
        console.log('get tables')
    },[currentConnection])

    return(
        <TablesContext.Provider value={{tableList, setTableList}}>
            {children}
        </TablesContext.Provider>
    )
}

export function useTablesContext(){
    return useContext(TablesContext);
}


