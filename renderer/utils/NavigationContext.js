import React from 'react';
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
    const [navPaneCurrentSelected,setNavPaneCurrentSelected] = useState({database:null,query:null,dashboard:null});//instead of using a single variable for each nav pane we use an object that contains the current selected item of each nav pane

    const updateNavPaneCurrentSelected = (navPane,selectedItem) => {
        Object.keys(navPaneCurrentSelected).forEach((navPane) => {
            navPaneCurrentSelected[navPane] = null;
        });
        navPaneCurrentSelected[navPane] = selectedItem;
    }


    return(
        <NavigationContext.Provider value={{sidebarSectionSelected,setSidebarSectionSelected,navPaneCurrentSelected,setNavPaneCurrentSelected,updateNavPaneCurrentSelected}}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation(){
    return useContext(NavigationContext);
}