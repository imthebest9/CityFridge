import React from 'react'
import { View, Text } from 'react-native'

export default function GenerateTac() {
    return (
        <View>
            <Text></Text>
        </View>
    )
}





// import React, { useState } from "react";
// import { View, Text, Platform, Button } from 'react-native'
// import DateTimePicker from "@react-native-community/datetimepicker";

// export default function VpickupTime() {
//     const [date, setDate] = useState(new Date(1598051730000));
//     const [mode, setMode] = useState("date");
//     const [show, setShow] = useState(false);
  
//     const onChange = (event, selectedDate) => {
//       const currentDate = selectedDate || date;
//       setShow(Platform.OS === "ios");
//       setDate(currentDate);
//     };
  
//     const showMode = (currentMode) => {
//       setShow(true);
//       setMode(currentMode);
//     };
  
//     const showDatepicker = () => {
//       showMode("date");
//     };
  
//     const showTimepicker = () => {
//       showMode("time");
//     };

//     return (
//         <View>
//         <View style={{ marginTop: 10, marginLeft: 25, marginRight: 140 }}>
//           <Button
//             onPress={showDatepicker}
//             title="Pick expiry date"
//             color="#4EB574"
//           />
//         </View>
//         {show && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode={mode}
//             is24Hour={true}
//             display="default"
//             onChange={onChange}
//           />
//         )}
//       </View>
//     )
// }
