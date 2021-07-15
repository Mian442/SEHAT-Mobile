import { HStack, Center } from "native-base";
import React, { createRef, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Card, useTheme, Divider, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
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
      index: 1,
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
      index: 2,
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
      index: 3,
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
      index: 4,
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
      index: -1,
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <Card style={{ margin: 10 }}>
        <Card.Title
          title="Doctor Information"
          titleStyle={{ alignSelf: "center" }}
        />
        <Divider />
        {list.map((item, i) => (
          <HStack
            key={i}
            space={3}
            alignItems="center"
            style={{ backgroundColor: paper.colors.surface }}
          >
            <Center size={16} shadow={3}>
              <Icon name={item.icon} type={item.type} color={item.color} />
            </Center>
            <TextInput
              label={item.name}
              style={{ flexGrow: 1, marginRight: 14 }}
              mode="outlined"
              dense
              value={item.value}
              onChangeText={(text) => {
                handelData(text, item.property);
              }}
              disabled={item.disable}
              ref={item.ref}
              onSubmitEditing={() => {
                item.index !== -1 && list[item.index].ref.current.focus();
              }}
              blurOnSubmit={item.blur}
              returnKeyType={item.returnKeyType}
              keyboardType={item.keypad}
            />
          </HStack>
        ))}
      </Card>
      <Button
        icon={
          <Icon
            name="save"
            size={18}
            color="#fff"
            style={{ paddingRight: 7 }}
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
        icon={
          <Icon
            name="close"
            size={18}
            color="#fff"
            style={{ paddingRight: 7 }}
            type="font-awesome"
          />
        }
      />
      <SavingModel visible={visible} />
    </ScrollView>
  );
};

export default DoctorInfoInsertion;
