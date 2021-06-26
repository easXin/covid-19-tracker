import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import ManuItem from '@material-ui/core/MenuItem'
import './App.css';

function App() {
  const [countries, setCountries] = useState(["US", "CN", "Euro"])
  return (
    <div className="app">
      {/* useState  setup variables in react*/}
      <div className="app__header">
        {/* Header */}
        <p>Covid-19 Tracker</p>
        {/* Title Select input dropdown filed */}
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value="abc"
          >
            {
              countries.map((country) => (
                <ManuItem value={country}>{country}</ManuItem>
              ))
            }

            {/* 
              <ManuItem value="worldwide">Option 1</ManuItem>
              <ManuItem value="worldwide">Option 2</ManuItem>
              <ManuItem value="worldwide">Option 3</ManuItem>
              <ManuItem value="worldwide">Option 4</ManuItem>
            */}
          </Select>
        </FormControl>
      </div>



      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
