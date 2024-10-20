import React from 'react';

export const TableFilter = ({filter, setFilter}) => {
    return (
        <span>   
            Search: {' '}
            <input 
            style={{
              backgroundColor: '#333',  
              color: '#fff',           
              border: '1px solid #555', 
              borderRadius: '4px',      
              padding: '6px',          
              outline: 'none',         
          }}
            
            
            value={filter || ''} 
            onChange={e => setFilter(e.target.value)}
            />

        </span>
    )
}