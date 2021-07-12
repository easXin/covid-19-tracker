import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './top/columns'
import "./Table.css"

function Table({ countries }) {
    // console.log("?>>>", countries)
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => countries, [])

    const tableInstance = useTable({
        columns, data
    }, useSortBy)

    const {
        getTableProps, getTableBodyProps,
        headerGroups, rows, prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                    </th>
                                ))
                            }
                        </tr>
                    ))}

            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>
                                            {
                                                //console.log(">>", cell)
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
    )
}

export default Table
