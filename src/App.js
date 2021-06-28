import React, { useState, useEffect } from 'react'
import { Card, CardContent, MenuItem, Select, FormControl } from '@material-ui/core'
import uuid from 'react-uuid'

import Table from "./components/Table.js"
import InfoBox from "./components/InfoBox"
import Map from "./components/Map"
import LineGraph from "./components/LineGraph"
import { sortData, prettyPrintStat } from "./utils/utils"
import numeral from "numeral";

import './App.css';
import "leaflet/dist/leaflet.css"

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
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
          setMapCountries(data)
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
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
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <div className="app__map">
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
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
