import React, { useState, useEffect, useMemo } from 'react'
import { sortData, prettyPrintStat } from "./utils/utils"
import './App.css';
import "leaflet/dist/leaflet.css"
import MainPanel from './components/top/MainPanel'
import CountryList from './components/top/CountryList'

import { useDispatch, useSelector } from 'react-redux';

import { Provider } from 'react-redux';
import { createStore } from 'redux'


const initState = {
  epidemicList: [],
  selectedCountry: "",
  totalCases: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_COUNTRY':
      return {
        ...state,
        selectedCountry: action.selectedCountry
      }
    case 'SET_EPIDEMIC_LIST':
      return {
        ...state,
        epidemicList: action.epidemicList
      }
    case 'SET_TOTAL_CASES':
      return {
        ...state,
        totalCases: action.totalCases
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

  const [flag, setFlag] = useState(true)
  //const dispatch = useDispatch()
  // ------------------------------------------  v2 
  useEffect(() => {
    fetch(`${diseaseShApi}all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, [flag]);



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
            <MainPanel className="app__main" />
          </div>
          <div className="app__headerRight">
            <CountryList deathTotal={countryInfo['deaths']}/>
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
