import React, { useMemo } from 'react';
import { useTable, useSortBy, Column, HeaderGroup, Row, Cell } from 'react-table';
import { COLUMNS } from './columns'; 
import useFetchArticles from './fetchArticles'; 
import styles from './table.module.scss';  

// The data type for the article that is to be manipulated for the table.
interface Article {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

export const BasicTable: React.FC = () => {
    const articles = useFetchArticles();
    
    const columns = useMemo<Column<Article>[]>(() => COLUMNS, [])
    const data = useMemo<Article[]>(() => articles, [articles])
    
    const tableInstance = useTable<Article>(
        {
            columns,
            data
        },
        useSortBy
    )

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow 
    } = tableInstance

    return (
        <div className={styles.tableContainer}>
            <table {...getTableProps()} className={styles.darkThemeTable}>
                <thead>
                    {/*Headers for the table*/}
                    {headerGroups.map((headerGroup: HeaderGroup<Article>) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: HeaderGroup<Article>) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {/*Contents of the header for the each of the columns*/}
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: Row<Article>) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: Cell<Article>) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable;