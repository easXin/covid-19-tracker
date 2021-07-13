import React, { useState, useEffect, useMemo } from 'react'
import Table from "../Table"
import c19 from "./c19.jpg"
import './CountryList.css'
import { useDispatch, useSelector } from 'react-redux';

function CountryList({ deathTotal }) {
    // console.log(deathTotal)
    const [tableData, setTableData] = useState([]);
    // const [fatalityCases, setFatalityCases] = useState(0);
    const diseaseShApi = "https://disease.sh/v3/covid-19/"
    const dispatch = useDispatch()

    useEffect(() => {
        const getCountriesData = async () => {

            fetch(`${diseaseShApi}countries`)
                .then((response) => response.json())
                .then((epidemicList) => {

                    const countries = epidemicList.map((data) => ({
                        country: data.country,
                        cases: data.cases,
                        recovered: data.recovered,
                        deaths: data.deaths,
                        fatality: (((data.deaths / data.cases) * 100).toFixed(2)).toString() + "%"
                    }));

                    dispatch({
                        type: 'SET_EPIDEMIC_LIST',
                        epidemicList: epidemicList
                    })
                    setTableData(countries);
                });

        };
        getCountriesData();


    }, []);

    // console.log(tableData)
    return (
        //  ? tableData : "Loading"
        <div className="countryList">
            <Table countries={tableData} />
        </div>
    )
}

export default CountryList