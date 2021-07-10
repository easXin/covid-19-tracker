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

// import { Provider } from 'react-redux';
// import store from './redux/dataStore'
import { useDispatch, useSelector } from 'react-redux';

import Counter from './Counter.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux'




const initState = {
  count: 42
}

function reducer(state = initState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      }
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}
const store = createStore(reducer)


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




  return (
    <Provider store={store}>

      <div className="app">
        <div className="app__header">
          <div className="app__headerLeft">
            <Counter />
            {/* <MainPanel className="app__main" /> */}
          </div>
          <div className="app__headerRight">
            {/* <CountryList /> */}
          </div>
        </div>
        <div className="app__body">
          <div className="app__news"></div>
          <div className="app__symptoms"></div>
        </div>
        <div className="app__footer">
          <div className="app__icons"></div>
          <div className="app__copyRights"></div>
        </div>
      </div>
    </Provider>

  );
};

export default App;
