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
  Thumbnail
} from "native-base";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import TaskItem from "../../components/TaskItem";
import { StoreState } from "../../store";

interface TasksScreenProps extends RouteComponentProps {}

interface TasksScreenState {}

class TasksScreen extends React.PureComponent<
  TasksScreenProps,
  TasksScreenState
> {
  constructor(props: TasksScreenProps) {
    super(props);
  }

  public async componentDidMount() {}

  public render() {
    return (
      <Container>
        <Header left={<Icon name="menu" />} right={<Icon name="settings" />} />
        <Content padder={true}>
          <NBText style={{ fontSize: 18, fontWeight: "bold" }}>Today</NBText>
          <TaskItem
            isCompleted={true}
            onCheckToggle={(state: boolean) => {
              console.log(state);
            }}
            title="Write down 3 positive words"
            details="Writing down 3 positive words about yourself,
            is a good way to slowly increase your own self confidence"
          />
          <TaskItem
            onCheckToggle={(state: boolean) => {
              console.log(state);
            }}
            title="Clean up your room"
            details="Doing basic daily tasks can help you improve your general energy levels."
          />
          <TaskItem
            onCheckToggle={(state: boolean) => {
              console.log(state);
            }}
            title="Remove all chips bags from bed"
            details="love u xo"
          />
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
