import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext('navigation');

/**
 * @brief the navigation provider component that provides the navigation context.
 * @param {*} children the children components
 * @return {React.Component} the provider component
 * 
 */
export function NavigationProvider({ children }) {
    //Here we define the state of the navigation context of the application. ex: the current selected section in the sidebar (dashboard,query,database.
    const [sidebarSectionSelected,setSidebarSectionSelected] = useState('dashboard');
    const [queryCurrentSelected,setQueryCurrentSelected] = useState(null);

    return(
        <NavigationContext.Provider value={{sidebarSectionSelected,setSidebarSectionSelected,queryCurrentSelected,setQueryCurrentSelected}}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation(){
    return useContext(NavigationContext);
}