import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

const {width, height} = Dimensions.get('screen');
const SearchInput = ({
  inputStyle,
  style,
  leftImage,
  leftImageStyle,
  rightImage,
  placeholder,
  keyboardType,
  action,
  value,
  setCheckLoading,
  inputRef,
  onPressFun,
}) => {
  const [rightImageState, setRightImageState] = useState('');
  const [leftImageState, setLeftImageState] = useState(
    'https://drive.google.com/uc?export=view&id=196lHPEhd3oOIduaGPpWDX3vPcxw2xP2M',
  );

  // inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    console.log('RightImage', rightImage);
    setRightImageState(rightImage);
  }, [rightImage]);

  useEffect(() => {
    if (leftImage) {
      console.log('LeftImage', leftImage);
      setLeftImageState(leftImage);
    }
  }, [leftImage]);

  const styles = {
    containerStyle: {
      display: 'flex',
    },
    horizontalStyle: {
      flexDirection: 'row',
      width: width - 40,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingLeft: 10,
      height: 56,
      //   marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderWidth: 1,
      borderColor: '#c7c7c7',
      overflow: 'hidden',
    },
    textInputStyle: {
      // fontFamily: 'AvenirLTStdRoman',
      fontWeight: '300',
      fontSize: 17,
      paddingLeft: 20,
      lineHeight: 30,
      display: 'flex',
      color: colors.darkTextColor,
      borderWidth: 0,
    },
  };

  return (
    <View style={[styles.containerStyle]}>
      <TouchableOpacity
        onPress={onPressFun}
        style={[
          styles.horizontalStyle,
          {
            borderColor: isFocused ? colors.primary : colors.unselected,
          },
          style ? (style.width ? style.width : {}) : {},
        ]}>
        <Image
          style={[{width: 25, height: 25}, leftImageStyle]}
          source={{uri: leftImageState}}
        />
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
          ]}
          theme={{colors: {primary: colors.primary}}}
          onChangeText={action}
          onChange={e =>
            setCheckLoading != undefined ? setCheckLoading(true) : null
          }
          placeholder={placeholder}
          placeholderTextColor={colors.darkGrey}
          keyboardType={keyboardType ? keyboardType : 'email-address'}
          autoCapitalize="none"
        />
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={{uri: rightImageState}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
