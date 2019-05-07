import { Card, CardItem, Icon, Text, View } from "native-base";
import React from "react";

interface MoodItemProps {
  logDate: Date;
  moods: string[];
  note: string;
  id: string;
}

export default class MoodItem extends React.PureComponent<MoodItemProps> {
  constructor(props: MoodItemProps) {
    super(props);
  }

  public render() {
    const { logDate, moods, note } = this.props;

    return (
      <Card>
        <CardItem>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text note={true}>{logDate.toLocaleString()}</Text>
              <Text>
                {moods
                  .sort()
                  .join(", ")
                  .trim()}
              </Text>
              <Text note={true} style={{ marginVertical: 10 }}>
                {note}
              </Text>
            </View>
            <View>
              <Icon
                style={{ color: "green" }}
                name="insert-emoticon"
                type="MaterialIcons"
              />
              <Icon
                style={{ color: "green" }}
                name="battery-full"
                type="FontAwesome"
              />
            </View>
          </View>
        </CardItem>
      </Card>
    );
  }
}
