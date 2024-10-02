export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Author(s)',
        accessor: 'authors'
    },
    {
        Header: 'Source',
        accessor: 'source'
    },
    {
        Header: 'Publication Year',
        accessor: 'pubyear'
    },
    {
        Header: 'DOI',
        accessor: 'doi'
    },
    {
        Header: 'Claim',
        accessor: 'claim'
    },
    {
        Header: 'Evidence Level',
        accessor: 'evidence'
    },
    {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        ),
      },
]