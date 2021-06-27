import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InfoBox from "./components/InfoBox"
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  // async : I want to send a request, wait for it , do something with it 
  // await :  do something with promise
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        // json() takes in a res, return a promise
        .then(response => response.json())
        .then(data => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States
              value: country.countryInfo.iso2 // USA
            }
          ))
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
  }
  return (
    <div className="app">
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
      {/* InfoBoxes */}
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
        <InfoBox title="Recovered" cases={121} total={3000} />
        <InfoBox title="Death" cases={332} total={4000} />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
