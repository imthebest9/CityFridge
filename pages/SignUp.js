import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import SwitchSelector from "../components/SwitchSelector";
import { styles } from "./SignIn";
import { StackActions } from "@react-navigation/native";
import { auth, database, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

let apiKey = "AIzaSyBOEnN1am9vWvDCIcCF2YurPo8OGwHQDKo";
import * as Location from "expo-location";

export default ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");

  const [isVendor, setIsVendor] = useState(false);

  //Get Location
  const [locationRaw, setLocationRaw] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [addressRaw, setAddressRaw] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");

  const onValidatie = () => {
    if (!name) alert("Please enter your name");
    else if (isVendor && !description)
      alert("Please add a description for your store");
    else if (!email) alert("Please enter your email address");
    else if (!contact) alert("Please enter your mobile number");
    else if (!password) alert("Please enter your password");
    else if (!confirmPassword) alert("Please confirm your password");
    else if (password != confirmPassword)
      alert("Password must be same.\nPlease confirm again");
    else if (!address) alert("Please set up your location");
    else return true;
    return false;
  };

  const onSignUp = () => {
    if (onValidatie()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (isVendor) {
            setDoc(doc(database, "vendors", user.uid), {
              name: name,
              description: description,
              contact: contact,
              email: email,
              latitude: latitude,
              longitude: longitude,
              address: address,
              isVendor: isVendor,
              contribution: parseFloat(0),
              image_url: await getDownloadURL(ref(storage, "logo.jpeg")),
            });
          } else {
            setDoc(doc(database, "customers", user.uid), {
              name: name,
              contact: contact,
              email: email,
              latitude: latitude,
              longitude: longitude,
              address: address,
              isVendor: isVendor,
              contribution: parseFloat(0),
              image_url: await getDownloadURL(ref(storage, "logo.jpeg")),
            });
          }
          setDoc(doc(database, "history", user.uid), {
            food: [],
            contribution: parseFloat(0),
          })
            .then(() => {
              sendEmailVerification(user).then(() => {
                alert(
                  "Thank you for signing up for CityFridge.\nPlease verify your email then log in."
                );
                navigation.dispatch(StackActions.replace("Sign In"));
              });
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

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
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      console.log(latitude);
      console.log(longitude);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log(regionName, "nothing");
        console.log("Region Name Here");
        console.log(regionName[0].district == null);

        var NAME = "";
        var CITY = "";
        var District = "";

        if (regionName[0].name) {
            NAME = regionName[0].name;
        }
        if (regionName[0].city) {
            CITY = regionName[0].city;
        }
        if (regionName[0].district) {
            District = regionName[0].district;
        }

        setAddress(      
            regionName[0].name          + ", "  +             
            regionName[0].city          + ", "  +                      
            // regionName[0].district      + ", "  +
            regionName[0].postalCode    + ", " +             
            regionName[0].region        + ", " +             
            regionName[0].country 
        );
      }
    })();
    
};
console.log(address);  

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <SwitchSelector
          selectionOption={1}
          optionLeft={"Customer"}
          optionRight={"Vendor"}
          onSelectSwitch={(option) => {
            setIsVendor(option == 1 ? false : true);
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {isVendor ? (
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder="Business Name"
              onChangeText={(input) => setName(input.trim())}
            />
            <TextInput
              style={styles.textInput}
              multiline={true}
              maxHeight={80}
              placeholder="Store Description"
              onChangeText={(input) => setDescription(input.trim())}
            />
          </View>
        ) : (
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={(input) => setName(input.trim())}
            />
          </View>
        )}
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(input) => setEmail(input.trim())}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contact Number"
            onChangeText={(input) => setContact(input.trim())}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(input) => setPassword(input)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            onChangeText={(input) => setConfirmPassword(input.trim())}
            secureTextEntry={true}
          />
          <View style={styles.locationField}>
            <TextInput
              style={styles.textInput}
              placeholder="Location"
              onChangeText={(input) => setLocation(input.trim())}
            />
            <TouchableOpacity style={styles.button} onPress={getLocation}>
              <Text style={styles.buttonText}>Set Location</Text>
            </TouchableOpacity>
          </View>
          {/* <TextInput
            style={styles.textInput}
            placeholder="Full Address"
            onChangeText={(input) => setAddress(input.trim())}
          /> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
