import React, { useState, useMemo, useEffect } from 'react'; 
import { useTable, useSortBy, usePagination, useColumnOrder, useGlobalFilter } from 'react-table';
import { COLUMNS } from './Moderatorcolumns'; 
import useFetchArticles from './ModeratorfetchArticles';
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

    // Function to handle article submission
    const onSubmitClick = async (article) => {
        try {
            // Call the analyst API to submit the article
            const response = await fetch(`http://localhost:8082/api/analyst`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                // If submission is successful, delete the article from the database
                await onDeleteClick(article._id); // Delete the article from the database
            } else {
                const errorData = await response.json();
                console.error("Failed to submit the article:", errorData);
            }
        } catch (err) {
            console.error("Error from onSubmitClick: ", err);
        }
    };

    // Function to handle article deletion
    const onDeleteClick = async (id: string) => {
            try {
                const response = await fetch(`http://localhost:8082/api/moderation/${id}`, { method: "DELETE" });
                if (response.ok) {
                    // Remove the deleted article from the local state
                    const updatedArticles = articles.filter(article => article._id !== id);
                    setArticles(updatedArticles); 
                } else {
                    const errorData = await response.json();
                    console.error("Failed to delete the article:", errorData);
                }
            } catch (err) {
                console.error("Error from onDeleteClick: ", err);
            }
    };

    // Define columns so publication date is just a year
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
            Cell: ({ row }) => (
                <div className={styles.actionButtons}>
                   <div className={styles.actionButtons}>
                    <button className={styles.editButton} onClick={() => onSubmitClick(row.original)}>
                        ✅ Approve
                    </button>
                    <button className={styles.deleteButton} onClick={() => onDeleteClick(row.original._id)}>
                        ❌ Reject
                    </button>
                </div>
                </div>
            ),
        },
    ], [articles]);

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
