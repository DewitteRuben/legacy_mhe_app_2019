import {
  Button,
  Card,
  CardItem,
  CheckBox,
  Icon,
  Text,
  View
} from "native-base";
import React, { Fragment } from "react";

interface TaskItemProps {
  onCheckToggle?: (state: boolean) => void;
  details: string;
  title: string;
  isCompleted?: boolean;
}

interface TaskItemState {
  isDetailVisible: boolean;
  isTaskDone: boolean;
}

export default class TaskItem extends React.PureComponent<
  TaskItemProps,
  TaskItemState
> {
  constructor(props: TaskItemProps) {
    super(props);

    this.state = {
      isDetailVisible: false,
      isTaskDone: props.isCompleted || false
    };
  }

  public render() {
    const { onCheckToggle, title, details } = this.props;
    const { isDetailVisible, isTaskDone } = this.state;
    return (
      <Fragment>
        <Card>
          <CardItem
            bordered={true}
            button={true}
            onPress={() => this.setState({ isDetailVisible: !isDetailVisible })}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: 25 }}>
                <CheckBox
                  color="green"
                  checked={isTaskDone}
                  onPress={() => {
                    this.setState({ isTaskDone: !isTaskDone }, () => {
                      if (onCheckToggle) {
                        onCheckToggle(this.state.isTaskDone);
                      }
                    });
                  }}
                />
              </View>
              <View>
                <Text
                  style={[
                    isTaskDone && {
                      textDecorationLine: "line-through",
                      color: "grey"
                    }
                  ]}
                >
                  {title}
                </Text>
              </View>
            </View>
            <View>
              <Button
                onPress={() => {
                  this.setState({ isDetailVisible: !isDetailVisible });
                }}
                transparent={true}
                icon={true}
              >
                <Icon
                  style={{ color: "grey" }}
                  name={isDetailVisible ? "caret-up" : "caret-down"}
                  type="FontAwesome"
                />
              </Button>
            </View>
          </CardItem>
          {isDetailVisible && (
            <CardItem bordered={true} style={{ backgroundColor: "#f5f4f5" }}>
              <Text>{details}</Text>
            </CardItem>
          )}
        </Card>
      </Fragment>
    );
  }
}
