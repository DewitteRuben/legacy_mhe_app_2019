import moment from "moment";
import { Button, CardItem, Container, Content, Icon, Text } from "native-base";
import React, { Fragment } from "react";
import { FlatList, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Header } from "../../components";
import { StoreState } from "../../store";

interface CalendarScreenProps extends RouteComponentProps {}

interface CalendarScreenState {
  selectedDate: string;
  visibleMonth: Date;
  items: any;
}

class CalendarScreen extends React.PureComponent<
  CalendarScreenProps,
  CalendarScreenState
> {
  constructor(props: CalendarScreenProps) {
    super(props);
    this.state = {
      items: [
        {
          dateString: "2019-05-21",
          title: "Next appointment with Dr. Geerts",
          description: "Self confidence training",
          timeString: "9:00 AM - 10:00 AM"
        }
      ],
      visibleMonth: new Date(),
      selectedDate: moment(new Date()).format("YYYY-MM-DD")
    };
  }

  public async componentDidMount() {}

  public setSelectedDate = (dateString: string) => {
    this.setState({
      visibleMonth: new Date(dateString),
      selectedDate: dateString
    });
  };

  public render() {
    const { selectedDate, items, visibleMonth } = this.state;
    return (
      <Container>
        <Header left={<Icon name="menu" />} right={<Icon name="settings" />} />
        <Content padder={true}>
          <Card>
            <CardItem header={true} bordered={true}>
              <Text>Appointments</Text>
            </CardItem>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }: { item: any }) => (
                <CardItem
                  accessible={true}
                  button={true}
                  onPress={() => this.setSelectedDate(item.dateString)}
                >
                  <View>
                    <Text>21 May 2019</Text>
                    <Text style={{ color: "grey" }}>{item.timeString}</Text>
                    <Text note={true}>{item.title}</Text>
                  </View>
                </CardItem>
              )}
            />
          </Card>
          <Calendar
            current={visibleMonth}
            onDayPress={(day: any) => {
              this.setState({ selectedDate: day.dateString });
            }}
            markedDates={{
              "2019-05-21": {
                marked: true,
                dotColor: "red"
              },
              [this.state.selectedDate]: {
                selected: true
              }
            }}
          />
        </Content>
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
)(CalendarScreen);
