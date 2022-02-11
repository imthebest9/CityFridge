import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

// You can import from local files

let apiKey = "AIzaSyBOEnN1am9vWvDCIcCF2YurPo8OGwHQDKo";

import * as Location from "expo-location";

export default function TestMapPage(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  // const [getLocation, setGetLocation] = useState(false);

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      Location.setGoogleApiKey(apiKey);

      console.log(status);

      let { coords } = await Location.getCurrentPositionAsync();

      setLocation(coords);

      console.log(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log(regionName, "nothing");
        console.log("Region Name Here", regionName);
      }

      // console.log();
    })();
  };

  //Within Certian Distance?
  function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;                                         // Some formula
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  //Calculate Distance (km)
  function getDistance(checkPoint, centerPoint) {
    var ky = 40000 / 360;                                         // Some formula
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    var distance = Math.sqrt(dx * dx + dy * dy);
    distance = distance.toFixed(2);
    return distance;
  }

  var centerPt = { lat: 2.2021996431185085, lng: 102.25251482831439 };  // Center Pt
  var checkPt = { lat: 2.200877, lng: 102.2549964 };                    // Check Pt
  var km = 10 ;
  var n = arePointsNear(centerPt, checkPt, km); //Return whether within certain range.

  // console.log(n);

  return (
    <View style={styles.container}>
      <Text style={styles.big}>
        {!location
          ? "Waiting"
          : `Lat: ${location.latitude} \nLong: ${
              location.longitude
            } \n${JSON.stringify(address?.["subregion"])}`}
      </Text>
      <TouchableOpacity onPress={getLocation}>
        <View
          style={{
            height: 100,
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={styles.btnText}> GET LOCATION </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});
