import React, { createRef, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Headline, List, TextInput, useTheme } from "react-native-paper";
import randomColor from "randomcolor";
import { TouchableOpacity } from "react-native";
import SavingModel from "../../components/SavingModel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  DOC_ADD_PUBLICATION,
  GET_DOC_RECORD,
} from "../../redux/actions/DoctorAction";
import Loading from "../../components/Loading";
import { HStack, Center } from "native-base";
import { ERROR } from "../../redux/actions/MessageAction";
const PublicationScreen = () => {
  const paper = useTheme();
  const [publication, setPublication] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Data, setData] = useState({
    name: "",
    year: "",
    place: "",
  });
  const list = [
    {
      name: "Name",
      icon: "user-graduate",
      type: "font-awesome-5",
      color: "#1de9b6",
      value: Data.name,
      ref: createRef(),
      blur: false,
      keytype: "next",
      keyboard: "default",
      change: (text) => {
        let a = { ...Data };
        a.name = text;
        setData(a);
      },
    },
    {
      name: "Year",
      icon: "calendar",
      type: "font-awesome",
      color: "#4caf50",
      value: Data.year,
      ref: createRef(),
      blur: false,
      keytype: "next",
      keyboard: "numeric",
      change: (text) => {
        let a = { ...Data };
        a.year = text;
        setData(a);
      },
    },
    {
      name: "Place",
      icon: "building",
      type: "font-awesome",
      color: "#607d8b",
      value: Data.place,
      ref: createRef(),
      blur: true,
      keytype: "done",
      keyboard: "default",
      change: (text) => {
        let a = { ...Data };
        a.place = text;
        setData(a);
      },
    },
  ];
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.User.TOKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_RECORD("publications", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
    if (info) {
      setPublication(info);
    }
  }, [info]);

  const handelButton = () => {
    let a = [...publication];
    let flag = false;
    for (let i of a) {
      if (
        i.name === Data.name &&
        i.place === Data.place &&
        i.year === Data.year
      ) {
        flag = true;
        dispatch(ERROR({ content: "Already Existed!", type: "error" }));
        break;
      }
    }
    if (!flag) {
      a.push(Data);
      a = a.sort();
      setPublication(a);
      setData({
        name: "",
        year: "",
        place: "",
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
            <Headline>Publication Details</Headline>
            {list.map((item, i) => {
              return (
                <HStack
                  key={i}
                  space={3}
                  alignItems="center"
                  style={{ backgroundColor: paper.colors.surface }}
                >
                  <Center size={16} shadow={3}>
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color={item.color}
                    />
                  </Center>
                  <TextInput
                    label={item.name}
                    style={{ flexGrow: 1, marginRight: 14 }}
                    mode="outlined"
                    dense
                    value={item.value}
                    onChangeText={item.change}
                    ref={item.ref}
                    onSubmitEditing={() => {
                      i + 1 !== 4 && list[i + 1].ref.current.focus();
                    }}
                    blurOnSubmit={item.blur}
                    returnKeyType={item.keytype}
                    keyboardType={item.keyboard}
                  />
                </HStack>
              );
            })}
          </View>
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
          <View>
            <List.Section>
              <List.Subheader>Added details</List.Subheader>
              {publication.map((item, i) => {
                return (
                  <List.Item
                    key={i}
                    title={item.name}
                    description={item.place + ", " + item.year}
                    left={() => (
                      <Icon
                        name="pen-fancy"
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
                          setPublication(
                            publication.filter(
                              (qual) => qual.name !== item.name
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
                  publication,
                };
                setVisible(true);
                dispatch(
                  DOC_ADD_PUBLICATION(data, () => {
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
          </View>
          <SavingModel visible={visible} />
        </ScrollView>
      </View>
    );
};

export default PublicationScreen;

const styles = StyleSheet.create({});
