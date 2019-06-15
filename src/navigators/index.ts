import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { AddLogScreen } from "../screens/AddLogScreen";
import { EntryScreen } from "../screens/EntryScreen";
import { MainScreen } from "../screens/MainScreen";
import { ScanQRScreen } from "../screens/ScanQRScreen";
import { MoodDetailScreen } from "../screens/MoodDetailScreen";
import { WeightScreen } from "../screens/WeightScreen";

const AuthStack = createStackNavigator({
  Entry: { screen: EntryScreen },
  ScanQR: { screen: ScanQRScreen }
});

const AppStack = createStackNavigator({
  Main: { screen: MainScreen },
  AddLog: { screen: AddLogScreen },
  MoodDetail: { screen: MoodDetailScreen },
  Weight: { screen: WeightScreen }
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
