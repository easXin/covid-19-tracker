import React, { useState, useEffect } from 'react'
import { sortData, prettyPrintStat } from "../../utils/utils"
import Table from "../Table"
import c19 from "./c19.jpg"
import './CountryList.css'
import { useDispatch, useSelector } from 'react-redux';

function CountryList() {

    const [tableData, setTableData] = useState([]);
    // const [fatalityCases, setFatalityCases] = useState(0);
    const diseaseShApi = "https://disease.sh/v3/covid-19/"
    const dispatch = useDispatch()
    // const epidemicList = useSelector(state => state.epidemicList)
    const covidTotal = useSelector(state => state.covidTotal)

    useEffect(() => {
        const getCountriesData = async () => {
            // fetch(`${diseaseShApi}all`)
            //     .then((response) => response.json())
            //     .then(worldwideData => {
            //         setFatalityCases(worldwideData['deaths'])
            //         dispatch({
            //             type: 'SET_TOTAL_CASES',
            //             totalCases: worldwideData
            //         })
            //     })
            fetch(`${diseaseShApi}countries`)
                .then((response) => response.json())
                .then((epidemicList) => {

                    const countries = epidemicList.map((data) => ({
                        country: data.country,
                        cases: data.cases,
                        recovered: data.recovered,
                        deaths: data.deaths,
                        fatality: 442
                    }));
                    // console.log(">>>", countries)
                    // (data.deaths / fatalityCases) * 100
                    dispatch({
                        type: 'SET_EPIDEMIC_LIST',
                        epidemicList: epidemicList
                    })
                    // let sortedData = sortData(epidemicList);
                    setTableData(countries);
                });

        };
        getCountriesData();


    }, []);



    return (

        <div div className="countryList" >
            {/* {console.log(tableData)} */}
            <Table countries={tableData} />
            {/* <div className="countryList__ad">
                <img src={c19} alt="ad" />
            </div> */}

        </div >
    )
}

export default CountryList