import React from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { renderRoutes, RouteConfig } from "react-router-config";
import { NativeRouter } from "react-router-native";
import ROUTES from "./routes";
import { BackgroundColors } from "./styles";

import store from "./store";

export default class App extends React.PureComponent {
  public render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={(BackgroundColors.primary as unknown) as string}
            barStyle="light-content"
          />
          <NativeRouter>
            {renderRoutes((ROUTES as unknown) as RouteConfig[])}
          </NativeRouter>
        </View>
      </Provider>
    );
  }
}
