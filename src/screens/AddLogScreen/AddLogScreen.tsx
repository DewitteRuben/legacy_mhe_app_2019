import {
  Button,
  Container,
  Content,
  DatePicker,
  Form,
  Icon,
  Input,
  Item,
  Spinner,
  Text,
  View
} from "native-base";
import React from "react";
import { Alert, Dimensions, FlatList, Platform } from "react-native";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header, SpinnerOverlay } from "../../components";
import config from "../../config";
// import { addMoodEntry } from "../../services/api";
import { fetchAddMoodEntry, getStatus } from "../../store/log";
import { StoreState } from "../../store/store.types";

interface AddLogScreenProps extends RouteComponentProps {
  navigation: any;
  addMoodEntry: (
    userId: string,
    mood: string[],
    date: Date,
    note: string
  ) => Promise<any>;

  loading: boolean;
}

interface AddLogScreenState {
  selectedEnergy: string;
  selectedMood: string;
  selectedDate: Date;
  selectedMoods: string[];
  note: string;
  processing: boolean;
}

const initialState = () => ({
  selectedEnergy: "",
  selectedMood: "",
  selectedDate: new Date(),
  selectedMoods: [],
  note: "",
  processing: false
});

class AddLogScreen extends React.PureComponent<
  AddLogScreenProps,
  AddLogScreenState
