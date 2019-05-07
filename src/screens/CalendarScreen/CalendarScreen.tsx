import { Button, Container, Content, Icon } from "native-base";
import React, { Fragment } from "react";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import { StoreState } from "../../store";

interface CalendarScreenProps extends RouteComponentProps {}

interface CalendarScreenState {}

class CalendarScreen extends React.PureComponent<
  CalendarScreenProps,
  CalendarScreenState
> {
  constructor(props: CalendarScreenProps) {
    super(props);
  }

  public async componentDidMount() {}

  public render() {
    return (
      <Container>
        <Header left={<Icon name="menu" />} right={<Icon name="settings" />} />
        <Content padder={true}>{<Calendar />}</Content>
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
)(CalendarScreen);
