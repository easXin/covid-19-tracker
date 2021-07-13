import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from 'react-table'
import { COLUMNS } from './top/columns'
import "./Table.css"
import Filter from '../components/top/Filter'

export const Table = ({ countries }) => {
    // console.log("-->", countries)
    const columns = useMemo(() => COLUMNS, [])
    //console.log("+++", countries)

    const data = useMemo(() => countries, [countries])

    const {
        getTableProps, getTableBodyProps,
        headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage,
        pageOptions, state, setGlobalFilter,
        gotoPage, pageCount,
    } = useTable({
        columns,
        data,
        initialState: { pageSize: 20 }
    }, useFilters, useGlobalFilter, useSortBy, usePagination)

    const { pageIndex, pageSize } = state
    const { globalFilter } = state
    return (
        <>
            <Filter filter={globalFilter} setFilter={setGlobalFilter} />
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
                                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : " D"}
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
            <br />
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    {' '}
                </span>

                <br />
                <div className="table__bottom">
                    <div className="table__bottomLeft">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                        <button onClick={previousPage} disabled={!canPreviousPage}>
                            Prev
                        </button>
                    </div>
                    <div className="table__bottomRight">
                        <button onClick={nextPage} disabled={!canNextPage}>
                            Next
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Table