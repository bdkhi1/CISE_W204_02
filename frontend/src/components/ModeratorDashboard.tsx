import React, { useState, useEffect } from 'react';
import PopulatedNavBar from './PopulatedNavBar';
import Link from 'next/link';

function ModeratorDashboard(){

    return(
        <>
            <PopulatedNavBar />
            <div className='ModeratorDashboard'>
                <h1>Moderator Dashboard</h1>
            </div>
        </>
    )
}

export default ModeratorDashboard;