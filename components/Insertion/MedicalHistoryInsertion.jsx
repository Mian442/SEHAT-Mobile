import { useRoute } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { HStack, Center } from "native-base";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Overlay } from "react-native-elements";
import {
  Text,
  TextInput,
  Title,
  useTheme,
  Card,
  Paragraph,
  Divider,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_MEDICAL_HISTORY,
  USER_MEDICAL_HISTORY_UPDATE,
} from "../../redux/actions/UserActions";
import SavingModal from "../SavingModel";
import moment from "moment";
const MedicalHistoryInsertion = ({ id, handelButton }) => {
  const paper = useTheme();
  const [text, setText] = React.useState("");
  const [date, setdate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [visible, setVisible] = useState(false);
  const [picvisible, setPicvisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const { medical_history } = useSelector((state) => state.Language.Lang);
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const dispatch = useDispatch();
  const { params } = useRoute();
  const [med_his_info, setMed_his_info] = useState();
  const initial = {
    disease: "",
    category: "",
    reaction: "",
    treatment: "",
    symptom: [],
    pic: [],
  };
  useEffect(() => {
    if (params.forEdit) {
      setMed_his_info(params.medicalHistory);
      setdate(new Date(params.medicalHistory.date));
    } else {
      setMed_his_info(initial);
    }
  }, []);

  const showModal = () => setSaveVisible(true);
  const hideModal = () => setSaveVisible(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const togglePicRemove = () => {
    setPicvisible(!picvisible);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });
      if (!result.cancelled) {
        let a = { ...med_his_info };
        a.pic.push(result.base64);
        setMed_his_info(a);
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
        let a = { ...med_his_info };
        a.pic.push(result.base64);
        setMed_his_info(a);
      }
    } catch (E) {
      alert(E);
    }
  };

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

  const list = [
    {
      name: medical_history.disease,
      icon: "bacteria-outline",
      type: "material-community",
      color: "#4caf50",
      value: med_his_info?.disease,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...med_his_info };
        a.disease = text;
        setMed_his_info(a);
      },
      index: 1,
    },
    {
      name: medical_history.category,
      icon: "clipboard-pulse",
      type: "material-community",
      color: "#651fff",
      value: med_his_info?.category,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...med_his_info };
        a.category = text;
        setMed_his_info(a);
      },
      index: 2,
    },
    {
      name: medical_history.reaction,
      icon: "face",
      type: "material-community",
      color: "#d500f9",
      value: med_his_info?.reaction,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...med_his_info };
        a.reaction = text;
        setMed_his_info(a);
      },
      index: 3,
    },
    {
      name: medical_history.treatment,
      icon: "solution1",
      type: "antdesign",
      color: "#ff9100",
      value: med_his_info?.treatment,
      ref: createRef(),
      blur: true,
      keytype: "done",
      change: (text) => {
        let a = { ...med_his_info };
        a.treatment = text;
        setMed_his_info(a);
      },
      index: -1,
    },
  ];
  return (
    <View style={[styles.container, { backgroundColor: paper.colors.surface }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ margin: 20 }}>
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
              maximumDate={new Date()}
            />
          )}
          {is_eng ? (
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={[styles.row]}>
                  <Icon
                    name="calendar-alt"
                    size={18}
                    type="font-awesome-5"
                    color="#ff1744"
                  />
                  <Text style={{ paddingLeft: 7, fontSize: 18 }}>
                    Select the Date:
                  </Text>
                  <Text
                    style={{ paddingLeft: 7, fontSize: 18, color: "#009688" }}
                  >
                    {moment(date).format("MMM DD/YYYY")}
                  </Text>
                </View>
                <Divider style={{ height: 2 }} />
              </TouchableOpacity>
              <Card style={{ marginVertical: 15 }}>
                {list.map((item, i) => (
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
                      disabled={item.icon === "date" && true}
                      ref={item.ref}
                      onSubmitEditing={() => {
                        item.index !== -1 &&
                          list[item.index].ref.current.focus();
                      }}
                      blurOnSubmit={item.blur}
                      returnKeyType={item.keytype}
                    />
                  </HStack>
                ))}
              </Card>
              <Card>
                <Card.Title
                  title={medical_history.symptom}
                  left={() => (
                    <Icon
                      name="clipboard-list"
                      type="font-awesome-5"
                      color="#ab003c"
                    />
                  )}
                />

                <Card.Content
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    label={medical_history.symptom}
                    value={text}
                    mode="outlined"
                    style={{ height: 30, flexGrow: 1, marginRight: 7 }}
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={() => {
                      let a = { ...med_his_info };
                      a.symptom.push(text);
                      setText("");
                      setMed_his_info(a);
                    }}
                    blurOnSubmit={false}
                  />
                </Card.Content>
                {med_his_info?.symptom?.length > 0 &&
                  med_his_info?.symptom.map((item, i) => (
                    <Card.Content
                      key={i}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <Paragraph style={{ marginRight: 15 }}>{i + 1}</Paragraph>
                      <Paragraph style={{ flexGrow: 1 }}>{item}</Paragraph>
                      <Icon
                        name="close"
                        type="antdesign"
                        color="#ff1744"
                        onPress={() => {
                          let a = { ...med_his_info };
                          a.symptom = a.symptom.filter(
                            (symtoms) => symtoms !== item
                          );
                          setMed_his_info(a);
                        }}
                      />
                    </Card.Content>
                  ))}
              </Card>
              <Card style={{ marginVertical: 15 }}>
                <Card.Title
                  title={medical_history.pic}
                  left={() => (
                    <Icon name="md-image" type="ionicon" color="#00b0ff" />
                  )}
                  rightStyle={{ margin: 15 }}
                  right={() => (
                    <Icon
                      name="plus"
                      type="antdesign"
                      color="green"
                      onPress={toggleOverlay}
                    />
                  )}
                />
                {med_his_info?.pic?.length > 0 && (
                  <View style={[styles.row, { flexWrap: "wrap" }]}>
                    {med_his_info?.pic.map((item, i) => (
                      <View style={{ margin: 10, height: 100 }} key={i}>
                        <Image
                          source={{ uri: "data:image/jpeg;base64," + item }}
                          style={{ width: 100, height: 100 }}
                          onLongPress={togglePicRemove}
                        />
                        {picvisible && (
                          <TouchableOpacity
                            style={{
                              width: 100,
                              height: 100,
                              display: "flex",
                              justifyContent: "center",
                              position: "absolute",
                              opacity: 0.3,
                              backgroundColor: "black",
                              alignItems: "center",
                            }}
                            onPress={togglePicRemove}
                          >
                            <Icon
                              name="close"
                              type="antdesign"
                              color="#fff"
                              size={28}
                              containerStyle={{ opacity: 1 }}
                              iconStyle={{ opacity: 1 }}
                              onPress={() => {
                                let a = { ...med_his_info };
                                a.pic = a.pic.filter((pic) => pic !== item);
                                setMed_his_info(a);
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}
                {picvisible && (
                  <Button
                    icon={
                      <Icon
                        name="close"
                        size={24}
                        color="#f50057"
                        style={{ paddingRight: 7 }}
                        type="font-awesome"
                      />
                    }
                    titleStyle={{ color: "#f50057" }}
                    type="outline"
                    buttonStyle={{
                      margin: 10,
                      borderColor: "#f50057",
                      borderWidth: 2,
                      width: 120,
                      alignSelf: "center",
                    }}
                    onPress={togglePicRemove}
                    title="cancel"
                  />
                )}
              </Card>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={[styles.row, { justifyContent: "flex-end" }]}>
                  <Text
                    style={{ paddingRight: 7, fontSize: 18, color: "#009688" }}
                  >
                    {moment(date).format("YYYY/DD MMM")}
                  </Text>
                  <Text style={{ paddingRight: 7, fontSize: 18 }}>تاریخ:</Text>

                  <Icon
                    name="calendar-alt"
                    size={28}
                    type="font-awesome-5"
                    color="#ff1744"
                  />
                </View>
                <Divider style={{ height: 2 }} />
              </TouchableOpacity>
              <Card style={{ marginVertical: 15 }}>
                {list.map((item, i) => (
                  <HStack
                    key={i}
                    space={3}
                    alignItems="center"
                    style={{ backgroundColor: paper.colors.surface }}
                  >
                    <TextInput
                      label={item.name}
                      style={{ flexGrow: 1, marginLeft: 14 }}
                      mode="outlined"
                      dense
                      value={item.value}
                      onChangeText={item.change}
                      disabled={item.icon === "date" && true}
                      ref={item.ref}
                      onSubmitEditing={() => {
                        item.index !== -1 &&
                          list[item.index].ref.current.focus();
                      }}
                      blurOnSubmit={item.blur}
                      returnKeyType={item.keytype}
                    />
                    <Center size={16} shadow={3}>
                      <Icon
                        name={item.icon}
                        type={item.type}
                        color={item.color}
                      />
                    </Center>
                  </HStack>
                ))}
              </Card>
              <Card>
                <Card.Title
                  title={medical_history.symptom}
                  titleStyle={{ textAlign: "right" }}
                  rightStyle={{ marginHorizontal: 7 }}
                  right={() => (
                    <Icon
                      name="clipboard-list"
                      type="font-awesome-5"
                      color="#ab003c"
                    />
                  )}
                />

                <Card.Content
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    label={medical_history.symptom}
                    value={text}
                    mode="outlined"
                    style={{ height: 30, flexGrow: 1, marginRight: 7 }}
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={() => {
                      let a = { ...med_his_info };
                      a.symptom.push(text);
                      setText("");
                      setMed_his_info(a);
                    }}
                    blurOnSubmit={false}
                  />
                </Card.Content>
                {med_his_info?.symptom?.length > 0 &&
                  med_his_info?.symptom.map((item, i) => (
                    <Card.Content
                      key={i}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <Icon
                        name="close"
                        type="antdesign"
                        color="#ff1744"
                        onPress={() => {
                          let a = { ...med_his_info };
                          a.symptom = a.symptom.filter(
                            (symtoms) => symtoms !== item
                          );
                          setMed_his_info(a);
                        }}
                        containerStyle={{
                          flexGrow: 0.97,
                          alignItems: "flex-start",
                        }}
                      />
                      <Paragraph>{item}</Paragraph>
                      <Paragraph style={{ marginLeft: 15 }}>{i + 1}</Paragraph>
                    </Card.Content>
                  ))}
              </Card>
              <Card style={{ marginVertical: 15 }}>
                <Card.Title
                  title={medical_history.pic}
                  titleStyle={{ textAlign: "right" }}
                  rightStyle={{ marginHorizontal: 7 }}
                  right={() => (
                    <Icon name="md-image" type="ionicon" color="#00b0ff" />
                  )}
                  leftStyle={{ margin: 15 }}
                  left={() => (
                    <Icon
                      name="plus"
                      type="antdesign"
                      color="green"
                      onPress={toggleOverlay}
                    />
                  )}
                />
                {med_his_info?.pic?.length > 0 && (
                  <View
                    style={[
                      styles.row,
                      { justifyContent: "flex-end", flexWrap: "wrap" },
                    ]}
                  >
                    {med_his_info.pic.map((item, i) => (
                      <View style={{ margin: 10, height: 100 }} key={i}>
                        <Image
                          source={{ uri: "data:image/jpeg;base64," + item }}
                          style={{ width: 100, height: 100 }}
                          onLongPress={togglePicRemove}
                        />
                        {picvisible && (
                          <TouchableOpacity
                            style={{
                              width: 100,
                              height: 100,
                              display: "flex",
                              justifyContent: "center",
                              position: "absolute",
                              opacity: 0.3,
                              backgroundColor: "black",
                              alignItems: "center",
                            }}
                            onPress={togglePicRemove}
                          >
                            <Icon
                              name="close"
                              type="antdesign"
                              color="#fff"
                              size={28}
                              containerStyle={{ opacity: 1 }}
                              iconStyle={{ opacity: 1 }}
                              onPress={() => {
                                let a = { ...med_his_info };
                                a.pic = a.pic.filter((pic) => pic !== item);
                                setMed_his_info(a);
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}
                {picvisible && (
                  <Button
                    icon={
                      <Icon
                        name="close"
                        size={24}
                        color="#f50057"
                        style={{ paddingRight: 7 }}
                        type="font-awesome"
                      />
                    }
                    titleStyle={{ color: "#f50057" }}
                    type="outline"
                    buttonStyle={{
                      margin: 10,
                      borderColor: "#f50057",
                      borderWidth: 2,
                      width: 120,
                      alignSelf: "center",
                    }}
                    onPress={togglePicRemove}
                    title="cancel"
                  />
                )}
              </Card>
            </View>
          )}
          <Overlay
            isVisible={visible}
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
              showModal();
              if (params.forEdit) {
                let data = {
                  id: params.id,
                  data: {
                    date,
                    disease: med_his_info.disease,
                    _id: med_his_info._id,
                    category: med_his_info.category,
                    reaction: med_his_info.reaction,
                    treatment: med_his_info.treatment,
                    symptom: med_his_info.symptom,
                    pic: med_his_info.pic,
                  },
                };
                dispatch(
                  USER_MEDICAL_HISTORY_UPDATE(data, () => {
                    hideModal();
                  })
                );
              } else {
                let data = {
                  id: id,
                  date,
                  ...med_his_info,
                };
                dispatch(
                  ADD_USER_MEDICAL_HISTORY(data, () => {
                    hideModal();
                    handelButton();
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
                  size={18}
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
      </ScrollView>
    </View>
  );
};

export default MedicalHistoryInsertion;

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
});
