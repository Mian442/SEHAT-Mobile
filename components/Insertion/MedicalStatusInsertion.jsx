import { useRoute } from "@react-navigation/native";
import React, { createRef, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Image, Overlay } from "react-native-elements";
import { Card, TextInput, Title, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Center } from "native-base";
import {
  ADD_MEDICAL_STATUS,
  USER_MEDICAL_STATUS_UPDATE,
} from "../../redux/actions/UserActions";
import SavingModel from "../SavingModel";

const MedicalHistoryInsertion = ({ id, handelButton }) => {
  const paper = useTheme();
  const [visible, setVisible] = useState(false);
  const [picvisible, setPicvisible] = useState(false);
  const [saveVisible, setSaveVisible] = React.useState(false);
  const { medical_status } = useSelector((state) => state.Language.Lang);
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const dispatch = useDispatch();
  const [med_status, setMed_status] = useState();
  const { params } = useRoute();
  const initial = {
    pic: [],
    medicine: "",
    dosage: "",
    description: "",
    date: new Date(),
    id,
    unit: "",
  };
  useEffect(() => {
    if (params.forEdit) {
      setMed_status(params.data);
    } else {
      setMed_status(initial);
    }
  }, []);
  const list = [
    {
      name: medical_status.medicine,
      icon: "pill",
      type: "material-community",
      color: "#4caf50",
      value: med_status?.medicine,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...med_status };
        a.medicine = text;
        setMed_status(a);
      },
    },
    {
      name: medical_status.dosage,
      icon: "scale",
      type: "material-community",
      color: "#ab003c",
      value: med_status?.dosage,
      ref: createRef(),
      blur: false,
      keytype: "next",
      change: (text) => {
        let a = { ...med_status };
        a.dosage = text;
        setMed_status(a);
      },
    },
    {
      name: medical_status.description,
      icon: "description",
      type: "material",
      color: "#651fff",
      value: med_status?.description,
      ref: createRef(),
      blur: true,
      keytype: "done",
      change: (text) => {
        let a = { ...med_status };
        a.description = text;
        setMed_status(a);
      },
    },
  ];
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
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });
      if (!result.cancelled) {
        let a = { ...med_status };
        a.pic.push(result.base64);
        setMed_status(a);
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
        let a = { ...med_status };
        a.pic.push(result.base64);
        setMed_status(a);
      }
    } catch (E) {
      alert(E);
    }
  };

  return (
    <View style={{ backgroundColor: paper.colors.background, flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {is_eng ? (
            <View>
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
                    {item.name === "Dosage" && (
                      <TextInput
                        label="Unit"
                        style={{ flexGrow: 1, marginRight: 14 }}
                        mode="outlined"
                        dense
                        value={med_status?.unit}
                        onChangeText={(text) => {
                          let a = { ...med_status };
                          a.unit = text;
                          setMed_status(a);
                        }}
                      />
                    )}
                  </HStack>
                ))}
              </Card>
              <Card style={{ marginVertical: 15 }}>
                <Card.Title
                  title={medical_status.pic}
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
                {med_status?.pic.length > 0 && (
                  <View style={[styles.row, { flexWrap: "wrap" }]}>
                    {med_status?.pic.map((item, i) => (
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
                                let a = { ...med_status };
                                a.pic = a.pic.filter((pic) => pic !== item);
                                setMed_status(a);
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
              <Card style={{ marginVertical: 15 }}>
                {list.map((item, i) => (
                  <HStack
                    key={i}
                    space={3}
                    alignItems="center"
                    style={{ backgroundColor: paper.colors.surface }}
                  >
                    {item.name === "خوراک" && (
                      <TextInput
                        label="یونٹ"
                        style={{ flexGrow: 1, marginLeft: 14 }}
                        mode="outlined"
                        dense
                        value={med_status.unit}
                        onChangeText={(text) => {
                          let a = { ...med_status };
                          a.unit = text;
                          setMed_status(a);
                        }}
                      />
                    )}
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
              <Card style={{ marginVertical: 15 }}>
                <Card.Title
                  title={medical_status.pic}
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
                {med_status?.pic.length > 0 && (
                  <View
                    style={[
                      styles.row,
                      { justifyContent: "flex-end", flexWrap: "wrap" },
                    ]}
                  >
                    {med_status?.pic.map((item, i) => (
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
                                let a = { ...med_status };
                                a.pic = a.pic.filter((pic) => pic !== item);
                                setMed_status(a);
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
                size={24}
                color="#fff"
                style={{ paddingRight: 7 }}
                type="font-awesome-5"
              />
            }
            onPress={() => {
              if (params.forEdit) {
                let data = {
                  id: params.id,
                  data: {
                    ...med_status,
                  },
                };
                showModal();
                dispatch(
                  USER_MEDICAL_STATUS_UPDATE(data, () => {
                    hideModal();
                  })
                );
              } else {
                let data = {
                  id: med_status.id,
                  data: {
                    pic: med_status.pic,
                    medicine: med_status.medicine,
                    dosage: med_status.dosage,
                    date: med_status.date,
                    description: med_status.description,
                  },
                };
                showModal();
                dispatch(
                  ADD_MEDICAL_STATUS(data, () => {
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
          <SavingModel visible={saveVisible} />
        </ScrollView>
      </View>
    </View>
  );
};

export default MedicalHistoryInsertion;

const styles = StyleSheet.create({
  container: { margin: 20 },
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
});
