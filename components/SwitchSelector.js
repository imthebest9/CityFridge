
import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

/*
To implement the selector in your screen:
import SwitchSelector from '../components/SwitchSelector';
Inside <View>:
<SwitchSelector
selectionOption={1} //Default the selected option is 1 which is the left one
optionLeft={'Left'}  //Text for the option at the left
optionRight={'Right'} ////Text for the option at the left
onSelectSwitch={option=>{
  alert('option is: '+ option); //What happens when selecting the switch
}}/>*/

const SwitchSelector = ({
  selectionOption,
  optionLeft,
  optionRight,
  onSelectSwitch,
  }) => {
  const [getSelectionOption, setSelectionOption] = useState(selectionOption);

  const updatedSwitchData = val => {
    setSelectionOption(val);
    onSelectSwitch(val);
  };
  const selectionColor='#4EB574';

  return (
    <View>
      <View
        style={styles(selectionColor).container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={styles(selectionColor,getSelectionOption, 1).button}>
          <Text
            style={styles(selectionColor, getSelectionOption, 1).text}>
            {optionLeft}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={styles(selectionColor, getSelectionOption, 2).button}>
          <Text
            style={styles(selectionColor, getSelectionOption, 2).text}>
            {optionRight}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SwitchSelector;

const componentWidth = Dimensions.get('screen').width * 0.8;

export const styles = (selectionColor, getSelectionOption, selectionOption) => StyleSheet.create({
    container: {
        height: 44,
        width: componentWidth,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: selectionColor,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 2
    },
    button: {
        flex: 1,
        backgroundColor: getSelectionOption == selectionOption ? selectionColor : 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: getSelectionOption == selectionOption ? 'white' : selectionColor,
        fontSize: 16
    }
  });