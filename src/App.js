import React, {useState, useEffect} from 'react';
import './App.css';
import  {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // https://disease.sh/v3/covid-19/countries

  // When the page loads fire off useEffect
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2 // UI, USA, FR
            }
          ));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>

          {/* Material UI library */}
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
          {/* Header */}

          {/* Title + Select iinput dropdown field */}

          <div className="app_stats">
            <InfoBox title="Coronavirus Cases" cases={2334} total={2000}/>

            <InfoBox title="Recovered" cases={4393} total={3000}/>

            <InfoBox title="Deaths" cases={12121} total={4000}/>
          </div>

        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>

          <h3>WorldWide by Cases</h3>
        </CardContent>
          {/* Table */}
          {/* Graph */}
      </Card>
      
    </div>
  );
}

export default App;
