import { Button, Container, Icon, Text } from "native-base";
import React, { Fragment } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import QRCodeScanner from "react-native-qrcode-scanner";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { Header } from "../../components";
import { StoreState } from "../../store/store.types";

interface EntryScreenProps extends RouteComponentProps {
  navigation: any;
}

interface EntryScreenState {
  isModalVisible: boolean;
  qrData: string;
  isLoading: boolean;
}

class EntryScreen extends React.PureComponent<
  EntryScreenProps,
  EntryScreenState
> {
  public static navigationOptions = {
    header: null
  };

  constructor(props: EntryScreenProps) {
    super(props);

    this.state = {
      isModalVisible: false,
      qrData: "",
      isLoading: false
    };
  }

  public toggleModal = (state: boolean) => {
    this.setState({ isModalVisible: state });
  };

  public registerUser = (data: any) => {
    if (data.type === "QR_CODE") {
      this.setState({ qrData: data, isLoading: true });
    } else {
      Alert.alert("Register user", "Invalid QR Code!");
    }
    this.toggleModal(false);
  };

  public render() {
    return (
      <Container>
        <Header center={<Text>Mental Health App</Text>} />
        <View>
          <Card>
            <Text>
              Welcome to the mental health app, request your mental health
              professional for your login information
            </Text>
          </Card>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <Button
            iconLeft={true}
            onPress={() => this.props.navigation.navigate("App")}
          >
            <Icon name="qrcode" type="AntDesign" color="white" />
            <Text>Scan QR Code</Text>
          </Button>
          <Text style={{ textAlign: "center", marginVertical: 10 }}>Or</Text>
          <Button iconLeft={true}>
            <Icon type="Entypo" name="key" color="white" />
            <Text>Enter manually</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

/*<QRCodeScanner
              onRead={this.registerUser}
              cameraStyle={qrStyle.camera}
              containerStyle={qrStyle.container}
            /> */

const qrStyle = StyleSheet.create<any>({
  camera: { width: 150, height: 150 },
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntryScreen);
