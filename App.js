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
import Tshowtac from "./pages/Tshowtac";
import VendorConfirmOrder from "./pages/VendorConfirmOrder";

export default function App() {
    // return <Navigation />
      //  return <Taddcart />;
      //  return <Tviewcart/>;
      return<Tshowtac/>;
    // return<VendorConfirmOrder/>;
  // return < VendorMain/>;
  //return <VendorNewFoodType/>;
  //  return <VendorUpdateFoodQty/>;
}
