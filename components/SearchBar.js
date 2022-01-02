import React, { Component } from 'react'; import { View, Text, StyleSheet}from 'react-native';
import { SearchBar } from 'react-native-elements';


export default class App extends React.Component { 
    state = {search: '',};
    
    updateSearch = search => { 
        this.setState({ search });
    };
    
    render() {
        const { search } = this.state;
        
        return (
            <SearchBar  
                // platform={'false'}
                lightTheme
                // placeholderTextColor='#000000'
                placeholder="search" onChangeText={this.updateSearch} value={search}
                containerStyle={{backgroundColor: 'white'}}
                inputStyle={{backgroundColor: 'white'}}          
            />
            
        );
    }
}