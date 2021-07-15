import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import VitalCard from "../../components/Card/VitalCard";
import VitalCardInsertion from "../../components/Insertion/VitalCardInsertion";
import {
  GET_USER_VITALS,
  USER_INFORMATION,
} from "../../redux/actions/UserActions";

const VitalScreen = () => {
  const list = [1, 2, 34, 5];
  const [edit, setedit] = useState(false);
  const paper = useTheme();
  const navigation = useNavigation();
  const { vital } = useSelector((state) => state.Language.Lang);
  const vitals = useSelector((state) => state.User.vitals);
  const user = useSelector((state) => state.User.TOKEN);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: vital.title });
    navigation.addListener("focus", () => {
      setLoading(false);
      dispatch(
        GET_USER_VITALS(user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [vitals, vital]);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          backgroundColor: paper.colors.surface,
        }}
      >
        {!edit ? (
          <VitalCard
            id={user?._id}
            vital_info={vitals !== null && vitals}
            handelButton={() => setedit(!edit)}
          />
        ) : (
          <VitalCardInsertion
            id={user?._id}
            handelButton={() => setedit(!edit)}
          />
        )}
      </ScrollView>
    );
};

export default VitalScreen;

const styles = StyleSheet.create({});
