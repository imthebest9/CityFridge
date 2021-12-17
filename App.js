
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign:'center',
              headerStyle: {backgroundColor: '#116530', elevation: 0},
              headerTintColor: '#fff',
              headerTitleStyle: {fontWeight: 'bold', fontSize: 24}
            }}
          >
            <Stack.Screen
              name='Sign In'
              component={SignIn}
              initialParams={{styles}}
              options={({navigation}) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={()=>navigation.navigate('Sign Up')}>
                    <Text style={[styles.buttonText, {margin:10}]}>Sign Up</Text>
                  </TouchableOpacity>)
              })}
            />
            <Stack.Screen
            name='Sign Up'
            component={SignUp}
            initialParams={{styles, componentWidth}}
            />
            <Stack.Screen
            name='Profile'
            component={UserProfile}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={()=>navigation.navigate('Sign In')}>
                  <Text style={[styles.buttonText, {margin:10}]}>Sign Out</Text>
                </TouchableOpacity>)
            })}
            />
            </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;

const width = Dimensions.get('screen').width;
export const componentWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex:1,
    alignItems: 'center',
    width: componentWidth
  },
  textInput: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    padding: 10,
    margin: 7,
    width: '100%',
    color: '#000',
    fontSize: 16,
  },
  button:{
    backgroundColor: '#4EB574',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  logo: {
    margin: 20,
    height: width*0.3
  }
});
