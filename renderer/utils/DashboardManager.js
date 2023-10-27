import React, { createContext, useContext, useState, useEffect } from 'react';

const DasboardContext = createContext('dashboard');


export function DashboardContextProvider({ children }) {
    const [dashboardList,setDashboardList] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [canItemBeDragged,setCanItemBeDragged] = useState(true);

    //on dashboardSaved
    useEffect(() => {
        window.ipc.on('dashboard-created',(event,arg) => {
            if(event.success){
                //add dashboard to list
                setDashboardList([...dashboardList,event.data[event.data.length - 1]])

            }
        })
        window.ipc.on('dashboards',(event,arg) => {
            if(event.success){
                setDashboardList(event.data)
            }
        })
        window.ipc.on('dashboard-deleted',(event,arg) => {
            if(event.success){
                //remove dashboard from list
                setDashboardList(dashboardList.filter(dashboard => dashboard.id !== event.data.id))

            }
        })
        window.ipc.on('dashboard-updated',(event,arg) => {
            if(event.success){
                //update dashboard from list
                setDashboardList(dashboardList.map(dashboard => {
                    if(dashboard.id === event.data.id){
                        return event.data
                    }
                    return dashboard
                }
                ))
            }
        })
        window.ipc.on('database-connected', (event, arg) => {
            //if connection successful, change page to database page
            if (event.success) {
                //get dashboards for connection
                window.ipc.send('get-dashboards')
            }
        })
    },[dashboardList])

    React.useEffect(() => {
        window.ipc.send('get-dashboards')
    }
    ,[])


    const updateWidget = (widget) => {
        setDashboardList(dashboardList.map(dashboard => {
            if(dashboard.id === widget.dashboardId){
                dashboard.widgets = dashboard.widgets.map(w => {
                    if(w.id === widget.id){
                        return widget
                    }
                    return w
                })
            }
            return dashboard
        }))
    }

    const addWidget = (widget) => {
        setDashboardList(dashboardList.map(dashboard => {
            if(dashboard.id === widget.dashboardId){
                //get a new id for the widget
                widget.id = dashboard.widgets.length + 1
                dashboard.widgets = [...dashboard.widgets,widget]
                console.log(dashboard.widgets)
            }
            return dashboard
        }))
        
        //save dashboard
        saveDashboard(widget.dashboardId);
    }

    const deleteWidget = (widget) => {
        setDashboardList(dashboardList.map(dashboard => {
            if(dashboard.id === widget.dashboardId){
                dashboard.widgets = dashboard.widgets.filter(w => w.id !== widget.id)
            }
            return dashboard
        }))
    }




    return(
        <DasboardContext.Provider value={{dashboardList,setDashboardList,isEditing,setIsEditing,canItemBeDragged,setCanItemBeDragged,updateWidget,addWidget,deleteWidget}}>
            {children}
        </DasboardContext.Provider>
    )

}

export function useDashboardContext() {
    return useContext(DasboardContext);
}


export function saveDashboard(dashboard){
    //check if query has a name
    if(!dashboard.title){
        return false;
    }
    window.ipc.send('new-dashboard',dashboard)
    return true;
}

export function deleteDashboard(dashboardId){
    window.ipc.send('delete-dashboard',dashboardId)
}

export function updateDashboard(dashboard){
    window.ipc.send('update-dashboard',dashboard)
}

export function getDashboard(dashboardId){
    window.ipc.send('get-dashboard',dashboardId)
}

export function getDashboards(){
    window.ipc.send('get-dashboards')
}


export function defaultDashboard(){
    return {
        id: null,
        title: 'New Dashboard',
        description: 'Customize this dashboard',
        widgets: [
            {
                id: 1,
                title: "New Dashboard",
                description: "Customize this dashboard",
                type: "text",
                content: "Customize this dashboard",
                width: 5,
                height: 1,
                dashboardId: null
            },
        ],
    }
}

export function createNewDefaultDashboard(){
    const dashboard = defaultDashboard();
    window.ipc.send('new-dashboard',dashboard)
}
