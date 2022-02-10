import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, useState } from 'react-native';
import VreserveButton from './VreserveButton';

// const get6digit =() =>{
//     var code = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
//     return code 
// }

export default function GenerateTac() {
    var code = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1); 
  return (
    code
  )
}
