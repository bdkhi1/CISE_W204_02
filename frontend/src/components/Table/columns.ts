// Remove the React import if not needed.
import { Column } from 'react-table';

// The column type interface for Article
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

// Define columns with action handlers included
export const COLUMNS: Column<Article>[] = [
    {
        Header: 'Id',
        accessor: 'id', // Accessor is the "key" in the data
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Author(s)',
        accessor: 'authors',
    },
    {
        Header: 'Source',
        accessor: 'source',
    },
    {
        Header: 'Publication Year',
        accessor: 'pubyear',
    },
    {
        Header: 'DOI',
        accessor: 'doi',
    },
    {
        Header: 'Claim',
        accessor: 'claim',
    },
    {
        Header: 'Evidence Level',
        accessor: 'evidence',
    },
];
