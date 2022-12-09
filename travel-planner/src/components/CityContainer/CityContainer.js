import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating'
import Weather from "../Weather/Weather"
import "./CityContainer.css";
import { db } from '../../FireBaseInit';
import { collection, getDocs } from "firebase/firestore";


const CityContainer = ({ cityName, rating, sights }) => {

  /* const [sightsArray, setSightsArray] = useState([]);

  const sightData = []; */
  const imageSrc = `https://source.unsplash.com/500x400/?${cityName}`;

 /*  async function getSights() {
    const sightsSnapshot = await getDocs(collection(db, "sights"));
    sightsSnapshot.docs.forEach((sight) => {
      sightData.push(sight.data());

    })
    setSightsArray(sightData);
    return sightData;
  } */

  const sightsList = () => {
    let list = sights.filter((sight) => sight.cityName === { cityName });
   let listItems = list.map((sight) => (<li>{sight.sightName}</li>));
   return listItems;
  }
  
/* 

  useEffect(() => {
    getSights();
    console.log(sightsArray);

  }, []); */


  return (
    <div className="city-container" >
      <div className="city-img">
        <img src={imageSrc} alt="city img" />
      </div>
      <div className="city-info">
        <h3 className="city-name">{cityName}</h3>
        <ul>{sightsList}</ul>

        <Rating rating={rating} />
        <Weather cityName={cityName} />
        <Link to={`/explore/${cityName}`}>See More</Link>
      </div>
    </div>
  );
};

export default CityContainer;
