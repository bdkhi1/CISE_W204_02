import React, { useState, useMemo, useEffect } from 'react'; 
import { useTable, useSortBy, usePagination, useColumnOrder, useGlobalFilter } from 'react-table';
import { COLUMNS } from './Analystcolumns'; 
import useFetchArticles from './AnalystfetchArticles';
import styles from './table.module.scss';
import { useParams, useRouter } from "next/navigation";

export const BasicTable: React.FC = () => {
    const fetchedArticles = useFetchArticles();
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams<{ id: string }>();
    const navigate = useRouter();

    // Populate articles once they're fetched
    useEffect(() => {
        setArticles(fetchedArticles);
    }, [fetchedArticles]);

    const onDeleteClick = (id: string) => {
        fetch(`http://localhost:8082/api/analyst/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              const updatedArticles = articles.filter(article => article._id !== id);
              setArticles(updatedArticles); 
            } else {
              console.error("Failed to delete the article");
            }
          })
          .catch((err) => console.log("Error from ShowArticleDetails_deleteClick: " + err));
      };

    // Define columns to customize DOI rendering
    const columns = useMemo(() => [
        ...COLUMNS.map(column => {
            if (column.accessor === 'pubyear') {
                return {
                    ...column,
                    Cell: ({ value }) => value ? new Date(value).getFullYear() : ''
                };
            }
            if (column.accessor === 'doi') {
                return {
                    ...column,
                    Cell: ({ value }) => (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            {value}
                        </a>
                    ),
                };
            }
            return column; 
        }),
        {
            Header: 'Actions', 
            id: 'actions',
            // Render the Analyse button
            Cell: ({ row }) => (
                <div className={styles.actionButtons}>
                    <button 
                        className={styles.analyseButton}
                        onClick={() => navigate.push(`/show-article/${row.original._id}`)} 
                    >
                       🔍 Analyse
                    </button>
                </div>
            ),
        },
    ], [navigate]); 

    const data = useMemo(() => Array.isArray(articles) ? articles : [], [articles]);

    // Set up the table with hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        allColumns,
        setGlobalFilter,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
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
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span className={styles.sortIcon}>
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
