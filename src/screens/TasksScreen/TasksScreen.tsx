import { Button, Container, Content, Icon } from "native-base";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
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
        <Content padder={true} />
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
