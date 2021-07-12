import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { COLUMNS } from './top/columns'
import "./Table.css"

export const Table = ({ countries }) => {
    // console.log("-->", countries)
    const columns = useMemo(() => COLUMNS, [])
    console.log("+++", countries)

    const data = useMemo(() => countries, [])

    const {
        getTableProps, getTableBodyProps,
        headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage,
        pageOptions, state,
        gotoPage, pageCount,
        setPageSize
    } = useTable({
        columns,
        data
    }, useSortBy, usePagination)
    const { pageIndex, pageSize } = state

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? " Y" : " X") : " D"}
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    {' '}
                </span>


                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="hideMe">
                    {
                        [37].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <br />

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={previousPage} disabled={!canPreviousPage}>
                    Prev
                </button>
                <button onClick={nextPage} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    )
}

export default Table