import {
  Button,
  Container,
  Icon,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  View
} from "native-base";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { StoreState } from "../../store/store.types";
import { Header } from "../../components";
import Smiley from "../../components/Smiley";
import { FlatList } from "react-native-gesture-handler";
import ExperienceItem from "../../components/ExperienceItem";

interface MoodDetailScreenProps extends RouteComponentProps {
  navigation: any;
}

interface MoodDetailScreenState {}

class MoodDetailScreen extends React.PureComponent<
  MoodDetailScreenProps,
  MoodDetailScreenState
> {
  public static navigationOptions = {
    header: null
  };
  constructor(props: MoodDetailScreenProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { moodItem } = this.props.navigation.state.params;
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
        <Content padder>
          <Card>
            <CardItem header bordered>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <Icon type="FontAwesome" name="pencil" />
                <Icon type="FontAwesome" name="trash-o" />
              </View>
            </CardItem>
            <CardItem bordered>
              <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 10 }}>
                  <Text>
                    Date of logging: {new Date(moodItem.date).toLocaleString()}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  <Text style={{ marginBottom: 10, textAlign: "center" }}>
                    Mood:
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Smiley icon={moodItem.mood} text={moodItem.mood} />
                  </View>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  <Text style={{ marginBottom: 10, textAlign: "center" }}>
                    Registered emotions:
                  </Text>
                  <FlatList
                    data={moodItem.emotions}
                    contentContainerStyle={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Button
                        key={index}
                        rounded={true}
                        bordered={true}
                        info={true}
                        style={[
                          {
                            marginHorizontal: 5,
                            marginVertical: 5,
                            backgroundColor: "#62B1F6"
                          }
                        ]}
                      >
                        <Text style={{ color: "white" }}>{item}</Text>
                      </Button>
                    )}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  <Text style={{ marginBottom: 10, textAlign: "center" }}>
                    Experiences:
                  </Text>
                  <FlatList
                    data={moodItem.experiences.sort(
                      (a: any, b: any) => b.positive === true
                    )}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item, index }) => (
                      <ExperienceItem
                        alwaysOn={true}
                        positive={item.positive}
                        experience={item.value}
                      />
                    )}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 10,
                    borderRadius: 10
                  }}
                >
                  <Text style={{ marginBottom: 10, textAlign: "center" }}>
                    Sleep:
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    {moodItem.sleep} hour{moodItem.sleep !== 1 && "s"}
                  </Text>
                </View>
                {moodItem.thoughts.length > 0 && (
                  <View
                    style={{
                      marginVertical: 10,
                      borderWidth: 1,
                      borderColor: "grey",
                      padding: 10,
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ marginBottom: 10, textAlign: "center" }}>
                      Thoughts:
                    </Text>
                    <Text style={{ textAlign: "center" }}>
                      {moodItem.thoughts}
                    </Text>
                  </View>
                )}
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MoodDetailScreen);
