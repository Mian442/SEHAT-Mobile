import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Caption,
  Divider,
  Subheading,
  Text,
  useTheme,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Toast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SavingModel from "../../components/SavingModel";
import {
  GET_DOC_ONLINE_SCHEDULE,
  DOC_ADD_ONLINE_SCHEDULE,
} from "../../redux/actions/DoctorAction";
import Loading from "../../components/Loading";
const SchedulesScreen = () => {
  const paper = useTheme();
  const [online, setOnline] = useState([
    { day: "Monday", time: [], status: false },
    { day: "Tuesday", time: [], status: false },
    { day: "Wednesday", time: [], status: false },
    { day: "Thursday", time: [], status: false },
    { day: "Friday", time: [], status: false },
    { day: "Saturday", time: [], status: false },
    { day: "Sunday", time: [], status: false },
  ]);
  const [date, setdate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("time");
  const [day, setDay] = useState("Monday");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_ONLINE_SCHEDULE(user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
    if (info) {
      setOnline(info);
    }
  }, [info]);
  const showDatepicker = () => {
    showMode("time");
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

  const handelButton = () => {
    let a = [...online];
    let index = 0;
    let flag = false;
    for (let i of a) {
      console.log(i.day === day && i.time.includes(date), i.day === day);
      if (i.day === day && i.time.some((t) => t.time === date)) {
        Toast.show({
          text: "Already Exists!",
          style: {
            margin: 20,
            borderRadius: 25,
            width: 180,
            alignSelf: "center",
            backgroundColor: paper.colors.onBackground,
          },
          textStyle: { textAlign: "center", color: paper.colors.surface },
        });
      } else if (i.day === day) {
        flag = true;
        break;
      }
      index = index + 1;
    }
    if (flag) {
      a[index].time.push({ time: date, status: false });
      setOnline(a);
    }

    console.log(online);
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {show && (
            <DateTimePicker
              locale="es"
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={mode}
              display="clock"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
          <View style={{ margin: 14 }}>
            <View style={styles.row}>
              <Subheading>Select day:</Subheading>
              <Picker
                selectedValue={day}
                mode="dropdown"
                style={{
                  height: 50,
                  color: paper.colors.text,
                  flexGrow: 1,
                }}
                dropdownIconColor={paper.colors.text}
                onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
              >
                {days.map((days, i) => {
                  return <Picker.Item key={i} label={days} value={days} />;
                })}
              </Picker>
            </View>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={styles.row}>
                <Icon name="md-time" size={24} type="ionicon" color="#2196f3" />
                <Text style={{ paddingLeft: 7, fontSize: 18 }}>Time:</Text>
                <Text
                  style={{
                    paddingLeft: 7,
                    fontSize: 18,
                    color: "#009688",
                    flexGrow: 1,
                  }}
                >
                  {moment(date).calendar().split("at ")[1]}
                </Text>
                <Button
                  uppercase={false}
                  onPress={handelButton}
                  mode="contained"
                  color={paper.colors.error}
                  dark
                  style={{ margin: 20 }}
                >
                  Add
                </Button>
              </View>
            </TouchableOpacity>

            {online.map((item, i) => (
              <View style={{ marginVertical: 10 }} key={i}>
                <Caption>{item.day}</Caption>
                <Divider style={{ height: 2 }} />
                <View style={[styles.row, { flexWrap: "wrap" }]}>
                  {item.time.map((time, j) => (
                    <View
                      key={j}
                      style={[
                        styles.row,
                        {
                          margin: 8,
                          borderRadius: 8,
                          borderWidth: 1.5,
                          borderStyle: "solid",
                          borderColor: "#00e676",
                          padding: 6,
                        },
                      ]}
                    >
                      <Text
                        style={{ marginRight: 4, color: paper.colors.text }}
                      >
                        {moment(time.time).format("hh:mm A")}
                      </Text>
                      <Icon
                        name="close"
                        color="#f50057"
                        onPress={() => {
                          let a = [...online];
                          a[i].time.splice(j, 1);
                          setOnline(a);
                        }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
            <Button
              uppercase={false}
              onPress={() => {
                setVisible(true);
                dispatch(
                  DOC_ADD_ONLINE_SCHEDULE({ id: user._id, online }, () =>
                    setVisible(false)
                  )
                );
              }}
              mode="contained"
              color={paper.colors.accent}
              dark
              style={{ margin: 20 }}
            >
              Save
            </Button>
            <SavingModel visible={visible} />
          </View>
        </ScrollView>
      </View>
    );
};

export default SchedulesScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
});
