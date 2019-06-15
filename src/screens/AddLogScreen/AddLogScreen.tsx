import {
  Button,
  Container,
  Content,
  DatePicker,
  Form,
  Icon,
  Input,
  Item,
  Text,
  View,
  CheckBox,
  Label
} from "native-base";
import React from "react";
import { Alert, FlatList } from "react-native";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header, SpinnerOverlay } from "../../components";
import config from "../../config";
// import { addMoodEntry } from "../../services/api";
import {
  addLocalMoodEntry,
  fetchAddMoodEntry,
  getStatus,
  MoodEntry
} from "../../store/log";
import { StoreState } from "../../store/store.types";
import { BorderRadius } from "../../styles";
import Smiley from "../../components/Smiley";
import ExperienceItem from "../../components/ExperienceItem";
import { string } from "prop-types";

interface AddLogScreenProps extends RouteComponentProps {
  navigation: any;
  addMoodEntry: (moodEntry: MoodEntry) => Promise<any>;
  loading: boolean;
}

interface AddLogScreenState {
  selectedEnergy: string;
  selectedMood: string;
  selectedDate: Date;
  selectedMoods: string[];
  customMoods: string[];
  inputCustomEmotion: boolean;
  note: string;
  customMood: string;
  processing: boolean;
  selectedSmiley: string;
  selectedExperiences: string[];
  inputCustomExperience: boolean;
  customExperience: any;
  customExperiences: any[];
  sleep: number;
}