> {
  public static navigationOptions = {
    header: null
  };
  constructor(props: AddLogScreenProps) {
    super(props);

    this.state = initialState();
  }

  public getRelevantEmotions = () => {
    const { selectedEnergy, selectedMood } = this.state;

    const emotions: { [key: string]: string[] } = config.emotions;
    const keys = Object.keys(emotions);

    const emotionType = keys.reduce((prev, cur) => {
      const splitted = cur.split("_");
      const moodKey = splitted[0];
      const energyKey = splitted[1];

      if (selectedEnergy === energyKey && selectedMood === moodKey) {
        return cur;
      }
      return prev;
    }, "");

    return emotions[emotionType];
  };

  public setMood = (mood: string) => {
    const { selectedMoods } = this.state;
    let newState: string[] = selectedMoods;

    if (selectedMoods.includes(mood)) {
      newState = selectedMoods.filter(selectedMood => mood !== selectedMood);
    } else {
      if (selectedMoods.length === 2) {
        selectedMoods.pop();
      }
      newState = [...selectedMoods, mood];
    }

    this.setState({ selectedMoods: newState });
  };

  public saveMoodEntry = async () => {
    const { selectedMoods, selectedDate, note } = this.state;
    const { navigation, addMoodEntry } = this.props;
    if (selectedMoods.length && note.length) {
      try {
        const response = await addMoodEntry(
          "userid",
          selectedMoods,
          selectedDate,
          note
        );
        this.setState(initialState(), navigation.goBack);
      } catch (error) {}
    } else {
      Alert.alert("Error", "Ensure all obligated fields have been entered.");
    }
  };

  public setDate = (newDate: Date) => {
    this.setState({ selectedDate: newDate });
  };

  public canSaveLog = () => {
    const { selectedMood, selectedEnergy, selectedMoods } = this.state;

    return (
      selectedMood.length > 0 &&
      selectedEnergy.length > 0 &&
      selectedMoods.length > 0
    );
  };

  public setEmotionParameter = (name: string, state: string) => {
    const stateObject = {} as any;
    stateObject[name] = state;
    stateObject.selectedMoods = [];
    this.setState(stateObject);
  };

  public render() {
    const {
      selectedEnergy,
      selectedMood,
      selectedDate,
      selectedMoods,
      note
    } = this.state;

    const { loading } = this.props;

    return (
      <Container>
        <Header
          left={
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <Content padder={true}>
          <Form>
            <Text style={{ marginVertical: 10 }}>
              Date of logging: {selectedDate.toLocaleString()}
            </Text>
            <Button block={true} light={true} iconLeft={true} rounded={true}>
              <Icon name="date-range" type="MaterialIcons" />
              <DatePicker
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Set a different date"
                onDateChange={this.setDate}
                disabled={false}
              />
            </Button>

            <Text style={{ marginVertical: 10 }}>
              How would you describe your energy levels?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10
              }}
            >
              <Button
                onPress={() =>
                  this.setEmotionParameter("selectedEnergy", "activated")
                }
                style={
                  selectedEnergy === "activated"
                    ? { backgroundColor: "#7a7978" }
                    : null
                }
                rounded={true}
                light={true}
                iconLeft={true}
              >
                <Icon
                  style={
                    selectedEnergy === "activated" ? { color: "#f4f4f4" } : null
                  }
                  name="battery-full"
                  type="FontAwesome"
                />
                <Text
                  style={
                    selectedEnergy === "activated" ? { color: "#f4f4f4" } : null
                  }
                >
                  High Energy
                </Text>
              </Button>
              <Button
                onPress={() =>
                  this.setEmotionParameter("selectedEnergy", "deactivated")
                }
                style={
                  selectedEnergy === "deactivated"
                    ? { backgroundColor: "#7a7978" }
                    : null
                }
                rounded={true}
                light={true}
                iconLeft={true}
              >
                <Icon
                  style={
                    selectedEnergy === "deactivated"
                      ? { color: "#f4f4f4" }
                      : null
                  }
                  name="battery-quarter"
                  type="FontAwesome"
                />
                <Text
                  style={
                    selectedEnergy === "deactivated"
                      ? { color: "#f4f4f4" }
                      : null
                  }
                >
                  Low Energy
                </Text>
              </Button>
            </View>
            <Text style={{ marginVertical: 10 }}>
              How would you describe your current mood?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10
              }}
            >
              <Button
                onPress={() =>
                  this.setEmotionParameter("selectedMood", "pleasant")
                }
                rounded={true}
                light={true}
                style={
                  selectedMood === "pleasant"
                    ? { backgroundColor: "#7a7978" }
                    : null
                }
                iconLeft={true}
              >
                <Icon
                  style={
                    selectedMood === "pleasant" ? { color: "#f4f4f4" } : null
                  }
                  name="insert-emoticon"
                  type="MaterialIcons"
                />
                <Text
                  style={
                    selectedMood === "pleasant" ? { color: "#f4f4f4" } : null
                  }
                >
                  Pleasant
                </Text>
              </Button>
              <Button
                onPress={() =>
                  this.setEmotionParameter("selectedMood", "unpleasant")
                }
                rounded={true}
                style={
                  selectedMood === "unpleasant"
                    ? { backgroundColor: "#7a7978" }
                    : null
                }
                light={true}
                iconLeft={true}
              >
                <Icon
                  style={
                    selectedMood === "unpleasant" ? { color: "#f4f4f4" } : null
                  }
                  name="emoji-sad"
                  type="Entypo"
                />
                <Text
                  style={
                    selectedMood === "unpleasant" ? { color: "#f4f4f4" } : null
                  }
                >
                  Unpleasant
                </Text>
              </Button>
            </View>
            {selectedMood.length > 0 && selectedEnergy.length > 0 && (
              <View>
                <Text style={{ marginVertical: 10 }}>
                  Select at least one option that fits best:
                </Text>
                <FlatList
                  data={this.getRelevantEmotions()}
                  contentContainerStyle={{
                    flex: 1,
                    alignSelf: "center",
                    alignItems: "center"
                  }}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Button
                      key={index}
                      onPress={() => this.setMood(item)}
                      bordered={true}
                      info={true}
                      style={[
                        {
                          marginHorizontal: 10,
                          marginVertical: 10
                        },
                        selectedMoods.includes(item)
                          ? {
                              backgroundColor: "#62B1F6"
                            }
                          : null
                      ]}
                    >
                      <Text
                        style={
                          selectedMoods.includes(item)
                            ? {
                                color: "white"
                              }
                            : null
                        }
                      >
                        {item}
                      </Text>
                    </Button>
                  )}
                />
                <Form>
                  <Text style={{ marginVertical: 10 }}>
                    Optionally, add some additional information:
                  </Text>
                  <Item last={true}>
                    <Input
                      placeholder="Extra note"
                      value={note}
                      onChangeText={(text: string) =>
                        this.setState({ note: text })
                      }
                    />
                  </Item>
                </Form>
                <Button
                  style={{ marginVertical: 10 }}
                  block={true}
                  iconLeft={true}
                  disabled={!this.canSaveLog()}
                  onPress={this.saveMoodEntry}
                >
                  <Icon name="save" type="FontAwesome" />
                  <Text>Save Log</Text>
                </Button>
              </View>
            )}
          </Form>
          <SpinnerOverlay isVisible={loading} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  loading: getStatus(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  addMoodEntry: (userId: string, mood: string[], date: Date, note: string) =>
    dispatch(fetchAddMoodEntry(userId, mood, date, note))
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddLogScreen);
