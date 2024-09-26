import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './columns'; // Your columns setup
import useFetchArticles from './fetchArticles'; // Import the fetch hook
import styles from './table.module.scss';  // Import the SCSS file

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
        <div className={styles.tableContainer}>
            <table {...getTableProps()} className={styles.darkThemeTable}>
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
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps}>
                                                {cell.render('Cell')}
                                            </td>
                                        })
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </div>
    )
}