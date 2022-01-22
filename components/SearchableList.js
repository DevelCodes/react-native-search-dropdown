import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";
import SearchInput from "./SearchInput";

const { width } = Dimensions.get("window");
const fruitsArray = require("../data/data.json");
export default function SearchableList({
  dataArray,
  placeholder,
  style,
  keyboardType,
  leftImage,
  leftImageStyle,
  rightClosedImage,
  rightOpenedImage,
  dropdownStyle,
  dropdownTextStyle,
  dropdownItemStyle,
  dataKey,
  getSelectedItem,
  freeTyping,
  containerStyle,
  inputStyle,
}) {
  const [data, setData] = useState(fruitsArray);
  const [filteredData, setFilteredData] = useState(fruitsArray);
  const [selectedCity, setSelectedCity] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [freeTypeAllowed, setFreeTypeAllowed] = useState(true);
  const [key, setKey] = useState("name");
  const [rightImage, setRightImage] = useState(
    "https://drive.google.com/uc?export=view&id=1K3Rq0jOZ7huHbOt7FH4G-Vpx7ClI8B7N"
  );
  const [placeholderText, setPlaceholderText] = useState(
    "Enter your search..."
  );
  const searchInputRef = useRef();

  useEffect(() => {
    console.log("SEARCH CITIES", dataArray);

    if (dataArray) {
      setData(dataArray);
      setFilteredData(dataArray);
    }

    if (placeholder) {
      setPlaceholderText(placeholder);
    }

    console.log("Images", rightOpenedImage, rightClosedImage);
  }, [dataArray, placeholder, rightOpenedImage, rightClosedImage]);

  useEffect(() => {
    if (freeTyping === "not-allowed") {
      console.log("FREETYPE");
      setFreeTypeAllowed(false);
    }
  }, [freeTyping]);

  useEffect(() => {
    if (dataKey) {
      setKey(dataKey);
    }
  }, [dataKey]);

  useEffect(() => {
    if (showDropDown) {
      console.log("CloseDrowdown");
      setRightImage(rightOpenedImage);
    } else {
      setRightImage(rightClosedImage);
      console.log("OpenDrowdown");
    }
  }, [showDropDown]);

  return (
    <View
      style={[
        {
          alignItems: "center",
          //   borderColor:invalidInput ? colors.primary : colors.lightGrey,
          //   borderWidth: 1,
          //   borderRadius: 12,
          //   marginBottom: 10,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={{ alignItems: "flex-start", justifyContent: "center" }}
        onPress={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <SearchInput
          onPressFun={() => {
            console.log("Testing");
            setShowDropDown(!showDropDown);
          }}
          ref={searchInputRef}
          value={selectedCity}
          action={(text) => {
            {
              setSelectedCity(text);
              var result = data.filter((data) =>
                data[`${key}`].toLowerCase().startsWith(text.toLowerCase())
              );
              console.log("filtered result", result);
              setFilteredData(result);
              if (!showDropDown && result.length > 0) {
                setShowDropDown(true);
              } else if (result.length == 0) {
                setShowDropDown(false);
                if (!freeTypeAllowed) {
                  console.log("INVALID");
                  setInvalidInput(true);
                }
              }
            }
          }}
          inputStyle={[{ width: "80%" }, inputStyle]}
          placeholder={placeholderText}
          style={style}
          leftImageStyle={leftImageStyle}
          keyboardType={keyboardType}
          leftImage={leftImage}
          rightImage={rightImage}
        />
      </TouchableOpacity>

      {showDropDown && (
        <ScrollView
          contentContainerStyle={[
            {
              width: style
                ? style.width
                  ? style.width - 20
                  : width - 20
                : width - 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              elevation: 10,
            },
            dropdownStyle,
          ]}
        >
          {filteredData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(item[`${key}`]);
                  setSelectedCity(item[`${key}`]);
                  getSelectedItem && getSelectedItem(item[`${key}`]);
                  setShowDropDown(false);
                }}
                style={[
                  {
                    width: "100%",
                    height: 60,
                    paddingLeft: 40,
                    // borderColor: '#ccc',
                    // borderWidth: 2,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  },
                  dropdownItemStyle,
                ]}
              >
                <Text
                  style={[
                    { fontSize: 20, color: colors.darkGrey },
                    dropdownTextStyle,
                  ]}
                >
                  {item[`${key}`]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
