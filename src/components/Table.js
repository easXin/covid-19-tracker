import React from 'react'
import "./Table.css"
import uuid from "react-uuid"
function Table({ countries }) {
    return (
        <div className="table">
            <table>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={uuid()}>
                            <td>{country}</td>
                            <td>
                                <strong>{cases}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
