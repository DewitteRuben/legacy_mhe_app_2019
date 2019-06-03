import {
  Body,
  Button,
  Card,
  CardItem,
  CheckBox,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Text as NBText,
  Thumbnail,
  Spinner,
  View
} from "native-base";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import TaskItem from "../../components/TaskItem";
import { StoreState } from "../../store";
import { getJWTToken, getUserId } from "../../services/localStorage";
import { getTasksByUserId, toggleTask } from "../../services/api";
import { FlatList } from "react-native";

interface TasksScreenProps extends RouteComponentProps {}

interface TasksScreenState {
  tasks: any;
  loading: boolean;
}

class TasksScreen extends React.PureComponent<
  TasksScreenProps,
  TasksScreenState
> {
  constructor(props: TasksScreenProps) {
    super(props);
    this.state = {
      tasks: null,
      loading: false
    };
  }

  public async componentDidMount() {
    this.setState({ loading: true });
    try {
      const tasks = await getTasksByUserId();
      this.setState({ tasks });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  }

  public render() {
    const { tasks, loading } = this.state;
    return (
      <Container>
        <Header left={<Icon name="menu" />} right={<Icon name="settings" />} />
        <Content padder={true}>
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Spinner color="blue" />
            </View>
          )}
          {!loading && (
            <React.Fragment>
              <NBText style={{ fontSize: 18, fontWeight: "bold" }}>
                Today
              </NBText>
              <FlatList
                data={tasks}
                contentContainerStyle={{
                  flex: 1,
                  flexDirection: "column"
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }: any) => (
                  <TaskItem
                    isCompleted={item.isDone}
                    onCheckToggle={(state: boolean) => {
                      toggleTask(item._id, !state);
                      this.setState({
                        tasks: tasks.map((task: any) => {
                          if (task._id === item._id) {
                            item.isDone = !state;
                          }
                          return task;
                        })
                      });
                    }}
                    title={item.title}
                    details={item.description}
                  />
                )}
              />
            </React.Fragment>
          )}
        </Content>
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
)(TasksScreen);
