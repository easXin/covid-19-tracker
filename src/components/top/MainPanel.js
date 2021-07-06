import React, { useState, useEffect } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Map from '../Map'
import { sortData, prettyPrintStat } from "../../utils/utils"
import numeral from "numeral";
import InfoBox from "../InfoBox"
import { Card, CardContent, MenuItem, Select, FormControl } from '@material-ui/core'
import LineGraph from '../LineGraph';
import './MainPanel.css'


function MainPanel() {
    const imgUrl = "https://www.holbrooklife.com/wp-content/uploads/2020/03/covid-2.jpg"
    const diseaseShApi = "https://disease.sh/v3/covid-19/"
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    //37.09024  -95.712891
    //const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapCenter, setMapCenter] = useState({ lat: 37.09024, lng: -95.712891 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([])

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
        getCountriesData();
    }, []);

    const handleCountryChange = async (e) => {
        const countryCode = e.target.value;
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
        <div className="mainPanel">
            <div className="mainPanel__top">
                <img
                    className="mainPanel__logo"
                    src={imgUrl}
                    alt="C19 logo"
                />
                <div className="mainPanel__search">
                    <SearchIcon />
                    <input type="text" placeholder="Search Table ... " className="mainPanel__searchInput" />
                    <ArrowDropDownIcon className="mainPanel__inputArrow" />
                </div>
            </div>
            <div className="mainPanel__mid">
                <Map
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <div className="mainPanel__bottom">
                <div className="mainPanel__bottomTop">
                    <Card className="mainPanel__bottomLeft card">
                        <CardContent>
                            <div className="detail">
                                <LineGraph casesType={casesType} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardContent>
                            <div className="detail">
                                <LineGraph casesType={casesType} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="mainPanel__bottomDown">

                    <Card className="mainPanel__bottomLeft card">
                        <CardContent>
                            <div className="detail">
                                <LineGraph casesType={casesType} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardContent>
                            <div className="detail">
                                <LineGraph casesType={casesType} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default MainPanel
