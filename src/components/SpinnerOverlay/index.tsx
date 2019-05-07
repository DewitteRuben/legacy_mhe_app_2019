import { Spinner, Text } from "native-base";
import React from "react";
import { Overlay } from "react-native-elements";

interface SpinnerOverlayProps {
  isVisible: boolean;
}

export default class SpinnerOverlay extends React.PureComponent<
  SpinnerOverlayProps
> {
  constructor(props: SpinnerOverlayProps) {
    super(props);
  }

  public render() {
    const { isVisible } = this.props;

    return (
      <Overlay
        isVisible={isVisible}
        fullScreen={true}
        overlayStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.6)"
        }}
      >
        <Spinner color="blue" />
      </Overlay>
    );
  }
}
