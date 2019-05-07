import { Button, Container, Content, Icon, Spinner, Text } from "native-base";
import React, { Fragment } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header, MoodItem } from "../../components";
import {
  fetchMoodEntries,
  getMoodEntries,
  getStatus,
  MoodEntry
} from "../../store/log";
import { StoreState } from "../../store/store.types";

interface LogScreenProps extends RouteComponentProps {
  navigation: any;
  moodEntries: MoodEntry[];
  loading: boolean;
  fetchAllMoodEntries: () => Dispatch;
}

interface LogScreenState {
  finished: boolean;
  loading: boolean;
  error: any;
}

class LogScreen extends React.PureComponent<LogScreenProps, LogScreenState> {
  constructor(props: LogScreenProps) {
    super(props);
  }

  public async componentDidMount() {
    const { fetchAllMoodEntries } = this.props;
    fetchAllMoodEntries();
  }

  public render() {
    const { navigation, moodEntries, loading } = this.props;

    return (
      <Container>
        <Header left={<Icon name="menu" />} right={<Icon name="settings" />} />
        <Content padder={true}>
          {moodEntries.length > 0 && !loading && (
            <View>
              <FlatList
                data={moodEntries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: any }) => (
                  <MoodItem
                    id={item._id}
                    logDate={item.date}
                    note={item.note}
                    moods={item.mood}
                  />
                )}
              />
            </View>
          )}
          {loading && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <Spinner color="blue" />
            </View>
          )}
          <Button onPress={() => navigation.navigate("AddLog")}>
            <Text>Add Log</Text>
          </Button>
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
  fetchAllMoodEntries: () => dispatch(fetchMoodEntries())
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LogScreen);
