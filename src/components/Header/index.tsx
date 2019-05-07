import React from "react";
import { Platform } from "react-native";
import { Header as HeaderElements } from "react-native-elements";

interface HeaderProps {
  left?: any;
  right?: any;
  center?: any;
  backgroundColor?: string;
}

const backgroundColorIOS = "#F8F8F8";
const backgroundColorAndroid = "#3F51B5";
export default class Header extends React.PureComponent<HeaderProps> {
  public static defaultProps = {
    backgroundColor:
      Platform.OS === "android" ? backgroundColorAndroid : backgroundColorIOS
  };
  constructor(props: HeaderProps) {
    super(props);
  }

  public addStyleToComponent = (prop: any) => {
    if (Platform.OS === "android") {
      if (prop && prop.type && prop.type.name === "StyledComponent") {
        return React.cloneElement(prop, { style: { color: "white" } });
      }
    }
    return prop;
  };

  public render() {
    const { left, right, center, backgroundColor } = this.props;
    const styledLeft = this.addStyleToComponent(left);
    const styledRight = this.addStyleToComponent(right);
    const styledCenter = this.addStyleToComponent(center);

    return (
      <HeaderElements
        statusBarProps={{ translucent: true }}
        containerStyle={Platform.select({
          android: Platform.Version <= 20 ? { paddingTop: 0, height: 56 } : {}
        })}
        leftComponent={styledLeft}
        rightComponent={styledRight}
        centerComponent={styledCenter}
        backgroundColor={backgroundColor}
      />
    );
  }
}
