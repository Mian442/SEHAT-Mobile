import React, { createRef, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import {
  ActivityIndicator,
  Card,
  Headline,
  List,
  TextInput,
  useTheme,
} from "react-native-paper";
import randomColor from "randomcolor";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  DOC_ADD_QUALIFICATION,
  GET_DOC_RECORD,
} from "../../redux/actions/DoctorAction";
import SavingModel from "../../components/SavingModel";
import { Toast } from "native-base";
import Loading from "../../components/Loading";

const QualificationScreen = () => {
  const paper = useTheme();
  const [visible, setVisible] = useState(false);
  const [qualification, setQualification] = useState([]);
  const [data, setData] = useState({
    type: "",
    starting_year: "",
    ending_year: "",
    institute: "",
  });
  const list = [
    {
      name: "Type",
      icon: "user-graduate",
      type: "font-awesome-5",
      color: "#1de9b6",
      value: data.type,
      ref: createRef(),
      blur: false,
      keytype: "next",
      keyboard: "default",
      change: (text) => {
        let a = { ...data };
        a.type = text;
        setData(a);
      },
    },
    {
      name: "Starting Year",
      icon: "calendar-plus-o",
      type: "font-awesome",
      color: "#4caf50",
      value: data.starting_year,
      ref: createRef(),
      blur: false,
      keytype: "next",
      keyboard: "numeric",
      change: (text) => {
        let a = { ...data };
        a.starting_year = text;
        setData(a);
      },
    },
    {
      name: "Ending Year",
      icon: "calendar-minus-o",
      type: "font-awesome",
      color: "#ff1744",
      value: data.ending_year,
      ref: createRef(),
      blur: false,
      keytype: "next",
      keyboard: "numeric",
      change: (text) => {
        let a = { ...data };
        a.ending_year = text;
        setData(a);
      },
    },
    {
      name: "Institute",
      icon: "building",
      type: "font-awesome",
      color: "#607d8b",
      value: data.institute,
      ref: createRef(),
      blur: true,
      keytype: "done",
      keyboard: "default",
      change: (text) => {
        let a = { ...data };
        a.institute = text;
        setData(a);
      },
    },
  ];
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_RECORD("qualification", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
    if (info) {
      setQualification(info);
    }
  }, [info]);

  const handelButton = () => {
    let a = [...qualification];
    let flag = false;
    for (let i of a) {
      if (i.type === data.type && i.institute === data.institute) {
        flag = true;
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
        break;
      }
    }
    if (!flag) {
      a.push(data);
      a = a.sort();
      setQualification(a);
      setData({
        type: "",
        starting_year: "",
        ending_year: "",
        institute: "",
      });
    }
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
        <ScrollView contentContainerStyle={{ margin: 10 }}>
          <View>
            <Headline>Qualification Details</Headline>
            {list.map((item, i) => {
              return (
                <Card.Title
                  key={i}
                  title={item.name}
                  left={() => (
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color={item.color}
                    />
                  )}
                  rightStyle={{ width: 180 }}
                  right={(props) => (
                    <TextInput
                      {...props}
                      label={item.name}
                      value={item.value}
                      style={{ height: 30 }}
                      onChangeText={item.change}
                      ref={item.ref}
                      onSubmitEditing={() => {
                        i + 1 !== 4 && list[i + 1].ref.current.focus();
                      }}
                      keyboardType={item.keyboard}
                      mode="outlined"
                      blurOnSubmit={item.blur}
                      returnKeyType={item.keytype}
                    />
                  )}
                />
              );
            })}
            <Button
              icon={
                <Icon
                  name="plus"
                  size={24}
                  color="#fff"
                  style={{ margin: 7 }}
                  type="font-awesome-5"
                />
              }
              onPress={handelButton}
              buttonStyle={{
                margin: 30,
                backgroundColor: paper.colors.error,
                height: 40,
              }}
              titleStyle={{ fontSize: 20 }}
              title="Add"
            />
          </View>
          <View>
            <List.Section>
              <List.Subheader>Added details</List.Subheader>
              {qualification.map((item, i) => {
                return (
                  <List.Item
                    key={i}
                    title={item.type}
                    description={
                      item.institute +
                      " ~ " +
                      item.starting_year +
                      " - " +
                      item.ending_year
                    }
                    left={() => (
                      <Icon
                        name="scroll"
                        type="font-awesome-5"
                        color={randomColor()}
                      />
                    )}
                    right={() => (
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onPress={() =>
                          setQualification(
                            qualification.filter(
                              (qual) => qual.type !== item.type
                            )
                          )
                        }
                      >
                        <Icon name="close" type="antdesign" color="#f50057" />
                      </TouchableOpacity>
                    )}
                  />
                );
              })}
            </List.Section>
          </View>
          <Button
            icon={
              <Icon
                name="save"
                size={24}
                color="#fff"
                style={{ margin: 7 }}
                type="font-awesome-5"
              />
            }
            onPress={() => {
              let data = {
                id: user._id,
                qualification,
              };
              setVisible(true);
              dispatch(
                DOC_ADD_QUALIFICATION(data, () => {
                  setVisible(false);
                })
              );
            }}
            buttonStyle={{
              margin: 30,
              backgroundColor: paper.colors.accent,
              height: 40,
            }}
            titleStyle={{ fontSize: 20 }}
            title="Save"
          />
          <SavingModel visible={visible} />
        </ScrollView>
      </View>
    );
};

export default QualificationScreen;
