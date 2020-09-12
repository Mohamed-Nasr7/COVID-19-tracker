import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";



//sort countries by number of cases
export const SortData = (data) => {
    let newSortedCountries = [...data];

    newSortedCountries.sort( (a, b) => {
        return a.cases > b.cases ? -1 : 1
    });

    return newSortedCountries
}




