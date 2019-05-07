import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { AddLogScreen } from "../screens/AddLogScreen";
import { EntryScreen } from "../screens/EntryScreen";
import { MainScreen } from "../screens/MainScreen";

const AuthStack = createStackNavigator({
  Entry: { screen: EntryScreen }
});

const AppStack = createStackNavigator({
  Main: { screen: MainScreen },
  AddLog: { screen: AddLogScreen }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

// export default createAppContainer(AppNavigator);
