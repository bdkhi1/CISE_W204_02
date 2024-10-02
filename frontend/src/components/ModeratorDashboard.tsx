import React from 'react';
import PopulatedNavBar from './PopulatedNavBar';
import BasicTable from './Table/BasicTable';

function ModeratorDashboard(){

    return(
        <>
            <PopulatedNavBar />
            <div className='ModeratorDashboard'>
                <h1>Moderator Dashboard</h1>
                <BasicTable />
            </div>
        </>
    )
}

export default ModeratorDashboard;