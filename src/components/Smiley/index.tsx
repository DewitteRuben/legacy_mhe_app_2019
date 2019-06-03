import React, { Component } from "react";
import { View } from "native-base";
import { Dimensions, TouchableOpacity, Image, Text } from "react-native";
import {
  SmileyVeryBad,
  SmileyBad,
  SmileyModerate,
  SmileyGood,
  SmileyVeryGood
} from "../icons";

interface SmileyProps {
  text: string;
  icon: string;
  selected?: boolean;
  onPress?: () => void;
}

const imageMap: { [key: string]: any } = {
  veryBad: SmileyVeryBad,
  bad: SmileyBad,
  moderate: SmileyModerate,
  good: SmileyGood,
  veryGood: SmileyVeryGood
};

const moodTextMap: { [key: string]: any } = {
  veryBad: "Very Bad",
  bad: "Bad",
  moderate: "Moderate",
  good: "Good",
  veryGood: "Very Good"
};

export default class Smiley extends Component<SmileyProps> {
  render() {
    const { icon, text, selected, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          display: "flex",
          justifyCenter: "center",
          alignItems: "center"
        }}
      >
        <View
          style={[
            { padding: 6 },
            selected
              ? {
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: Dimensions.get("window").width / 2
                }
              : null
          ]}
        >
          <Image
            style={{
              width: 50,
              height: 50
            }}
            source={imageMap[icon]}
          />
        </View>
        <Text style={{ color: "gray", fontSize: 11 }}>{moodTextMap[text]}</Text>
      </TouchableOpacity>
    );
  }
}
