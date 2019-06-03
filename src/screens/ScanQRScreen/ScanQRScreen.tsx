import { Container, Icon, Text } from "native-base";
import React, { Fragment } from "react";
import { Alert, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import { StoreState } from "../../store/store.types";
import { authClient } from "../../services/api";
import { setJWTToken, setUserId } from "../../services/localStorage";

interface ScanQRProps extends RouteComponentProps {
  navigation: any;
}

interface ScanQRState {}

class ScanQRScreen extends React.PureComponent<ScanQRProps, ScanQRState> {
  public static navigationOptions = {
    header: null
  };

  constructor(props: ScanQRProps) {
    super(props);
  }

  public registerUser = async (data: any) => {
    if (data.type === "QR_CODE") {
      const userId = data.data;
      const UUID4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
      if (UUID4Regex.test(userId)) {
        try {
          const res = await authClient(userId);
          if (res.code === 200 && res.token) {
            setJWTToken(res.token);
            setUserId(res.userId);
            this.props.navigation.navigate("Main");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert("Register user", "Invalid QR Code!");
      }
    }
  };

  public render() {
    return (
      <Container>
        <Header
          left={
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <QRCodeScanner
          onRead={this.registerUser}
          topContent={
            <Text>
              Scan the QR code given by the mental health professional!
            </Text>
          }
        />
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
)(ScanQRScreen);
