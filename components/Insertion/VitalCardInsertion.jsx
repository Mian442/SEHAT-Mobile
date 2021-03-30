import { useRoute } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import {
  Caption,
  Divider,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  ADD_USER_VITAL,
  USER_VITAL_UPDATE,
} from "../../redux/actions/UserActions";
import SavingModal from "../SavingModel";
const VitalCardInsertion = ({ id, handelButton }) => {
  const [data, setData] = useState(null);
  const initialState = {
    heart_beat: "",
    blood_pressure: "",
    blood_glucose: "",
    weight: "",
    date: new Date(),
    id,
  };
  const [saveVisible, setSaveVisible] = useState(false);
  const dispatch = useDispatch();
  const { params } = useRoute();
  const paper = useTheme();
  useEffect(() => {
    if (params.forEdit) {
      let a = { ...params.vitals };
      a.date = new Date(a.date);
      setData(a);
    } else {
      setData(initialState);
    }
  }, []);

  const vital = [
    {
      name: "Heart Beat",
      backcolor: "#ff1744",
      icon: "heartbeat",
      type: "font-awesome-5",
      value: data?.heart_beat,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...data };
        a.heart_beat = text;
        setData(a);
      },
    },
    {
      name: "Blood Pressure",
      backcolor: "#000",
      icon: "stethoscope",
      type: "font-awesome",
      value: data?.blood_pressure,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...data };
        a.blood_pressure = text;
        setData(a);
      },
    },
    {
      name: "Weight",
      backcolor: "#ffc400",
      icon: "weight",
      type: "font-awesome-5",
      value: data?.weight,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...data };
        a.weight = text;
        setData(a);
      },
    },
    {
      name: "Blood Glucose",
      backcolor: "#00b0ff",
      icon: "cubes",
      type: "font-awesome",
      value: data?.blood_glucose,
      ref: createRef(),
      blur: true,
      keytype: "done",
      change: (text) => {
        let a = { ...data };
        a.blood_glucose = text;
        setData(a);
      },
    },
  ];

  const showModal = () => setSaveVisible(true);
  const hideModal = () => setSaveVisible(false);

  return (
    <View
      style={{
        backgroundColor: paper.colors.surface,
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 10,
        }}
      >
        {vital?.map((item, i) => (
          <View key={i}>
            <ListItem
              containerStyle={{ backgroundColor: paper.colors.surface }}
            >
              <Icon
                name={item.icon}
                type={item.type}
                color={item.backcolor}
                reverse
                reverseColor="#fff"
                size={11}
              />
              <ListItem.Content>
                <Title>{item.name}</Title>
                <Subheading>{item.name}</Subheading>
              </ListItem.Content>
              <TextInput
                label={item.name}
                value={item.value}
                style={{ height: 30, width: "40%" }}
                onChangeText={item.change}
                ref={item.ref}
                onSubmitEditing={() => {
                  i + 1 !== 4 && vital[i + 1].ref.current.focus();
                }}
                mode="outlined"
                blurOnSubmit={item.blur}
                keyboardType="numeric"
                returnKeyType={item.keytype}
              />
            </ListItem>
            <Divider />
          </View>
        ))}
        <Caption>
          This {params.forEdit ? "is" : "will be"} noted on:{" "}
          {data?.date.toLocaleString()}
        </Caption>
        <Button
          icon={
            <Icon
              name="save"
              size={24}
              color="#fff"
              style={{ paddingRight: 7 }}
              type="font-awesome-5"
            />
          }
          onPress={() => {
            if (params.forEdit) {
              showModal();
              dispatch(
                USER_VITAL_UPDATE({ id: params.id, data: { ...data } }, () => {
                  hideModal();
                })
              );
            } else {
              showModal();
              dispatch(
                ADD_USER_VITAL(data, () => {
                  hideModal();
                  setTimeout(() => {
                    handelButton();
                  }, 1000);
                })
              );
            }
          }}
          buttonStyle={{ margin: 10, backgroundColor: paper.colors.accent }}
          title="Save"
        />
        {!params.forEdit && (
          <Button
            icon={
              <Icon
                name="close"
                size={24}
                color="#fff"
                style={{ paddingRight: 7 }}
                type="font-awesome"
              />
            }
            onPress={() => handelButton()}
            buttonStyle={{ margin: 10, backgroundColor: paper.colors.error }}
            title="Cancel"
          />
        )}
        <SavingModal visible={saveVisible} />
      </View>
    </View>
  );
};

export default VitalCardInsertion;
