import React, {useState, useEffect, useRef} from 'react';
import {Text, View, 
  TextInput, 
  Image,
Dimensions,
TouchableOpacity,
useWindowDimensions, Platform, Appearance
} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import colors from '../constants/colors';

const {width, height} = Dimensions.get('screen')
const SearchInput = ({
  props,
  inputStyle,
  customStyle,
  customIconStyle,
  titleStyle,
  iconName,
  placeholder,
  keyboardType,
  onChangeFun,
  action,
  value,
  setCheckLoading,
  inputRef,
  arrowIcon,
  onPressFun
}) => { 
  
  const {height, width} = useWindowDimensions();
  const [currentWidth, setCurrentWidth] = useState(width);

  useEffect(() => {
     
    setCurrentWidth(width);
  }, [width]);

  const [currentTheme, setCurrentTheme] = useState('');
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    // Use dark color scheme
  }
  useEffect(() => {
    setCurrentTheme(colorScheme);
  }, [colorScheme]);
    // inputRef = useRef();


  const [text, setText] = useState('Hi');
  // const {containerStyle, textStyle, textInputStyle,horizontalStyle} = styles;
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    containerStyle: {
      display: 'flex',
      width:width-40,
    },
    horizontalStyle:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      paddingLeft: 10,
      height: 56,
    //   marginTop: 10,
      backgroundColor: Platform.OS !== "web" ? currentTheme === 'dark' ? colors.dark_bg : '#fff' : '#fff',
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderWidth: 1,
      borderColor: '#c7c7c7',
      overflow: 'hidden'
    },
    iconStyle:{
      marginRight:5, 
      marginLeft: Platform.OS == "web" ?  10 : 25
    },
    textStyle: {
      marginTop: 20,
      fontWeight: '300',
      fontSize: 22,
      lineHeight: 30,
      display: 'flex',
      color: '#000000',
    },
    textInputStyle: {
    //   fontFamily: 'AvenirLTStdRoman',
      fontWeight: '300',
      fontSize: 17,
      paddingLeft: 20,
      lineHeight: 30,
      display: 'flex',
    //   backgroundColor:'yellow',
      color: Platform.OS !== "web" ? currentTheme === 'dark' ?'white' :colors.darkTextColor : colors.darkTextColor ,
      borderWidth:0,
      outlineColor: "#fff" 
    },
  };

  return (
    <View style={[styles.containerStyle, customStyle]}>
        <TouchableOpacity 
            // onPress={onPressFun}
            style={[
            styles.horizontalStyle, 
          {borderColor : isFocused ? colors.primary : colors.unselected , 
          paddingLeft: (currentWidth < 600) ? (Platform.OS ==='web') ? 0 : 0 : 10}]}>
            {/* <Icon 
            size={28} 
            color="#938687" 
            name={iconName ? iconName : "account-outline"} 
            style={[styles.iconStyle, customIconStyle]}
            /> */}
            <TextInput
             pointerEvents="none"
              ref={inputRef}
              value={value}
              label={placeholder}
              onTouchStart={onPressFun}
              onFoucs={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={[
                styles.textInputStyle,
                inputStyle,
                // {
                //   borderColor: isFocused ? colors.primary : colors.unselected,
                // },
                
                  // Platform.OS === "web" && {outlineColor: "#fff" }
                  Platform.select({
                    web: {
                      outlineStyle: 'none',
                      border:'none',
                    },
                  })
                
              ]}
              theme={{colors: {primary: colors.primary}}}
              onChangeText={action}
              onChange={(e) => setCheckLoading != undefined ? setCheckLoading(true) : null}
              placeholder={placeholder}
              placeholderTextColor={ Platform.OS !== "web" ? currentTheme === "dark" ? "#fff" : colors.darkGrey : colors.darkGrey} 
              keyboardType={keyboardType ? keyboardType : 'email-address'}
              autoCapitalize="none"/>
              {/* <Icon 
            size={28} 
            color="#938687" 
            name={arrowIcon} 
            style={[styles.iconStyle, customIconStyle]}
            /> */}
        </TouchableOpacity>
    </View>
  );
};




export default SearchInput;
