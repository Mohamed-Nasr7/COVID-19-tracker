import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './Map.css';
import { CircleMarker, Popup } from "react-leaflet";
import numeral from "numeral";


const casesTypeConfig = {
    cases: {
      hex: "#CC1034",
      factor: 30,
    },
    recovered: {
      hex: "#7dd71d",
      factor: 20,
    },
    deaths: {
      hex: "#fb4443",
      factor: 10,
    },
};



function WorldMap( {countries, type='cases', center, zoom} ) {
    return (
        <div className="map">
            <Map center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {
                    countries.map( country => (
                        <CircleMarker
                            center= { [country.countryInfo.lat, country.countryInfo.long] }
                            color= { casesTypeConfig[type].hex }
                            fillColor= { casesTypeConfig[type].hex }
                            fillOpacity= { 0.4 }
                            radius= { Math.sqrt(country[type]) / casesTypeConfig[type].factor }
                        >
                            <Popup>
                                <div className="info-container">
                                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                                    <div className="info-name">{country.country}</div>
                                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                                </div>
                            </Popup>
                
                        </CircleMarker>
                    ))
                }
                
            </Map>
        </div>
    )
}

export default WorldMap
