import { Button, Footer, FooterTab, Icon, Text } from "native-base";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { LogScreen, TasksScreen } from "../../screens";

const tabNavigator = createBottomTabNavigator(
  {
    Log: {
      screen: LogScreen
    },
    Tasks: {
      screen: TasksScreen
    }
  },
  {
    tabBarComponent: (props: {
      navigation: {
        state: { index: number };
        navigate: (arg0: string) => void;
      };
    }) => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical={true}
              active={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate("Log")}
            >
              <Icon type="FontAwesome" name="sticky-note" />
              <Text>Logs</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button
              vertical={true}
              active={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate("Tasks")}
            >
              <Icon type="FontAwesome5" name="tasks" />
              <Text>Tasks</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

tabNavigator.navigationOptions = {
  header: null
};

export default tabNavigator;
