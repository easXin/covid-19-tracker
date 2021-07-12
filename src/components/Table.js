import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './top/columns'
import "./Table.css"

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ImportExportIcon from '@material-ui/icons/ImportExport';

function Table({ countries }) {
    console.log(countries)
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
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />) : <ArrowDropUpIcon />}
                                        </span>
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
