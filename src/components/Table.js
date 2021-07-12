import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './top/columns'
import "./Table.css"

export const Table = ({ countries }) => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => countries, [])

    const tableInstance = useTable({
        columns: columns,
        data: data
    })

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
                                    <th {...column.getHeaderProps()}>
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