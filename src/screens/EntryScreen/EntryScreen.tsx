import {
  Button,
  Container,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import React, { Fragment } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Card, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { Header } from "../../components";
import { StoreState } from "../../store/store.types";
import {
  getJWTToken,
  setJWTToken,
  setUserId
} from "../../services/localStorage";
import { authClient } from "../../services/api";

interface EntryScreenProps extends RouteComponentProps {
  navigation: any;
}

interface EntryScreenState {
  isModalVisible: boolean;
  qrData: string;
  isLoading: boolean;
  code: string;
  valid: boolean;
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
      isLoading: false,
      code: "",
      valid: false
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

  validate = async (text: string) => {
    const UUID4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    this.setState({ code: text, valid: UUID4Regex.test(text) });
  };

  submit = async () => {
    const UUID4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const { code } = this.state;
    if (UUID4Regex.test(code.trim())) {
      try {
        const res = await authClient(code.trim());
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
  };

  public render() {
    const { isModalVisible, code, valid } = this.state;
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
          <Button
            iconLeft={true}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Icon type="Entypo" name="key" color="white" />
            <Text>Enter manually</Text>
          </Button>
        </View>
        <Overlay
          isVisible={isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          height="auto"
        >
          <React.Fragment>
            <Form>
              <Text>Enter the clients code:</Text>
              <Item>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Input value={code} onChangeText={this.validate} />
                  <Icon
                    name={valid ? "md-checkmark" : "md-close"}
                    type="Ionicons"
                    color="white"
                  />
                </View>
              </Item>
            </Form>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Button
                light
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <Text>Cancel</Text>
              </Button>
              <Button light onPress={this.submit}>
                <Text>Submit</Text>
              </Button>
            </View>
          </React.Fragment>
        </Overlay>
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
