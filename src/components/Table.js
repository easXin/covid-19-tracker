import React from 'react'
import "./Table.css"
import uuid from "react-uuid"
function Table({ countries }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Recovered</th>
                        <th>Death</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={uuid()}>
                            <td>{country}</td>
                            <td>{country}</td>
                            <td>{country}</td>
                            <td>{country}</td>
                            <td>{country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
