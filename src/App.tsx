import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { renderRoutes, RouteConfig } from "react-router-config";
import { compose, Dispatch } from "redux";
import AppNavigator from "./navigators";
import { StoreState } from "./store/store.types";

interface AppProps extends RouteComponentProps {
  route?: RouteConfig;
}

class App extends React.PureComponent<AppProps> {
  public componentDidUpdate(prevProps: AppProps) {}

  public async componentWillMount() {}

  public componentWillUnmount() {}

  public render() {
    return <AppNavigator />;
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(App);
