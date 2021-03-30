import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import {
  Text,
  List,
  Title,
  Checkbox,
  Headline,
  Divider,
  Subheading,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  GET_DOC_ONLINE_SCHEDULE,
  ADD_APPOINTMENT,
} from "../redux/actions/DoctorAction";
import SavingModel from "./SavingModel";

const BookAppointment = () => {
  const paper = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [Day, setDay] = React.useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const { params } = useRoute();
  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState("date");
  const [date, setdate] = React.useState("");
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: params.name });
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_ONLINE_SCHEDULE(params._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [info]);

  const showDatepicker = () => {
    showMode("date");
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setdate(currentDate);
  };
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: paper.colors.surface,
        }}
      >
        {info ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {show && (
              <DateTimePicker
                locale="es"
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="calendar"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
            <View
              pointerEvents={checked ? "none" : "auto"}
              style={{ opacity: checked ? 0.5 : 1 }}
            >
              <Title
                style={{
                  margin: 10,
                }}
              >
                This Week:
              </Title>
              <List.Accordion
                title={Day ? Day.day : "Select the Day"}
                left={(props) => <List.Icon {...props} icon="calendar-range" />}
                expanded={expanded}
                onPress={handlePress}
              >
                {info?.map((item, i) => (
                  <List.Item
                    key={i}
                    onPress={() => {
                      setDay(item);
                      handlePress();
                    }}
                    style={{
                      backgroundColor: !item.status ? "#00e676" : "#ff1744",
                      borderRadius: 10,
                      margin: 10,
                    }}
                    key={i}
                    titleStyle={{ color: "white" }}
                    title={item.day}
                    right={(props) => (
                      <Text style={{ marginTop: "2.5%", color: "#fff" }}>
                        {!item.status ? "Un Booked" : "Booked"}
                      </Text>
                    )}
                  />
                ))}
              </List.Accordion>
              {Day && (
                <View style={{ margin: 10 }}>
                  <Headline>{Day.day}:</Headline>
                  <Divider style={{ marginTop: 7, height: 3 }} />
                  <Subheading style={{ margin: 7 }}>Timing:</Subheading>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    {Day.time?.map((item, index) =>
                      item.status ? (
                        <Button
                          key={index}
                          title={moment(item.time).calendar().split("at ")[1]}
                          containerStyle={{ margin: 10 }}
                          buttonStyle={{ backgroundColor: "#ff1744" }}
                        />
                      ) : index === time ? (
                        <Button
                          key={index}
                          type="solid"
                          containerStyle={{
                            margin: 10,
                          }}
                          buttonStyle={{ backgroundColor: "#00e676" }}
                          title={moment(item.time).calendar().split("at ")[1]}
                          onPress={() => setTime(null)}
                        />
                      ) : (
                        <Button
                          key={index}
                          type="outline"
                          containerStyle={{
                            margin: 10,
                            borderColor: "#00e676",
                            borderWidth: 1,
                          }}
                          title={moment(item.time).calendar().split("at ")[1]}
                          titleStyle={{ color: "#00e676" }}
                          onPress={() => setTime(index)}
                        />
                      )
                    )}
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                setChecked(!checked);
              }}
            >
              <Checkbox status={checked ? "checked" : "unchecked"} />
              <Text>Other Option</Text>
            </TouchableOpacity>

            {checked && (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                  }}
                  onPress={showDatepicker}
                >
                  <Icon
                    name="calendar-alt"
                    type="font-awesome-5"
                    color="green"
                    size={24}
                  />
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>Date:</Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 18,
                      color: "green",
                    }}
                  >
                    {date.toString().substr(4, 12)}
                  </Text>
                </TouchableOpacity>
                <Divider style={{ marginTop: 7, height: 3 }} />
                <Subheading style={{ margin: 7 }}>Timing:</Subheading>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  {!show &&
                    timing.map((item, index) =>
                      item.status === "Booked" ? (
                        <Button
                          key={index}
                          title={item.time}
                          containerStyle={{ margin: 10 }}
                          buttonStyle={{ backgroundColor: "#ff1744" }}
                        />
                      ) : (
                        <Button
                          key={index}
                          type="outline"
                          containerStyle={{
                            margin: 10,
                            borderColor: "#00e676",
                            borderWidth: 1,
                          }}
                          title={item.time}
                          titleStyle={{ color: "#00e676" }}
                          onPress={() => {}}
                        />
                      )
                    )}
                </View>
              </View>
            )}
            <View style={{ alignSelf: "flex-end" }}>
              <Button
                type="outline"
                containerStyle={{
                  margin: 10,
                }}
                buttonStyle={{ backgroundColor: "#651fff" }}
                titleStyle={{ color: "white" }}
                onPress={() => {
                  let temp = { ...Day };
                  temp.time = Day.time[time].time;
                  let data = {
                    id: user._id,
                    doctor: {
                      ...params,
                    },
                    user,
                    appointment: {
                      ...temp,
                      index: time,
                    },
                  };
                  setVisible(true);
                  dispatch(
                    ADD_APPOINTMENT(data, () => {
                      setTimeout(() => {
                        setVisible(false);
                        navigation.goBack();
                      }, 3000);
                    })
                  );
                }}
                title="Book Appointment"
                icon={
                  <Icon
                    name="calendar-alt"
                    type="font-awesome-5"
                    color="#fff"
                    style={{ marginRight: 4 }}
                  />
                }
              />
            </View>
            <SavingModel visible={visible} />
          </ScrollView>
        ) : (
          <Title style={{ alignSelf: "center", margin: 20 }}>No Result</Title>
        )}
      </View>
    );
};

export default BookAppointment;
