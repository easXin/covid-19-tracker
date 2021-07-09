import React, { useState, useEffect } from 'react'
// import { Card, CardContent, MenuItem, Select, FormControl } from '@material-ui/core'
// import uuid from 'react-uuid'

// import Table from "./components/Table.js"
// import InfoBox from "./components/InfoBox"
// import Map from "./components/Map"
// import LineGraph from "./components/LineGraph"
import { sortData, prettyPrintStat } from "./utils/utils"
// import numeral from "numeral";

import './App.css';
import "leaflet/dist/leaflet.css"

// ------------------------------------------  v2 
import MainPanel from './components/top/MainPanel'
import CountryList from './components/top/CountryList'
import News from './components/mid/News'
import Symptoms from './components/bottom/Symptoms'
import Footer from './components/footer/Footer'


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

  // ------------------------------------------  v2 

  useEffect(() => {
    fetch(`${diseaseShApi}all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
      <div className="app__header">
        <div className="app__headerLeft">
          <MainPanel className="app__main" />
        </div>
        <div className="app__headerRight">
          <CountryList />
        </div>
      </div>
      <div className="app__body">
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
        <p>sadasdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
      </div>






      {/* <div className="app__body">

      </div>
      <div className="app__footer">

      </div> */}
      {/* <div className="app__c19">
        <div className="app__top">
         
          <div className="app__topLeft">
            <MainPanel className="app__main" />
          </div>
          <div className="app__topRight">
            <CountryList />
          </div>

        </div>

      </div> */}


      {/*
      <div className="app__mid">
        <News />
      </div>

      <div className="app__bottom">
        <Symptoms />
      </div>

      <div className="app__footer">
        <Footer />
      </div> */}
    </div>
  );
};

export default App;
