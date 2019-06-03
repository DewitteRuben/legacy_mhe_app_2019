import React, { Component } from "react";
import { Button, Text } from "native-base";

interface ExperienceItemState {
  active: boolean;
}

interface ExperienceItemProps {
  positive: boolean;
  experience: string;
  onPress?: () => void;
  style?: any;
  alwaysOn?: boolean;
}

export default class ExperienceItem extends Component<
  ExperienceItemProps,
  ExperienceItemState
> {
  constructor(props: ExperienceItemProps) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggleActive = () => {
    const { onPress, alwaysOn } = this.props;
    const { active } = this.state;
    if (!alwaysOn) {
      this.setState({ active: !active }, onPress ? onPress : () => {});
    }
  };

  render() {
    const { positive, experience, style, alwaysOn } = this.props;
    const { active } = this.state;
    const backgroundColor = positive ? "#88c863" : "#18608C";
    return (
      <Button
        onPress={this.toggleActive}
        block
        danger={!positive}
        success={positive}
        rounded
        bordered
        style={[
          alwaysOn || active ? { backgroundColor } : null,
          { borderColor: backgroundColor },
          style,
          { marginVertical: 5 }
        ]}
      >
        <Text style={{ color: active || alwaysOn ? "#fff" : backgroundColor }}>
          {experience}
        </Text>
      </Button>
    );
  }
}
