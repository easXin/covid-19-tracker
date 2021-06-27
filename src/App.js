import React, { useState, useEffect } from 'react'
import { Card, CardContent, MenuItem, Select, FormControl } from '@material-ui/core'

import Table from "./components/Table.js"
import InfoBox from "./components/InfoBox"
import Map from "./components/Map"
import { sortData } from "./utils/utils"
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  //const 
  const diseaseShApi = "https://disease.sh/v3/covid-19/"

  // *** 
  useEffect(() => {
    fetch(`${diseaseShApi}all`)
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data)
      })
  })
  // async : I want to send a request, wait for it , do something with it 
  // await :  do something with promise
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`${diseaseShApi}countries`)
        // json() takes in a res, return a promise
        .then(response => response.json())
        .then(data => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States
              value: country.countryInfo.iso2 // USA
            }
          ))
          const sortedData = sortData(data);
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
    /*
      Step of api call
      1. use async to make api call
      2. turn it into json format
      3. parse the data, and filter out the needed one
      4. call api function itself
      5. populate the data on front end page
    */
  }, [])

  // []  only run one time
  // [xxx]  re-execute if xxx change 

  const handleCountryChange = async (event) => {
    //console.log(event)
    const countryCode = event.target.value
    //console.log("1000 >>>", countryCode)
    setCountry(countryCode)

    // pull the information for this country, then render on the table 

    const url = countryCode === "worldwide" ? `${diseaseShApi}all` :
      `${diseaseShApi}${countryCode}`

    await fetch(url).then(
      res => res.json()
    ).then(data => {
      setCountryInfo(data)
    })
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <p>COVID-19 Tracker & Interactive Charts</p>
          {/* Title Select input dropdown filed */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country} //??
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>
        {/*     todayRecovered recovered     todayDeaths    deaths
         */}
        {/* InfoBoxes */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <div className="app__diseaseDistributionMap">
          <Map></Map>
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          {/* title */}
          <h3>Live Case by Country</h3>
          <Table countries={tableData} />
          {/* new cases */}
          <h3>Worldwide new cases </h3>
        </CardContent>

      </Card>

    </div>
  );
}

export default App;
