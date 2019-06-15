import NetInfo, { NetInfoData } from "@react-native-community/netinfo";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { RouteConfig } from "react-router-config";
import { compose, Dispatch } from "redux";
import AppNavigator from "./navigators";
import { clearLocalMoodEntries } from "./services/localStorage";
import SyncManager from "./services/syncManager";
import { StoreState } from "./store/store.types";
import PushService from './services/pushService';

interface AppProps extends RouteComponentProps {
  route?: RouteConfig;
}

const isConnectedToInternet = (data: NetInfoData) => {
  return (
    data.type !== "none" && data.type !== "unknown" && data.type !== "bluetooth"
  );
};

const listener = (data: NetInfoData) => {
  global.isConnected = isConnectedToInternet(data);
};

NetInfo.getConnectionInfo().then(listener);

const pushService = new PushService();
const syncManager = new SyncManager();
global.syncManager = syncManager;
global.pushService = pushService;
syncManager.start();
syncManager.sync();
pushService.init();

const subscription = NetInfo.addEventListener("connectionChange", listener);

class App extends React.PureComponent<AppProps> {
  public componentDidUpdate(prevProps: AppProps) {}

  public async componentWillMount() {}

  public componentWillUnmount() {
    subscription.remove();
  }

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
