import React, { useState, useEffect } from 'react'
import { sortData, prettyPrintStat } from "../utils/utils"
import Table from "./Table"
import './CountryList.css'

function CountryList() {

    const [tableData, setTableData] = useState([]);
    const diseaseShApi = "https://disease.sh/v3/covid-19/"


    useEffect(() => {
        const getCountriesData = async () => {
            fetch(`${diseaseShApi}countries`)
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    let sortedData = sortData(data);
                    setTableData(sortedData);
                });
        };
        getCountriesData();
    }, []);
    return (
        <div className="countryList">
            <Table countries={tableData} />
        </div>
    )
}

export default CountryList
