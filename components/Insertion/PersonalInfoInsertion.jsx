import React, { createRef, useState } from "react";
import { HStack, Center, Select, CheckIcon } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Avatar, Button, Icon, Overlay } from "react-native-elements";
import {
  Card,
  Title,
  Text,
  useTheme,
  Divider,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  USER_INFORMATION_UPDATE,
  ADD_USER_INFORMATION,
} from "../../redux/actions/UserActions";

const PersonalInfoInsertion = ({ info, handelButton }) => {
  const paper = useTheme();
  const { information } = useSelector((state) => state.Language.Lang);
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [Info, setInfo] = useState({
    blood: info?.blood,
    height: info?.height,
    address: info?.address,
    cnic: info?.cnic,
    email: info?.user?.email,
    martial_status: info?.martial_status,
    date: info.user.dob,
    pic: info?.user?.pic,
    visible: false,
    ph: info?.user?.ph?.toString(),
    gender: info?.user?.gender,
    mode: "date",
  });
  const dispatch = useDispatch();
  const list = [
    {
      name: information.DOB,
      icon: "date",
      type: "fontisto",
      color: "#00e676",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.date,
      disabled: true,
      component: "input",
      index: 1,
      keyboardType: "default",
    },
    {
      name: information.email,
      icon: "md-mail",
      type: "ionicon",
      color: "#9e9e9e",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.email,
      disabled: true,
      component: "input",
      index: 2,
      keyboardType: "default",
    },
    {
      name: information.ph,
      icon: "phone",
      type: "font-awesome",
      color: "#2e7d32",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.ph,
      disabled: true,
      component: "input",
      index: 3,
      keyboardType: "numeric",
    },
    {
      name: information.cnic,
      icon: "id-card-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: Info.cnic,
      ref: createRef(),
      blur: false,
      keytype: "next",
      disabled: false,
      component: "input",
      index: 4,
      keyboardType: "numeric",
    },
    {
      name: information.address,
      icon: "address-book-o",
      type: "font-awesome",
      color: "#673ab7",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.address,
      disabled: false,
      component: "input",
      index: 5,
      keyboardType: "default",
    },

    {
      name: information.height,
      icon: "human-male-height",
      type: "material-community",
      color: "#ff3d00",
      ref: createRef(),
      blur: true,
      keytype: "done",
      value: Info.height,
      disabled: false,
      component: "input",
      index: -1,
      keyboardType: "numeric",
    },
    {
      name: information.gender,
      icon: "genderless",
      type: "font-awesome",
      color: "#009688",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.gender,
      disabled: false,
      component: "select",
      items: ["Male", "Female"],
    },
    {
      name: information.martial_status,
      icon: "human-male-female",
      type: "material-community",
      color: paper.dark ? "#fff" : "#000",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.martial_status,
      disabled: false,
      component: "select",
      items: ["Single", "Married"],
    },
    {
      name: information.blood,
      icon: "blood-drop",
      type: "fontisto",
      color: "#ff1744",
      ref: createRef(),
      blur: true,
      keytype: "done",
      value: Info.blood,
      disabled: false,
      component: "select",
      items: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handeldata = (text, type) => {
    let a = { ...Info };
    a[type] = text;
    setInfo(a);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode) => {
    setShow(true);
    handeldata(currentMode, "mode");
  };

  const toggleOverlay = () => {
    handeldata(!Info.visible, "visible");
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });
      if (!result.cancelled) {
        handeldata(result.base64, "pic");
        // toggleOverlay();
      }
    } catch (E) {
      alert(E);
    }
  };

  const pickCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        handeldata(result.base64, "pic");
      }
    } catch (E) {
      alert(E);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    handeldata(currentDate, "date");
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {show && (
        <DateTimePicker
          locale="es"
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={new Date()}
          mode={Info.mode}
          is24Hour={true}
          display="calendar"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <Card style={{ margin: 10 }}>
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface, padding: 10 }}
        >
          <Center shadow={3}>
            <Avatar
              rounded
              size="large"
              overlayContainerStyle={{ backgroundColor: "#009688" }}
              activeOpacity={0.7}
              containerStyle={{}}
              source={
                Info.pic === null
                  ? Info.gender === "Male"
                    ? require(`../../assets/images/man.png`)
                    : require(`../../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + Info.pic }
              }
            />
          </Center>
          <Center shadow={3}>
            <Title>{info?.user.fname + " " + info?.user.lname}</Title>
          </Center>
          <Center shadow={3}>
            <Button
              icon={
                <Icon
                  name="camera"
                  size={20}
                  color="#fff"
                  style={{ margin: 7 }}
                  type="font-awesome-5"
                />
              }
              onPress={toggleOverlay}
              buttonStyle={{
                marginVertical: 10,
                backgroundColor: paper.colors.accent,
              }}
              title="Upload Image"
            />
          </Center>
        </HStack>
      </Card>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title={information.title}
          titleStyle={{ alignSelf: "center" }}
        />
        <Divider />
        {list.map((item, i) =>
          is_eng ? (
            <HStack
              key={i}
              space={3}
              alignItems="center"
              style={{ backgroundColor: paper.colors.surface }}
            >
              <Center size={16} shadow={3}>
                {item.icon === "date" ? (
                  <TouchableOpacity onPress={showDatepicker}>
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color={item.color}
                    />
                  </TouchableOpacity>
                ) : (
                  <Icon name={item.icon} type={item.type} color={item.color} />
                )}
              </Center>
              {item.component === "input" ? (
                <TextInput
                  label={item.name}
                  style={{ flexGrow: 1, marginRight: 14 }}
                  mode="outlined"
                  dense
                  value={
                    item.icon === "date"
                      ? new Date(item.value).toDateString()
                      : item.value
                  }
                  onChangeText={(text) => {
                    handeldata(
                      text,
                      item.name === "Phone" ? "ph" : item.name.toLowerCase()
                    );
                  }}
                  disabled={item.disabled}
                  ref={item.ref}
                  onSubmitEditing={() => {
                    item.index !== -1 && list[item.index].ref.current.focus();
                  }}
                  blurOnSubmit={item.blur}
                  returnKeyType={item.keytype}
                  keyboardType={item.keyboardType}
                />
              ) : (
                <Select
                  width="76%"
                  selectedValue={item.value}
                  minWidth={200}
                  placeholder={item.name}
                  onValueChange={(itemValue) =>
                    handeldata(
                      itemValue,
                      item.name === "Martial Status"
                        ? "martial_status"
                        : item.name.toLowerCase()
                    )
                  }
                  _selectedItem={{
                    bg: "cyan.600",
                    endIcon: <CheckIcon size={4} />,
                  }}
                >
                  {item.items.map((value, i) => (
                    <Select.Item key={i} label={value} value={value} />
                  ))}
                </Select>
              )}
              {item.name === "Height" && (
                <Center
                  style={{
                    marginRight: 14,
                  }}
                  shadow={3}
                >
                  <Text style={{ fontSize: 18 }}>ft</Text>
                </Center>
              )}
            </HStack>
          ) : (
            <HStack
              key={i}
              space={3}
              alignItems="center"
              style={{ backgroundColor: paper.colors.surface }}
            >
              <Center shadow={3}>
                <Text>{item?.name}</Text>
              </Center>
              <Center
                style={{ flexGrow: 1, alignItems: "flex-end", marginRight: 14 }}
                shadow={3}
              >
                <TextInput
                  label={item.name}
                  mode="outlined"
                  dense
                  value={
                    item.icon === "date"
                      ? new Date(item.value).toDateString()
                      : item.value
                  }
                  style={{ flexGrow: 1 }}
                  onChangeText={(text) => {
                    handeldata(
                      text,
                      item.name === "Martial Status"
                        ? "martial_status"
                        : item.name === "Phone"
                        ? "ph"
                        : item.name.toLowerCase()
                    );
                  }}
                  disabled={item.disabled}
                  ref={item.ref}
                  onSubmitEditing={() => {
                    i + 1 !== 8 && list[i + 1].ref.current.focus();
                  }}
                  blurOnSubmit={item.blur}
                  returnKeyType={item.keytype}
                  keyboardType={
                    item.icon === "phone" || item.icon === "id-card-alt"
                      ? "numeric"
                      : "default"
                  }
                />
              </Center>
              <Center size={16} shadow={3}>
                {item.icon === "date" ? (
                  <TouchableOpacity onPress={showDatepicker}>
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color={item.color}
                    />
                  </TouchableOpacity>
                ) : (
                  <Icon name={item.icon} type={item.type} color={item.color} />
                )}
              </Center>
            </HStack>
          )
        )}
      </Card>
      <Button
        icon={
          <Icon
            name="save"
            size={18}
            color="#fff"
            style={{ margin: 7 }}
            type="font-awesome-5"
          />
        }
        onPress={() => {
          let data = {
            id: info.user._id,
            user: {
              dob: Info.date,
              email: Info.email,
              pic: Info.pic,
              ph: Info.ph,
              gender: Info.gender,
            },
            information: {
              martial_status: Info.martial_status,
              height: Info.height,
              blood: Info.blood,
              cnic: Info.cnic,
              address: Info.address,
            },
          };
          showModal();
          if (!info.cnic) {
            dispatch(
              ADD_USER_INFORMATION(data, () => {
                hideModal();
              })
            );
          } else {
            dispatch(
              USER_INFORMATION_UPDATE(data, () => {
                hideModal();
              })
            );
          }
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
            style={{ margin: 7 }}
            type="font-awesome"
          />
        }
      />
      <Overlay
        isVisible={visible}
        overlayStyle={{
          borderRadius: 10,
          padding: 20,
          backgroundColor: paper.colors.surface,
        }}
      >
        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ActivityIndicator
            animating={true}
            color="#1de9b6"
            size={50}
            style={{ marginRight: 10 }}
          />
          <Title style={{ alignSelf: "center" }}>Saving...</Title>
        </View>
      </Overlay>
      <Overlay
        isVisible={Info.visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          borderRadius: 10,
          padding: 20,
          backgroundColor: paper.colors.surface,
        }}
      >
        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Icon
            name="close"
            type="evilicon"
            color={paper.colors.onSurface}
            size={32}
            containerStyle={{ alignSelf: "flex-end" }}
            onPress={toggleOverlay}
          />
          <Title style={{ alignSelf: "center" }}>Select Image</Title>
          <Button
            icon={
              <Icon
                name="camera"
                size={20}
                color="#fff"
                style={{ margin: 7 }}
                type="font-awesome-5"
              />
            }
            onPress={pickCamera}
            buttonStyle={{ marginVertical: 10 }}
            title="Upload from Camera"
          />
          <Button
            icon={
              <Icon
                name="md-images"
                type="ionicon"
                size={24}
                color="#03a9f4"
                style={{ margin: 7 }}
              />
            }
            buttonStyle={{ marginVertical: 10 }}
            titleStyle={{ color: "#2196f3" }}
            type="clear"
            title="Open Gallery"
            onPress={pickImage}
          />
        </View>
      </Overlay>
    </ScrollView>
  );
};

export default PersonalInfoInsertion;
