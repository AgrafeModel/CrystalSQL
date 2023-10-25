import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext('navigation');



export function NavigationProvider({ children }) {
    const [sidebarSectionSelected,setSidebarSectionSelected] = useState('dashboard');

    return(
        <NavigationContext.Provider value={{sidebarSectionSelected,setSidebarSectionSelected}}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation(){
    return useContext(NavigationContext);
}