import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Chip, Headline, TextInput, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import {
  DOC_ADD_EXPERTISE,
  GET_DOC_RECORD,
} from "../../redux/actions/DoctorAction";
import { ERROR } from "../../redux/actions/MessageAction";

const ExpertiseScreen = () => {
  const paper = useTheme();
  const [expertise, setExpertise] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.User.TOKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_RECORD("expertise", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
    if (info) {
      setExpertise(info);
    }
  }, [info]);

  const check = () => {
    let a = [...expertise];
    if (a.includes(text)) {
      dispatch(ERROR({ content: "Already Existed!", type: "error" }));
      return false;
    } else if (text === "") {
      return false;
    }
    return true;
  };

  const handelButton = () => {
    let a = [...expertise];
    if (check()) {
      a.push(text);
      a = a.sort();
      setExpertise(a);
      setText("");
      return true;
    }
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
        <ScrollView style={{ margin: 20 }}>
          <Headline>Expertise</Headline>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: 20,
            }}
          >
            {expertise?.map((service, i) => {
              return (
                <Chip
                  key={i}
                  onPress={() => console.log("Pressed" + i)}
                  mode="outlined"
                  onClose={() =>
                    setExpertise(expertise.filter((item) => item !== service))
                  }
                  style={{
                    margin: 7,
                    borderColor: "#f50057",
                    borderWidth: 1.5,
                  }}
                  textStyle={{ color: "#f50057" }}
                >
                  {service}
                </Chip>
              );
            })}
          </View>
          <TextInput
            mode="outlined"
            placeholder="Add Expertise"
            label="Expertise"
            style={{ height: 40, flexGrow: 1 }}
            value={text}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={handelButton}
            blurOnSubmit={true}
          />
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
              if (expertise.length > 0) {
                let data = {
                  id: user._id,
                  expertise,
                };
                setVisible(true);
                dispatch(
                  DOC_ADD_EXPERTISE(data, () => {
                    setVisible(false);
                  })
                );
              }
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

export default ExpertiseScreen;

const styles = StyleSheet.create({});
