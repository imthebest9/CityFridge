import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserSetting from "./pages/UserSetting";
import UserProfile from "./pages/UserProfile";
import UserHistory from "./pages/UserHistory";
import VendorMain from "./pages/VendorMain";
import VendorConfirmOrder from "./pages/VendorConfirmOrder";
import VendorUpdateFoodQty from "./pages/VendorUpdateFoodQty";
import VendorNewFoodType from "./pages/VendorNewFoodType";
import {
  useFonts,
  Merriweather_300Light,
  Merriweather_300Light_Italic,
  Merriweather_400Regular,
  Merriweather_400Regular_Italic,
  Merriweather_700Bold,
  Merriweather_700Bold_Italic,
  Merriweather_900Black,
  Merriweather_900Black_Italic,
} from "@expo-google-fonts/merriweather";
import {
  MerriweatherSans_300Light,
  MerriweatherSans_400Regular,
  MerriweatherSans_500Medium,
  MerriweatherSans_600SemiBold,
  MerriweatherSans_700Bold,
  MerriweatherSans_800ExtraBold,
  MerriweatherSans_300Light_Italic,
  MerriweatherSans_400Regular_Italic,
  MerriweatherSans_500Medium_Italic,
  MerriweatherSans_600SemiBold_Italic,
  MerriweatherSans_700Bold_Italic,
  MerriweatherSans_800ExtraBold_Italic,
} from "@expo-google-fonts/merriweather-sans";
import AppLoading from "expo-app-loading";
import StorePage from "./pages/StorePage";

const Stack = createStackNavigator();

