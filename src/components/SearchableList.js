import React, {useState, useRef} from 'react';
import {View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import SearchInput from './SearchInput';
const {width} = Dimensions.get('window');

const citesArray = require('../data/cities.json');

export default function SearchableList({onChangeText}) {
  const [cities, setCities] = useState(citesArray);
  const [filteredCities, setFilteredCities] = useState(citesArray);
  const [selectedCity, setSelectedCity] = useState('');
  const [showDropDown, setShowDropDown] = useState(false)
  const [dropArrowIcon, setDropArrowIcon] = useState('chevron-down')
  const searchInputRef = useRef();

  return (
    <View style={{alignItems:'center'}}>
      <TouchableOpacity
      style={{alignItems:'flex-start', justifyContent:'center'}}
      onPress={() => {
        if(showDropDown){
          setDropArrowIcon('chevron-down')
        } else {
          setDropArrowIcon('chevron-up')
        }
        setShowDropDown(!showDropDown);}}
      >
      <SearchInput
          onPressFun={() =>{console.log("Testing");setShowDropDown(!showDropDown)}}
           ref={searchInputRef}
           value={selectedCity}
            action={
                onChangeText,
                (text) => {
              {
                setSelectedCity(text);
                if(!showDropDown) {
                  setShowDropDown(true)
                }
              var result  = cities.filter(city => 
               city.name.toLowerCase().startsWith(text.toLowerCase())
                // city.name.toLowerCase().includes(text.toLowerCase)
                )
                console.log(result)
                setFilteredCities(result);
              }
            }}
            arrowIcon={dropArrowIcon}
            inputStyle={{width: width - 180}}
            iconName="city-variant-outline"
            placeholder="Search your city..."
          />
      </TouchableOpacity>

        {showDropDown &&
                  <ScrollView contentContainerStyle={{width: width - 60, alignItems: 'center', justifyContent: 'center',
                  backgroundColor:'#fff', elevation: 10,
                  }}>
                  {filteredCities.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {console.log(item.name); setSelectedCity(item.name); setShowDropDown(false)}}
            
                        style={{
                          width: width - 40,
                          height: 60,
                          paddingLeft: 70,
                          // borderColor: '#ccc',
                          // borderWidth: 2,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 20, color: colors.darkGrey}}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                  
                  }
                </ScrollView>
        }
    </View>
  );
}
