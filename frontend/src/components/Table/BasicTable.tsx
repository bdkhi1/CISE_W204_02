import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './columns'; // Your columns setup
import useFetchArticles from './fetchArticles'; // Import the fetch hook

export const BasicTable = () => {
    // Fetch the articles using the custom hook
    const articles = useFetchArticles();
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(()=> articles, [])
    
    // Render the table 
    const tableInstance = useTable( {
        columns,
        data
    }   
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    return (
        <div>
            <table {...getTableProps()}>
                {/* Header for the table */}
                <thead>
                    {
                    // For each header group extract the props
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps}>
                                        {
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                        
                    </tr>
                    ))
                    }
                    
                </thead>
                {/* Body of the table */}
                <tbody {...getTableBodyProps()}>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}