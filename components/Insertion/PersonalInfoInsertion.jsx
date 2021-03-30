import { Body, CardItem, Left, Right } from "native-base";
import React, { createRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Icon, Overlay } from "react-native-elements";
import {
  Card,
  Title,
  Text,
  useTheme,
  Divider,
  TextInput,
  Modal,
  ActivityIndicator,
  Portal,
  Provider,
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
  const iseng = useSelector((state) => state.Language.ISENGLISH);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [Info, setInfo] = useState({
    blood: info?.information?.blood,
    height: info?.information?.height,
    address: info?.information?.address,
    cnic: info?.information?.cnic,
    email: info?.email,
    martial_status: info?.information?.martial_status,
    date: info?.dob,
    image: info?.pic,
    visible: false,
    ph: info?.ph?.toString(),
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
    },
    {
      name: information.cnic,
      icon: "id-card-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: info?.information?.cnic,
      ref: createRef(),
      blur: false,
      keytype: "next",
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
    },
    {
      name: information.height,
      icon: "human-male-height",
      type: "material-community",
      color: "#ff3d00",
      ref: createRef(),
      blur: false,
      keytype: "next",
      value: Info.height,
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
        handeldata(result.base64, "image");
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
        handeldata(result.base64, "image");
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
    <ScrollView>
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
        <CardItem
          style={{
            backgroundColor: paper.colors.surface,
          }}
        >
          <Left>
            <Avatar
              rounded
              size="large"
              overlayContainerStyle={{ backgroundColor: "#009688" }}
              activeOpacity={0.7}
              containerStyle={{}}
              source={
                Info?.image === null
                  ? info.gender === "Male"
                    ? require(`../../assets/images/man.png`)
                    : require(`../../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + Info.image }
              }
            />
          </Left>
          <Body style={{ flexGrow: 1, justifyContent: "center" }}>
            <Text>{info?.fname + " " + info?.lname}</Text>
          </Body>
          <Right style={{ flexGrow: 2 }}>
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
          </Right>
        </CardItem>
      </Card>
      <Card style={{ margin: 10 }}>
        <CardItem
          header
          bordered
          style={{
            backgroundColor: paper.colors.surface,
          }}
        >
          <Card.Title
            title={information.title}
            titleStyle={{ alignSelf: "center" }}
          />
        </CardItem>
        <Divider />
        {list.map((item, i) =>
          iseng ? (
            <CardItem
              key={i}
              bordered
              style={{ backgroundColor: paper.colors.surface }}
            >
              <Left>
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
                  value={
                    item.icon === "date"
                      ? new Date(item.value).toDateString()
                      : item.value
                  }
                  style={{ flexGrow: 1, height: 52, width: 50 }}
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
                  disabled={item.icon === "date" && true}
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
              </Right>
            </CardItem>
          ) : (
            <CardItem
              bordered
              style={{ backgroundColor: paper.colors.surface }}
            >
              <Left>
                <TextInput
                  label={item.name}
                  value=""
                  style={{ flexGrow: 1, height: 52 }}
                  disabled={item.icon === "date" && true}
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
                  ref={item.ref}
                  onSubmitEditing={() => {
                    i + 1 !== 7 && list[i + 1].ref.current.focus();
                  }}
                  blurOnSubmit={item.blur}
                  returnKeyType={item.keytype}
                />
              </Left>
              <Body style={{ alignSelf: "center", alignItems: "flex-end" }}>
                <Text style={{ paddingLeft: 7, textAlign: "right" }}>
                  {item.name}
                </Text>
              </Body>
              <Right>
                {icon === "date" ? (
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
              </Right>
            </CardItem>
          )
        )}
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
            user: {
              dob: Info.date,
              email: Info.email,
              pic: Info.image,
              ph: parseInt(Info.ph),
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
          if (info.information === null) {
            dispatch(
              ADD_USER_INFORMATION(data, () => {
                setTimeout(() => {
                  handelButton();
                }, 1000);

                hideModal();
              })
            );
          } else {
            dispatch(
              USER_INFORMATION_UPDATE(data, () => {
                setTimeout(() => {
                  handelButton();
                }, 1000);
                hideModal();
              })
            );
          }
        }}
        buttonStyle={{ margin: 10, backgroundColor: paper.colors.accent }}
        title="Save"
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
