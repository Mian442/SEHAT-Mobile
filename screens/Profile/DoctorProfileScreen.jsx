import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DoctorInformation from "../../components/Card/DoctorInformation";
import DoctorInfoInsertion from "../../components/Insertion/DoctorInfoInsertion";
import Loading from "../../components/Loading";
import { GET_DOC_SINGLE_INFORMATION } from "../../redux/actions/DoctorAction";

const InfoScreen = () => {
  const paper = useTheme();
  const navigation = useNavigation();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.User.TOKKEN);
  const info = useSelector((state) => state.User.info);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_SINGLE_INFORMATION(user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [info]);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          {!edit ? (
            <DoctorInformation
              info={info}
              handelButton={() => setEdit(!edit)}
            />
          ) : (
            <DoctorInfoInsertion
              info={info}
              handelButton={() => setEdit(!edit)}
            />
          )}
        </ScrollView>
      </View>
    );
};

export default InfoScreen;
