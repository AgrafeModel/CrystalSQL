import Store from 'electron-store';

//storage for connections 
const connectionStore = new Store({
    name: 'connections',
    defaults: {
        connections: [], //array of all connections saved
        currentConnection: {}, //current connection selected
    }
});

//storage for queries
const queryStore = new Store({
    name: 'queries',
    defaults: {
        queries:{}, //object of all queries saved for each connection
    }
});

const dashboardStore = new Store({
    name: 'dashboards',
    defaults: {
        dashboards: {}, //object of all dashboards saved for each connection
    }
});

export { connectionStore, queryStore, dashboardStore };