const initialState = () => ({
  selectedEnergy: "",
  selectedMood: "",
  selectedDate: new Date(),
  selectedMoods: [],
  note: "",
  processing: false,
  customMoods: [],
  customMood: "",
  inputCustomEmotion: false,
  selectedSmiley: "",
  selectedExperiences: [],
  inputCustomExperience: false,
  customExperience: { value: "", positive: false },
  customExperiences: [],
  sleep: 0
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

  public getRelevantExperiences = () => {
    const { customExperiences } = this.state;
    return [...config.experiences, ...customExperiences];
  };

  public getRelevantEmotions = () => {
    const { selectedEnergy, selectedMood, customMoods } = this.state;

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

    return [...customMoods, ...emotions[emotionType]];
  };

  public setExperience = (experience: string) => {
    const { selectedExperiences } = this.state;
    let newState: string[] = selectedExperiences;

    if (selectedExperiences.includes(experience)) {
      newState = selectedExperiences.filter(
        selectedExperience => experience !== selectedExperience
      );
    } else {
      newState = [...selectedExperiences, experience];
    }

    this.setState({ selectedExperiences: newState });
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
    const {
      selectedMoods,
      selectedDate,
      selectedSmiley,
      note,
      selectedExperiences,
      sleep
    } = this.state;
    const { navigation, addMoodEntry } = this.props;
    if (selectedMoods.length && selectedSmiley.length && sleep > 0) {
      const moodEntry = {
        sleep,
        mood: selectedSmiley,
        thoughts: note,
        date: selectedDate,
        emotions: selectedMoods,
        experiences: selectedExperiences
      } as MoodEntry;
      try {
        const response = await addMoodEntry(moodEntry);
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
    const {
      selectedMood,
      selectedEnergy,
      selectedMoods,
      selectedSmiley,
      sleep
    } = this.state;

    return (
      selectedMood.length > 0 &&
      selectedEnergy.length > 0 &&
      selectedMoods.length > 0 &&
      selectedSmiley.length > 0 &&
      sleep > 0
    );
  };

  public setEmotionParameter = (name: string, state: string) => {
    const stateObject = {} as any;
    stateObject[name] = state;
    stateObject.selectedMoods = [];
    this.setState(stateObject);
  };

  public setSleep = (text: string) => {
    const numreg = /^[0-9]+$/;
    if (numreg.test(text) || text === "") {
      const hours = text === "" ? 0 : parseInt(text);
      if (hours <= 24) {
        this.setState({ sleep: hours });
      } else {
        Alert.alert(
          "Mental Health App",
          "The amount of sleep a day cannot exceed 24 hours."
        );
      }
    }
  };

  public render() {
    const {
      selectedEnergy,
      selectedMood,
      selectedDate,
      selectedMoods,
      note,
      inputCustomEmotion,
      customMoods,
      customMood,
      selectedSmiley,
      inputCustomExperience,
      customExperiences,
      customExperience,
      sleep
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
          <View
            style={{
              marginVertical: 10,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              General
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
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
          </View>
          <View
            style={{
              marginVertical: 10,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10
              }}
            >
              Mood and emotion
            </Text>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Which smiley fits your mood the most?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                textAlign: "center"
              }}
            >
              <Smiley
                onPress={() => this.setState({ selectedSmiley: "veryBad" })}
                selected={selectedSmiley === "veryBad"}
                text="veryBad"
                icon="veryBad"
              />
              <Smiley
                onPress={() => this.setState({ selectedSmiley: "bad" })}
                selected={selectedSmiley === "bad"}
                text="bad"
                icon="bad"
              />
              <Smiley
                onPress={() => this.setState({ selectedSmiley: "moderate" })}
                selected={selectedSmiley === "moderate"}
                text="moderate"
                icon="moderate"
              />
              <Smiley
                onPress={() => this.setState({ selectedSmiley: "good" })}
                selected={selectedSmiley === "good"}
                text="good"
                icon="good"
              />
              <Smiley
                onPress={() => this.setState({ selectedSmiley: "veryGood" })}
                selected={selectedSmiley === "veryGood"}
                text="veryGood"
                icon="veryGood"
              />
            </View>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Describe your current energy levels.
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
                textAlign: "center"
              }}
            >
              <Button
                onPress={() =>
                  this.setEmotionParameter("selectedEnergy", "activated")
                }
                style={[
                  selectedEnergy === "activated"
                    ? { backgroundColor: "#7a7978" }
                    : null
                ]}
                rounded={true}
                light={true}
                iconLeft={true}
              >
                <Icon
                  style={[
                    selectedEnergy === "activated"
                      ? { color: "#f4f4f4" }
                      : null,
                    { fontSize: 16 }
                  ]}
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
                  style={[
                    selectedEnergy === "deactivated"
                      ? { color: "#f4f4f4" }
                      : null,
                    { fontSize: 16 }
                  ]}
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
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Describe your current emotional state.
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 10,
                textAlign: "center"
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
                <Text style={{ marginVertical: 10, textAlign: "center" }}>
                  Select at least one option that fits best:
                </Text>
                <FlatList
                  data={this.getRelevantEmotions()}
                  contentContainerStyle={{
                    flex: 1,
                    flexDirection: "column"
                  }}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Button
                      key={index}
                      onPress={() => this.setMood(item)}
                      rounded={true}
                      bordered={true}
                      info={true}
                      style={[
                        {
                          marginHorizontal: 5,
                          marginVertical: 5
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
                <Button
                  onPress={() => this.setState({ inputCustomEmotion: true })}
                  iconLeft
                  style={{ marginVertical: 5 }}
                  block
                  light
                >
                  <Icon type="MaterialIcons" name="add" />
                  <Text>Add emotion</Text>
                </Button>
              </View>
            )}
          </View>
          <View
            style={{
              marginVertical: 10,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10
              }}
            >
              Experiences
            </Text>
            <View style={{ padding: 10 }}>
              <FlatList
                data={this.getRelevantExperiences()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <ExperienceItem
                    key={index}
                    positive={item.positive}
                    onPress={() => this.setExperience(item)}
                    experience={item.value}
                  />
                )}
              />
              <Button
                onPress={() => this.setState({ inputCustomExperience: true })}
                iconLeft
                style={{ marginVertical: 5 }}
                block
                light
              >
                <Icon type="MaterialIcons" name="add" />
                <Text>Add experience</Text>
              </Button>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10
              }}
            >
              Sleep
            </Text>

            <View style={{ marginBottom: 50 }}>
              <Form>
                <Text style={{ marginVertical: 10, textAlign: "center" }}>
                  Enter your hours of sleep today:
                </Text>
                <Item last={true}>
                  <Input
                    keyboardType="numeric"
                    placeholder="Enter your hours of sleep"
                    maxLength={2}
                    value={sleep === 0 ? "" : sleep.toString()}
                    onChangeText={this.setSleep}
                  />
                </Item>
              </Form>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              textAlign: "center",
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10
              }}
            >
              Thoughts
            </Text>
            <View style={{ marginBottom: 50 }}>
              <Form>
                <Text style={{ marginVertical: 10, textAlign: "center" }}>
                  Note down any specific thoughts you have:
                </Text>
                <Item last={true}>
                  <Input
                    placeholder="Enter your thoughts"
                    value={note}
                    onChangeText={(text: string) =>
                      this.setState({ note: text })
                    }
                  />
                </Item>
              </Form>
            </View>
          </View>
          <Button
            style={{ marginVertical: 10, textAlign: "center" }}
            block={true}
            iconLeft={true}
            disabled={!this.canSaveLog()}
            onPress={this.saveMoodEntry}
          >
            <Icon name="save" type="FontAwesome" />
            <Text>Save Log</Text>
          </Button>
          <SpinnerOverlay isVisible={loading} />
        </Content>
        <Overlay
          isVisible={inputCustomEmotion}
          height="auto"
          onBackdropPress={() => this.setState({ inputCustomEmotion: false })}
        >
          <Form>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Add a custom emotion:
            </Text>
            <Item>
              <Input
                placeholder="Emotion"
                onChangeText={(text: string) => {
                  this.setState({ customMood: text });
                }}
              />
            </Item>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                textAlign: "center"
              }}
            >
              <Button
                light
                onPress={() => this.setState({ inputCustomEmotion: false })}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                light
                onPress={() =>
                  this.setState(
                    { customMoods: [...customMoods, customMood] },
                    () => this.setState({ inputCustomEmotion: false })
                  )
                }
              >
                <Text>Add</Text>
              </Button>
            </View>
          </Form>
        </Overlay>
        <Overlay
          isVisible={inputCustomExperience}
          height="auto"
          onBackdropPress={() =>
            this.setState({ inputCustomExperience: false })
          }
        >
          <Form>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Add a custom experience:
            </Text>
            <Item stackedLabel>
              <Label>Name of experience</Label>
              <Input
                onChangeText={(text: string) => {
                  this.setState({
                    customExperience: { ...customExperience, value: text }
                  });
                }}
              />
            </Item>
            <Item style={{ marginVertical: 10, textAlign: "center" }}>
              <Label>Is the experience positive?</Label>
              <CheckBox
                onPress={() =>
                  this.setState({
                    customExperience: {
                      ...customExperience,
                      positive: !customExperience.positive
                    }
                  })
                }
                checked={customExperience.positive}
              />
            </Item>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                textAlign: "center"
              }}
            >
              <Button
                light
                onPress={() => this.setState({ inputCustomExperience: false })}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                light
                onPress={() =>
                  this.setState(
                    {
                      customExperiences: [
                        ...customExperiences,
                        customExperience
                      ]
                    },
                    () => this.setState({ inputCustomExperience: false })
                  )
                }
              >
                <Text>Add</Text>
              </Button>
            </View>
          </Form>
        </Overlay>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  loading: getStatus(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  addMoodEntry: (moodEntry: MoodEntry) => dispatch(addLocalMoodEntry(moodEntry))
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddLogScreen);
