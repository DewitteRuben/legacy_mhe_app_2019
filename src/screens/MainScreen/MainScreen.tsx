import { Button, Footer, FooterTab, Icon, Text } from "native-base";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { CalendarScreen } from "../CalendarScreen";
import { LogScreen } from "../LogScreen";

const tabNavigator = createBottomTabNavigator(
  {
    Log: {
      screen: LogScreen
    },
    Sleep: {
      screen: LogScreen
    },
    Stats: {
      screen: LogScreen
    },
    Calendar: {
      screen: CalendarScreen
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
              onPress={() => props.navigation.navigate("Sleep")}
            >
              <Icon type="FontAwesome" name="moon-o" />
              <Text>Sleep</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button
              vertical={true}
              active={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate("Stats")}
            >
              <Icon type="Entypo" name="bar-graph" />
              <Text>Stats</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button
              vertical={true}
              active={props.navigation.state.index === 3}
              onPress={() => props.navigation.navigate("Calendar")}
            >
              <Icon type="FontAwesome" name="calendar-o" />
              <Text>Calendar</Text>
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
