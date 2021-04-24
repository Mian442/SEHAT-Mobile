import { Body, CardItem, Left, Right } from "native-base";
import React, { createRef, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Card, Text, useTheme, Divider, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { DOC_INFORMATION_UPDATE } from "../../redux/actions/DoctorAction";
import SavingModel from "../SavingModel";

const DoctorInfoInsertion = ({ info, handelButton }) => {
  const paper = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [Info, setInfo] = useState({
    specialty: info?.specialty,
    licenseNo: info?.licenseNo,
    online_fee: info?.online_fee,
    office_fee: info?.office_fee,
    about: info?.about,
  });

  const dispatch = useDispatch();
  const list = [
    {
      name: "Specialty",
      icon: "user-md",
      type: "font-awesome",
      color: "#ffc107",
      ref: createRef(),
      blur: false,
      returnKeyType: "next",
      value: Info.specialty,
      disable: true,
      property: "specialty",
      keypad: "default",
    },
    {
      name: "License NO",
      icon: "drivers-license-o",
      type: "font-awesome",
      color: "#00e676",
      ref: createRef(),
      blur: false,
      returnKeyType: "next",
      value: Info.licenseNo,
      disable: true,
      property: "licenseNo",
      keypad: "default",
    },
    {
      name: "Online Fee",
      icon: "attach-money",
      type: "material",
      color: "#2e7d32",
      ref: createRef(),
      blur: false,
      returnKeyType: "next",
      value: Info.online_fee,
      disable: false,
      property: "online_fee",
      keypad: "numeric",
    },
    {
      name: "Office Fee",
      icon: "money-check-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: Info.office_fee,
      ref: createRef(),
      blur: false,
      returnKeyType: "next",
      disable: false,
      property: "office_fee",
      keypad: "numeric",
    },
    {
      name: "About",
      icon: "info-circle",
      type: "font-awesome",
      color: "#673ab7",
      value: Info.about,
      ref: createRef(),
      blur: true,
      returnKeyType: "done",
      disable: false,
      property: "about",
      keypad: "default",
    },
  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handelData = (text, type) => {
    let a = { ...Info };
    a[type] = text;
    setInfo(a);
  };

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <CardItem
          header
          bordered
          style={{
            backgroundColor: paper.colors.surface,
          }}
        >
          <Card.Title
            title="Doctor Information"
            titleStyle={{ alignSelf: "center" }}
          />
        </CardItem>
        <Divider />
        {list.map((item, i) => (
          <CardItem
            key={i}
            bordered
            style={{ backgroundColor: paper.colors.surface }}
          >
            <Left>
              <Icon name={item.icon} type={item.type} color={item.color} />
            </Left>
            <Body
              style={{
                flexGrow: 2,
                alignSelf: "center",
              }}
            >
              <Text>{item.name}</Text>
            </Body>
            <Right style={{ flexGrow: 4, flexDirection: "row" }}>
              <TextInput
                label={item.name}
                value={item.value}
                style={{ flexGrow: 1, height: 52, width: 50 }}
                onChangeText={(text) => {
                  handelData(text, item.property);
                }}
                disabled={item.disable}
                ref={item.ref}
                onSubmitEditing={() => {
                  i + 1 !== 5 && list[i + 1].ref.current.focus();
                }}
                blurOnSubmit={item.blur}
                returnKeyType={item.returnKeyType}
                keyboardType={item.keypad}
              />
            </Right>
          </CardItem>
        ))}
      </Card>
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
            id: info._id,
            data: Info,
          };
          showModal();
          dispatch(
            DOC_INFORMATION_UPDATE(data, () => {
              hideModal();
            })
          );
        }}
        buttonStyle={{ margin: 10, backgroundColor: paper.colors.accent }}
        title="Save"
      />
      <Button
        onPress={handelButton}
        buttonStyle={{ margin: 10, backgroundColor: paper.colors.error }}
        title="Close"
      />
      <SavingModel visible={visible} />
    </ScrollView>
  );
};

export default DoctorInfoInsertion;
