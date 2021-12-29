import * as React from "react";
import { View, Text } from "react-native";
import Taddcart from "./pages/Taddcart";
import Navigation from "./Navigation";
import VendorMain from "./pages/VendorMain";
import VendorNewFoodType from "./pages/VendorNewFoodType";
import VendorUpdateFoodQty from "./pages/VendorUpdateFoodQty";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import Tviewcart from "./pages/Tviewcart";

export default function App() {
  //  return <Navigation />
  //  return <Taddcart />;
    return <Tviewcart/>;
  // return < VendorMain/>;
  //return <VendorNewFoodType/>;
  //  return <VendorUpdateFoodQty/>;
}
