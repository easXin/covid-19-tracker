import React, { useState, useEffect } from 'react'
import { Card, CardContent, MenuItem, Select, FormControl } from '@material-ui/core'
import uuid from 'react-uuid'

import Table from "./components/Table.js"
import InfoBox from "./components/InfoBox"
// import MapDistri from "./components/MapDistri"
import LineGraph from "./components/LineGraph"
import { sortData } from "./utils/utils"
import './App.css';

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const diseaseShApi = "https://disease.sh/v3/covid-19/"

  useEffect(() => {
    fetch(`${diseaseShApi}all`)
      // json() takes in a res, return a promise
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  /*
      async : I want to send a request, wait for it , do something with it
      await :  do something with promise

      Step of api call
      1. use async to make api call
      2. turn it into json format
      3. parse the data, and filter out the needed one
      4. call api function itself
      5. populate the data on front end page
  */
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
          setCountries(countries);
          setTableData(sortedData);
        });
    };
    // complete api call
    getCountriesData();
  }, []);
  //  []  : runs one time   [xxx] : runs based on the condition 

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    // pull out information for selected country, then render data 
    // on the table 
    const url =
      countryCode === "worldwide"
        ? `${diseaseShApi}all`
        : `${diseaseShApi}countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker & Interactive Charts</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={uuid()} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>


      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
