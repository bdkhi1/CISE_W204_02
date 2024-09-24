import React, { useState, useEffect } from 'react';
import {Article} from '@/components/Article';
import { useTable, Column, useSortBy, useRowSelect} from 'react-table';
import { Checkbox } from './Checkbox';


function SortableTable() {
    // Hold articles in array
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('http://localhost:8082/api/articles')
        .then((res)=>res.json())
        .then((articles) => {
            setArticles(articles);
        })

        .catch((err) => {
            console.log('Error from ShowAdminArticles: ' + err);
          });
    }, []);

    // Header is for how the name would show, accessor is what column it takes from
    const columns: Column<Article>[] = React.useMemo(
        () => [
            { Header: 'ID', accessor: '_id' as const }, // Use 'as const' for exact match
            { Header: 'Title', accessor: 'title' as const },
            { Header: 'ISBN', accessor: 'isbn' as const },
            { Header: 'Author', accessor: 'author' as const },
            { Header: 'Description', accessor: 'description' as const },
            { Header: 'Published Date', accessor: 'published_date' as const },
            { Header: 'Publisher', accessor: 'publisher' as const },
            { Header: 'Updated Date', accessor: 'updated_date' as const },
        ],
        []
    );

    // Function to log selected row data
    const handleRowSelect = (row: any) => {
        console.log('Selected row data:', row.original);
    };

    // Get a list of functions from react table 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable({columns, data: articles }, useSortBy, useRowSelect, (hooks)=>{
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps} />
                    )
                },
                ...columns
            ]
        })
    });

    const firstPageRows = rows.slice(0,10)

    return <div className='AdminTable'>
        <div> 
            <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) =>
                            (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                    {column.isSorted ? (column.isSortedDesc ? '👇' : '👆') : ''}
                                    </span>
                                </th>
                            )
                            )}
                        </tr>))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row)=> {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) =>(
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        </div>

    </div>;
  }
  // https://www.youtube.com/watch?v=A9oUTEP-Q84
  // https://www.youtube.com/watch?v=zypbcG3ZVnc
  // https://www.youtube.com/watch?v=e-EFSkq4AaI
  export default SortableTable;