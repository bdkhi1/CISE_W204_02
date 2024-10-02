/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useMemo } from 'react';
import { useTable, useSortBy, Column, HeaderGroup, Row, Cell, useGlobalFilter, ColumnInstance } from 'react-table';
import { COLUMNS } from './columns'; 
import useFetchArticles from './fetchArticles'; 
import styles from './table.module.scss';  
import { TableFilter } from './TableFilter';

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
    // Use type assertion to avoid errors if `useFetchArticles` returns an unexpected type.
    const articles = useFetchArticles() as Article[];

    // Memoize columns and data to optimize performance
    const columns = useMemo<Column<Article>[]>(() => COLUMNS, []);
    const data = useMemo<Article[]>(() => articles, [articles]);

    // @ts-ignore - Ignore TypeScript error for setGlobalFilter
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        // @ts-ignore - Ignore TypeScript error for setGlobalFilter
        setGlobalFilter,
    } = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy); 

    // @ts-ignore - Ignore TypeScript error for globalFilter
    const { globalFilter } = state;

    return (
        <>
            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className={styles.tableContainer}>
                <table {...getTableProps()} className={styles.darkThemeTable}>
                    <thead>
                        {/* Headers for the table */}
                        {headerGroups.map((headerGroup: HeaderGroup<Article>) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map((column: ColumnInstance<Article>) => (
                                    // @ts-ignore - Ignore TypeScript error for getSortByToggleProps
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                                        {column.render('Header')}
                                        <span>
                                            {/* Suppress TypeScript error for isSorted */}
                                            {/* @ts-ignore */}
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* Contents of the body for each of the columns */}
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row: Row<Article>) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell: Cell<Article>) => {
                                        return (
                                            <td {...cell.getCellProps()} key={cell.row.id}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BasicTable;
