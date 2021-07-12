import React from 'react'
import "./Table.css"
import uuid from "react-uuid"
import { useDispatch, useSelector } from 'react-redux';
function Table({ countries }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Recovered</th>
                        <th>Death</th>
                        <th>Fatality</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(({ country, cases, recovered, deaths, fatality }) => (
                        <tr key={uuid()}>
                            <td>{country}</td>
                            <td>{cases}</td>
                            <td>{recovered}</td>
                            <td>{deaths}</td>
                            <td>{fatality}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
