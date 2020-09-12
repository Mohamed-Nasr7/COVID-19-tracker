import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import WorldMap from "./WorldMap";
import Table from "./Table";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { SortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState();
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapzoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // To display Worldwide Cases at the first time user opens the app
  useEffect(() => {
    const fetchedData = async () => {
      const response = await fetch(`https://disease.sh/v3/covid-19/all`);
      const data = await response.json();
      setCountryInfo(data);
    };
    fetchedData();
  }, []);

  useEffect(() => {
    const fetchedData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      const allCountries = data.map((country) => ({
        name: country.country, //United States, France
        value: country.countryInfo.iso2, // US, FR, etc..
      }));

      let sortedData = SortData(data);
      // view sorted countries on the table
      setTableData(sortedData);
      // To view all countries on select box
      setCountries(allCountries);
      console.log(data);
      setMapCountries(data);
    };
    fetchedData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value; // the value of the select box which is country value (US, Uk, FR)

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await fetch(url);
    const data = await response.json();

    // so that country that user clicks on will be displayed on the select
    setSelectedCountry(countryCode);

    // saving the data to be displayed on the info box
    setCountryInfo(data);

    // set map long and lat and map zoom
    setMapCenter([data.countryInfo.lat, data.countryInfo.lat]);
    setMapzoom(4);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              value={selectedCountry}
              onChange={onCountryChange}
              variant="outlined"
            >
              <MenuItem value="worldwide"> Worldwide </MenuItem>
              {countries.map((country, i) => {
                return (
                  <MenuItem value={country.value} key={i}>
                    {" "}
                    {country.name}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            click={() => setCasesType("cases")}
            active={casesType === "cases"}
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            click={() => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            click={() => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <WorldMap
          type={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live cases by country</h3>
            <Table countries={tableData} />

            <h3>Worldwide new cases</h3>
            <LineGraph type={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
