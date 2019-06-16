import {
  Button,
  Container,
  Content,
  Icon,
  Spinner,
  Text,
  Card,
  CardItem
} from "native-base";
import React, { Fragment } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  View,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header, MoodItem } from "../../components";
import {
  fetchLocalMoodEntries,
  fetchMoodEntries,
  getMoodEntries,
  getStatus,
  MoodEntry
} from "../../store/log";
import { StoreState } from "../../store/store.types";
import SyncManager from "../../services/syncManager";

interface LogScreenProps extends RouteComponentProps {
  navigation: any;
  moodEntries: MoodEntry[];
  loading: boolean;
  fetchAllMoodEntries: () => Dispatch;
}

interface LogScreenState {
  error: any;
}

class LogScreen extends React.PureComponent<LogScreenProps, LogScreenState> {
  constructor(props: LogScreenProps) {
    super(props);
  }

  public async componentDidMount() {
    global.syncManager.start();
    global.syncManager.sync();
    this.loadMoodEntries();
  }

  public loadMoodEntries = async () => {
    const { fetchAllMoodEntries } = this.props;
    await fetchAllMoodEntries();
  };

  public render() {
    const { navigation, moodEntries, loading } = this.props;

    return (
      <Container>
        <Header
          left={
            <Icon
              name="weight"
              type="FontAwesome5"
              onPress={() => navigation.navigate("Weight")}
            />
          }
          right={
            <Icon name="add" onPress={() => navigation.navigate("AddLog")} />
          }
        />
        <Content
          scrollEnabled
          padder={true}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.loadMoodEntries}
            />
          }
        >
          {moodEntries.length > 0 && (
            <View>
              <FlatList
                data={moodEntries.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                })}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: any }) => (
                  <MoodItem
                    onPress={() =>
                      navigation.navigate("MoodDetail", { moodItem: item })
                    }
                    id={item._id}
                    logDate={item.date}
                    thoughts={item.thoughts}
                    emotions={item.emotions}
                    mood={item.mood}
                  />
                )}
              />
            </View>
          )}
          {moodEntries.length === 0 && (
            <Card>
              <CardItem>
                <Text>
                  Press the{" "}
                  <Icon
                    name="add"
                    onPress={() => navigation.navigate("AddLog")}
                  />{" "}
                  button in the top right corner to add a mood entry.
                </Text>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  moodEntries: getMoodEntries(state),
  loading: getStatus(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchAllMoodEntries: () => dispatch(fetchLocalMoodEntries())
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LogScreen);
