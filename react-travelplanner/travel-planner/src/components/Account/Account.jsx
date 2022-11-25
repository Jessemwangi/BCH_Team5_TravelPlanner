
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { trips } from '../../data/trips';
import {
  addDoc,
  serverTimestamp, collection, getDocs, onSnapshot, where, setLoading,
  doc, query, orderBy, limit, deleteDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { db } from '../../FireBaseInit';
import { UserAuth } from "../Context/Context";

import RecentTrips from "../../views/RecentTrips/RecentTrips";
import NextTripList from "../../views/NextTripList/NextTripList";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser"
import "./Account.css";

let newarray = [];
const items = [];
let yourTrips = [];
const Account = () => {
  const { logOut, user } = UserAuth();
  const owner = user ? user.uid : 'unknown';
  const ref = collection(db, 'myplan')

  const [Trips, setTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const myTrips = trips;
  //const [myTrips, setMyTrips] = useState({ mytrips });
  const navigate = useNavigate();

  const handleSignOut = async () => {

    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {

    if (user == null) {
      navigate('/');
    }


    const q = query(
      ref,
      //  where('owner', '==', currentUserId),
      where('title', '==', 'School1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {     to be used when query is present
    const unsub = onSnapshot(ref, (querySnapshot) => {

      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTrips(items);
      setLoading(false);
      console.log(items, Trips)
      setUserTrips(yourTrips);


    });
    return () => {
      newdata();
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  function newdata() {
    newarray = items.filter((item) => item.userId === owner)
    return newarray.length;
  }


  function setName() {
    if (user) {
      let indexFirstSpace = /\s/.exec(user.displayName).index;
      return (user.displayName).slice(0, indexFirstSpace);
    }
  }

  const CurrentUserTrips = () => {
    return (
      items.filter((item) => item.userId === owner).map((mytrip) => (
        <div key={Math.random()}>

          <RecentTrips
            TotalTrip={mytrip.length}
            key={mytrip.transactionID}
            name={mytrip.tripname}
            // date={mytrip.tripdate.nanoseconds}
            sightsList={mytrip.sightname?.map((sight) => {
              return <li key={sight}>{sight}</li>
            })} >
            {console.log(mytrip.sightname)}
          </RecentTrips>
          <div key={mytrip.sightname}>



          </div>
        </div>

      )))
  }

  return (
    <div className="account-container">
      <WelcomeUser />
      <div className="title"><h3>Your Account</h3></div>
      <section className="trips-container">

        <div className="next-trips">

          {loading ? <h4>Loading Content.... </h4>
            : <div> <h3>You have  {newdata()} Trips Planned</h3>
              <div>
                {CurrentUserTrips()}
              </div>
            </div>
          }

        </div>
        <div className="explore-trips">
          <div><h3>What Next?</h3></div>
          <h4>Explore more</h4>
          <div className="next-trip-list">
            <h3>total trips </h3>
            <NextTripList name={'happy trips'} />
          </div>
        </div>
      </section>
    </div >
  );
};

export default Account;
