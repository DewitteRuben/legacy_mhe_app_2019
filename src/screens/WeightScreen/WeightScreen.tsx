import moment from "moment";
import {
  Button,
  CardItem,
  Container,
  Content,
  Icon,
  Text,
  List,
  ListItem,
  Form,
  Item,
  Input,
  Picker
} from "native-base";
import React, { Fragment } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, Overlay } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import { StoreState } from "../../store";
import uuid4 from "uuid/v4";
import { addWeightEntry, getWeightEntriesByUserId } from "../../services/api";

interface WeightScreenProps extends RouteComponentProps {
  navigation: any;
}

interface WeightScreenState {
  isVisible: boolean;
  amount: number;
  unit: string;
  weightEntries: any;
  loading: boolean;
}

class WeightScreen extends React.PureComponent<
  WeightScreenProps,
  WeightScreenState
> {
  public static navigationOptions = {
    header: null
  };

  constructor(props: WeightScreenProps) {
    super(props);
    this.state = {
      isVisible: false,
      unit: "kg",
      amount: 0,
      weightEntries: [],
      loading: false
    };
  }

  public async componentDidMount() {
    this.refreshWeightEntries();
  }

  public refreshWeightEntries = async () => {
    try {
      this.setState({ loading: true });
      const entries = await getWeightEntriesByUserId();
      this.setState({ weightEntries: entries, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  public setWeight = (text: string) => {
    const numreg = /^[0-9]+$/;
    if (numreg.test(text) || text === "") {
      const amount = text === "" ? 0 : parseInt(text);
      this.setState({ amount });
    }
  };

  public saveWeightEntry = async () => {
    const { unit, amount } = this.state;
    try {
      const entryId = uuid4();
      const weightEntry = {
        entryId,
        unit,
        amount
      };
      const response = await addWeightEntry(weightEntry);
      this.setState({ isVisible: false }, this.refreshWeightEntries);
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    const { amount, unit, weightEntries, loading } = this.state;

    return (
      <Container>
        <Header
          center={
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Weekly Weight Entries
            </Text>
          }
          left={
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          right={
            <Icon
              name="add"
              onPress={() => this.setState({ isVisible: true })}
            />
          }
        />
        <View
          style={{
            flex: 0,
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 15
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Date</Text>
          <Text style={{ fontWeight: "bold" }}>Amount</Text>
          <Text style={{ fontWeight: "bold" }}>Unit</Text>
        </View>
        <Content
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshWeightEntries}
            />
          }
        >
          <List>
            <ListItem>
              {weightEntries.length === 0 && (
                <Text>
                  Press the{" "}
                  <Icon
                    name="add"
                    onPress={() => this.setState({ isVisible: true })}
                  />{" "}
                  button in the top right corner to add a mood entry.
                </Text>
              )}
            </ListItem>
            {weightEntries.length > 0 && (
              <React.Fragment>
                <FlatList
                  data={weightEntries.sort(
                    (a: any, b: any) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )}
                  contentContainerStyle={{
                    flex: 1,
                    flexDirection: "column"
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }: any) => (
                    <ListItem key={index.toString()}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <Text>{new Date(item.date).toLocaleDateString()}</Text>
                        <Text>{item.amount}</Text>
                        <Text>{item.unit}</Text>
                      </View>
                    </ListItem>
                  )}
                />
              </React.Fragment>
            )}
          </List>
        </Content>
        <Overlay
          isVisible={this.state.isVisible}
          height="auto"
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <Form>
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Enter your current weight:
            </Text>
            <Item last={true}>
              <Input
                keyboardType="numeric"
                placeholder="Enter your weight"
                maxLength={3}
                value={amount === 0 ? "" : amount.toString()}
                onChangeText={this.setWeight}
              />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={unit}
                onValueChange={value => this.setState({ unit: value })}
              >
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="lb" value="lb" />
              </Picker>
            </Item>
            <View
              style={{
                flex: 0,
                justifyContent: "space-between",
                marginVertical: 20,
                flexDirection: "row"
              }}
            >
              <Button light onPress={() => this.setState({ isVisible: false })}>
                <Text>Cancel</Text>
              </Button>
              <Button light onPress={this.saveWeightEntry}>
                <Text>Add</Text>
              </Button>
            </View>
          </Form>
        </Overlay>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WeightScreen);
