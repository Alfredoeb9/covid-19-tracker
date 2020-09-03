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
import Table from './Table';
import { sortData } from './utility';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  

  // When the page loads fire off useEffect
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);


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
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        // All of the data from the countries reponse
        setCountryInfo(data);
      });
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
            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>

        <Map center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>WorldWide by Cases</h3>
          <LineGraph />
        </CardContent>
          {/* Graph */}
      </Card>
      
    </div>
  );
}

export default App;
