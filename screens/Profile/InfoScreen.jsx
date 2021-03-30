import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import PersonalInformation from "../../components/Card/PersonalInformation";
import PersonalInfoInsertion from "../../components/Insertion/PersonalInfoInsertion";
import { USER_INFORMATION } from "../../redux/actions/UserActions";

const InfoScreen = () => {
  const paper = useTheme();
  const navigation = useNavigation();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { information } = useSelector((state) => state.Language.Lang);
  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: information.title });
    navigation.addListener("focus", () => {
      dispatch(
        USER_INFORMATION("information", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [information, info]);

  if (!loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: paper.colors.surface,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          animating={true}
          color="#1de9b6"
          size={50}
          style={{}}
        />
      </View>
    );
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!edit ? (
            <PersonalInformation
              info={info}
              handelButton={() => setEdit(!edit)}
            />
          ) : (
            <PersonalInfoInsertion
              info={info}
              handelButton={() => setEdit(!edit)}
            />
          )}
        </ScrollView>
      </View>
    );
};

export default InfoScreen;
