import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Caption, Divider, Text, useTheme } from "react-native-paper";
import { Select, CheckIcon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SavingModel from "../../components/SavingModel";
import {
  GET_DOC_ONLINE_SCHEDULE,
  DOC_ADD_ONLINE_SCHEDULE,
} from "../../redux/actions/DoctorAction";
import Loading from "../../components/Loading";
import { ERROR } from "../../redux/actions/MessageAction";
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
  const [day, setDay] = useState("");
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
  const user = useSelector((state) => state.User.TOKEN);
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
    if (day !== "") {
      for (let i of a) {
        if (i.day === day && i.time.some((t) => t.time === date)) {
          dispatch(ERROR({ content: "Already Existed!", type: "error" }));
        } else if (i.day === day) {
          flag = true;
          break;
        }
        index = index + 1;
      }
    } else {
      dispatch(ERROR({ content: "Day is not Selected!", type: "error" }));
    }

    if (flag) {
      a[index].time.push({ time: date, status: false });
      setOnline(a);
    }
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
              value={new Date()}
              mode={mode}
              display="clock"
              onChange={onChange}
            />
          )}
          <View style={{ margin: 14 }}>
            <Select
              selectedValue={day}
              placeholder="Select a Day"
              onValueChange={(itemValue) => setDay(itemValue)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {days.map((item, i) => (
                <Select.Item key={i} label={item} value={item} />
              ))}
            </Select>
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
                  {moment(date).format("hh:mm A")}
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

            {online.map(
              (item, i) =>
                item.time.length > 0 && (
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
                )
            )}
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
