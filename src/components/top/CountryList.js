import React, { useState, useEffect } from 'react'
import { sortData, prettyPrintStat } from "../../utils/utils"
import Table from "../Table"
import c19 from "./c19.jpg"
import './CountryList.css'

function CountryList() {

    const [tableData, setTableData] = useState([]);
    const diseaseShApi = "https://disease.sh/v3/covid-19/"
    const coronavirusAd = "https://s3-prod.adage.com/s3fs-public/styles/width_1024/public/20200416_CDC_Ad_council_3x2.jpg"

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
            <div className="countryList__ad">
                <img src={c19} alt="ad" />
            </div>

        </div>
    )
}

export default CountryList
