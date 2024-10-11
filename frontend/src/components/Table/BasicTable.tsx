import React, { useState, useMemo } from 'react'; 
import { useTable, useSortBy, usePagination, useColumnOrder, useGlobalFilter } from 'react-table';
import { COLUMNS } from './columns'; 
import useFetchArticles from './fetchArticles';
import styles from './table.module.scss';

export const BasicTable: React.FC = () => {
    // Fetch articles and manage search term state
    const articles = useFetchArticles();
    const [searchTerm, setSearchTerm] = useState('');

    // Define columns, ensuring the publication year is displayed correctly
    const columns = useMemo(() => [
        ...COLUMNS.map(column => {
            if (column.accessor === 'pubyear') {
                return {
                    ...column,
                   
                    Cell: ({ value }) => value ? new Date(value).getFullYear() : ''
                };
            }
            return column; 
        }),
        {
            Header: 'Actions', 
            id: 'actions',
            // Render buttons for edit and delete actions
            Cell: ({ row }) => (
                <div className={styles.actionButtons}>
                    <button className={styles.editButton}>
                        ✏️ Edit
                    </button>
                    <button className={styles.deleteButton}>
                        🗑️ Delete
                    </button>
                </div>
            ),
        },
    ], []);

    const data = useMemo(() => Array.isArray(articles) ? articles : [], [articles]);

    // Set up the table with hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // @ts-expect-error
        page,
        // @ts-expect-error
        nextPage,
        // @ts-expect-error
        previousPage,
        // @ts-expect-error
        canNextPage,
        // @ts-expect-error
        canPreviousPage,
        prepareRow,
        allColumns,
        // @ts-expect-error
        setGlobalFilter,
        // @ts-expect-error
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            // @ts-expect-error
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useColumnOrder
    );

    // Handle search input and filter the table
    const handleSearch = (e) => {
        const value = e.target.value; 
        setSearchTerm(value); 
        setGlobalFilter(value || undefined); 
    };

    // Toggle column visibility based on user selection
    const toggleColumnVisibility = (columnId) => {
        const column = allColumns.find(col => col.id === columnId);
        if (column) {
            column.toggleHidden();
        }
    };

    return (
        <div className={styles.tableWrapper}>
            {/* Search bar for filtering articles */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch} 
                    placeholder="Search..."
                    className={styles.searchInput}
                />
            </div>
            
            {/* Column visibility toggles */}
            <div className={styles.columnTogglesContainer}>
                <div className={styles.columnToggles}>
                    <div className={styles.columnList}>
                        {allColumns.map(column => (
                            <button 
                                key={column.id} 
                                className={styles.toggleButton}
                                onClick={() => toggleColumnVisibility(column.id)} 
                            >
                                {/*@ts-expect-error*/}
                                {column.isVisible ? 'Hide' : 'Show'} {column.Header}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table rendering */}
            <div className={styles.tableContainer}>
                <table {...getTableProps()} className={styles.table}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // @ts-expect-error
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span className={styles.sortIcon}>
                                            {/*@ts-expect-error*/}
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''} 
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row); // Prepare the rows for rendering
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className={styles.pagination}>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>Page {pageIndex + 1}</span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BasicTable;
