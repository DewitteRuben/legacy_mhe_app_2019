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
import { getTasksByUserId, toggleTask } from "../../services/api";
import { FlatList, RefreshControl } from "react-native";
import moment from "moment";

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

  public loadTasks = async () => {
    this.setState({ loading: true });
    try {
      const tasks = await getTasksByUserId();
      this.setState({ tasks });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  };

  public async componentDidMount() {
    this.loadTasks();
  }

  public getTaskData = () => {
    const { tasks } = this.state;
    let groupedTasks: any = [];
    if (tasks) {
      tasks.sort((a: any, b: any) => {
        const bTime = new Date(b.dateOfAssignement);
        const aTime = new Date(a.dateOfAssignement);
        const day = moment(bTime)
          .calendar()
          .split(" ")[0];
        const today = moment(new Date())
          .calendar()
          .split(" ")[0];
        if (day === today) {
          return 1;
        }
        return bTime.valueOf() - aTime.valueOf();
      });
      tasks.forEach((task: any) => {
        const time = new Date(task.dateOfAssignement);
        const day = moment(time)
          .calendar()
          .split(" ")[0];
        // get existing group
        const existingGroup = groupedTasks.filter(
          (group: any) => group.label === day
        )[0];
        if (existingGroup) {
          existingGroup.tasks.push(task);
        } else {
          const group = { label: day, tasks: [task] };
          groupedTasks.push(group);
        }
      });
    }
    return groupedTasks;
  };

  public render() {
    const { loading } = this.state;
    return (
      <Container>
        <Header />
        <Content
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.loadTasks} />
          }
          padder={true}
        >
          <React.Fragment>
            <FlatList
              data={this.getTaskData()}
              contentContainerStyle={{
                flex: 1,
                flexDirection: "column"
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }: any) => (
                <React.Fragment>
                  <NBText style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.label}
                  </NBText>
                  {item.tasks.map((task: any, index: any) => (
                    <TaskItem
                      key={index}
                      isCompleted={task.isDone}
                      onCheckToggle={(state: boolean) => {
                        toggleTask(task._id, state);
                      }}
                      title={task.title}
                      details={task.description}
                    />
                  ))}
                </React.Fragment>
              )}
            />
          </React.Fragment>
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
