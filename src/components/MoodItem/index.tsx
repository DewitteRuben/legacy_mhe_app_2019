import { Card, CardItem, Text, View, Icon as NbIcon } from "native-base";
import { Image } from "react-native";
import React from "react";
import {
  SmileyBad,
  SmileyModerate,
  SmileyVeryBad,
  SmileyGood,
  SmileyVeryGood
} from "../icons";
import config from "../../config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Smiley from "../Smiley";

interface MoodItemProps {
  logDate: string;
  mood: string;
  emotions: string[];
  thoughts: string;
  id: string;
  onPress?: () => void;
}



export default class MoodItem extends React.PureComponent<MoodItemProps> {
  constructor(props: MoodItemProps) {
    super(props);
  }

  public getMoodLevel() {
    const levels = this.getLevels().split("_");
    if (levels.length === 2) {
      return levels[0];
    }
    return "pleasant";
  }

  public getEnergyLevel() {
    const levels = this.getLevels().split("_");
    if (levels.length === 2) {
      return levels[1];
    }
    return "activated";
  }

  public getLevels() {
    const allEmotions = config.emotions as any;
    const { emotions } = this.props;
    const keyOfEmotion = Object.keys(allEmotions).reduce(
      (prev: string, curVal: string): any => {
        const key = curVal;
        const emotionsArray = allEmotions[key];
        const isInCurrentArray = emotionsArray.reduce(
          (prev: any, curVal: any): any => {
            if (emotions.includes(curVal)) {
              return true;
            }
            return prev;
          },
          false
        );
        if (isInCurrentArray) {
          return key;
        }
        return prev;
      },
      ""
    );
    return keyOfEmotion;
  }

  public render() {
    const { logDate, mood, thoughts, emotions, onPress } = this.props;

    return (
      <Card>
        <CardItem button={true} onPress={onPress}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flex: 0,
                flexDirection: "row"
              }}
            >
              <View>
                <Smiley text={mood} icon={mood} />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text note={true}>
                  {moment(new Date(logDate)).format("MMM Do YYYY, HH:mm")}
                </Text>
                <Text>{emotions.sort().join(", ")}</Text>
                <Text note={true} style={{ marginVertical: 10 }}>
                  {thoughts}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Icon
                style={{ color: "grey", fontSize: 23 }}
                name={
                  this.getMoodLevel() === "pleasant"
                    ? "emoticon-outline"
                    : "emoticon-sad-outline"
                }
              />
              <NbIcon
                style={{ color: "grey", fontSize: 23 }}
                name={
                  this.getEnergyLevel() === "activated"
                    ? "battery-full"
                    : "battery-quarter"
                }
                type="FontAwesome"
              />
            </View>
          </View>
        </CardItem>
      </Card>
    );
  }
}
