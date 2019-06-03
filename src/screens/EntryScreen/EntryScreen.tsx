import { Button, Container, Icon, Text } from "native-base";
import React, { Fragment } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Card, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { Header } from "../../components";
import { StoreState } from "../../store/store.types";
import { getJWTToken } from "../../services/localStorage";

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

  async componentDidMount() {
    const jwtToken = await getJWTToken();
    if (jwtToken) {
      this.props.navigation.navigate("Main");
    }
  }

  public toggleModal = (state: boolean) => {
    this.setState({ isModalVisible: state });
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
            onPress={() => this.props.navigation.navigate("ScanQR")}
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

const mapStateToProps = (state: StoreState) => ({
  state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
});

export default compose<React.ComponentType<any>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntryScreen);