export default function Navigation() {
  let [fontsLoaded] = useFonts({
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
    Merriweather_900Black,
    Merriweather_900Black_Italic,
    MerriweatherSans_300Light,
    MerriweatherSans_400Regular,
    MerriweatherSans_500Medium,
    MerriweatherSans_600SemiBold,
    MerriweatherSans_700Bold,
    MerriweatherSans_800ExtraBold,
    MerriweatherSans_300Light_Italic,
    MerriweatherSans_400Regular_Italic,
    MerriweatherSans_500Medium_Italic,
    MerriweatherSans_600SemiBold_Italic,
    MerriweatherSans_700Bold_Italic,
    MerriweatherSans_800ExtraBold_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#116530", elevation: 0 },
            headerTitleStyle: { fontSize: 24, fontFamily:"Merriweather_700Bold" }
          }}
          initialRouteName="Kingsbay Hypermarket"  // testing
        >
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            initialParams={{ styles}}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Sign Up")}
                >
                  <Text style={[styles.buttonText, { margin: 10 }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            initialParams={{ styles }}
          />
          <Stack.Screen
            name='Profile'
            component={UserProfile}
            initialParams={{ styles }}
            options={({navigation, route}) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={()=>navigation.navigate('Setting')}>
                  <Text style={[styles.buttonText, {margin:10}]}>Settings</Text>
                </TouchableOpacity>),
              headerRight: () => (
                <TouchableOpacity onPress={()=>navigation.navigate('Sign In')}>
                  <Text style={[styles.buttonText, {margin:10}]}>Sign Out</Text>
                </TouchableOpacity>),
              title: route.params.username,
              })
            }
            />
            <Stack.Screen
            name='History'
            component={UserHistory}
            initialParams={{ styles }}
            options={
            {
              headerTintColor: "black",
              headerStyle: { backgroundColor: "white", elevation: 0 },
              headerTitleStyle: { fontSize: 24, fontFamily:"Merriweather_700Bold" }
            }
            }
            />
            <Stack.Screen
            name='Setting'
            component={UserSetting}
            initialParams={{ styles, componentWidth }}
            />
          <Stack.Screen name="Your Store" component={VendorMain} />
          <Stack.Screen name="Confirm Order" component={VendorConfirmOrder} />
          <Stack.Screen
            name="Update Food Quantity"
            component={VendorUpdateFoodQty}
          />
          <Stack.Screen
            name="Add New Food Type"
            component={VendorNewFoodType}
          />
          <Stack.Screen
            name="Kingsbay Hypermarket"
            component={StorePage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const width = Dimensions.get("screen").width;
export const componentWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    alignItems: "center",
    width: componentWidth,
  },
  textInput: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: 10,
    margin: 7,
    width: "100%",
    color: "#000",
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular"
  },
  button: {
    backgroundColor: "#4EB574",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Merriweather_400Regular"
  },
  logo: {
    margin: 20,
    height: width * 0.3,
  },
  header:{
    backgroundColor: '#116530',
    width: width,
    height: 80,
    marginBottom: 90,
    alignItems: 'center'
  },
  profilePicFrame:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      height: 150,
      width: 150,
      marginTop: 10,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 80,
      overflow: 'hidden'
  },
  profilePic: {
      flex: 1,
      resizeMode: 'contain',
      borderRadius: 80
  },
  profileContainer:{
      flex: 1,
      alignItems: 'center'
  },
  nameFont:{
      color: '#116530',
      fontSize: 20,
      fontFamily: "Merriweather_700Bold"
  },
  locationFont:{
      color: '#000',
      fontSize: 18,
      marginBottom: 15,
      fontFamily: "Merriweather_400Regular"
  },
  infoContainer:{
      backgroundColor: '#f6f6f6',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      alignItems: 'flex-start',
      width: componentWidth
  },
  infoRowContainer:{
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'center'
  },
  infoTitleFont:{
      color: '#116530',
      paddingRight: 10,
      fontFamily: "Merriweather_400Regular"
  },
  infoBodyFont:{
      color: 'black',
      flexShrink: 1,
      fontFamily: "MerriweatherSans_300Light_Italic"
  },
  contributionContainer:{
      width: 250,
      marginTop: 20
  },
  contributionTitleContainer:{
      backgroundColor: '#4EB574',
      borderRadius: 5,
      paddingVertical: 7,
      marginBottom: 15
  },
  contributionTitleFont:{
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: "Merriweather_400Regular"
  },
  contributionInfoContainer:{
      backgroundColor: '#f6f6f6',
      borderRadius: 5,
      paddingVertical: 15,
      alignItems: 'center'
  },
  contributionInfoFont: {
      color: '#4EB574',
      fontSize: 20,
      fontFamily: "Merriweather_900Black"
  },
  contributionInfoBodyFont:{
      color: 'black',
      margin: 5,
      fontFamily: "MerriweatherSans_300Light_Italic"
  },
  historyRowContainer:{
      flexDirection: 'row',
      width: width*0.9,
      paddingVertical: 10,
      borderBottomColor: '#bdbdbd',
      borderBottomWidth: 1,
  },
  historyDateContainer:{
      backgroundColor: '#f6f6f6',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50
  },
  historyContainer:{
      width: '65%',
      marginHorizontal: 10
  },
  historyTitleFont:{
      color: 'black',
      fontSize: 18,
      fontFamily: "Merriweather_400Regular"
  },
  historyBodyFont:{
      color: 'black',
      fontSize: 14,
      fontFamily: "MerriweatherSans_300Light_Italic"
  },
  historyPriceFont:{
      color: '#bdbdbd',
      fontSize: 14,
      fontFamily: "Merriweather_400Regular"
  },
  footer:{
      paddingBottom: 10
  },
  insightTimeAndDateContainer:{
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    width: '65%',
    marginVertical: 30
  },
  insightDateContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 70
  },
  insightDateFont:{
    color: '#4EB574',
    fontSize: 25,
    fontFamily: "Merriweather_700Bold"
  },
  insightDayAndTimeContainer:{
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderTopWidth: 5,
    borderTopColor: 'white'
  },
  insightDayContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white'
  },
  insightTimeContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'white'
  },
  insightDayAndTimeFont:{
    color: 'black',
    fontSize: 16,
    fontFamily: "MerriweatherSans_400Regular"
  },
  insightContainer:{
    flex: 2,
    alignItems: 'center',
    width: '95%'
  },
  insightStoreFont:{
    color: 'black',
    fontSize: 20,
    fontFamily: "Merriweather_700Bold",
    marginBottom: 20
  },
  insightRowContainer:{
    flexDirection: 'row',
    marginVertical: 10,
  },
  insightLargeColumnContainer:{
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  insightSmallColumnContainer:{
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  insightTitleFont:{
    color: 'black',
    fontSize: 16,
    fontFamily: "Merriweather_700Bold"
  },
  itemBullet:{
    backgroundColor: '#4EB574',
    height: 15,
    width: 15,
    borderRadius: 8,
    marginRight: 10
  },
  insightFooter:{
    marginVertical: 5,
    borderTopColor: '#bdbdbd',
    borderTopWidth: 2
  },
  settingTextInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 7,
    width: '100%',
    color: '#000',
    fontSize: 16,
    flexShrink: 1
  },
});