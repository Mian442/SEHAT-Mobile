import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import VitalCard from "../../components/Card/VitalCard";
import VitalCardInsertion from "../../components/Insertion/VitalCardInsertion";
import { USER_INFORMATION } from "../../redux/actions/UserActions";

const VitalScreen = () => {
  const list = [1, 2, 34, 5];
  const [edit, setedit] = useState(false);
  const paper = useTheme();
  const navigation = useNavigation();
  const { vital } = useSelector((state) => state.Language.Lang);
  const info = useSelector((state) => state.User.info);
  const user = useSelector((state) => state.User.TOKKEN);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: vital.title });
    navigation.addListener("focus", () => {
      setLoading(false);
      dispatch(
        USER_INFORMATION("vitals", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [info, vital]);
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
        contentContainerStyle={{
          flex: 1,
          backgroundColor: paper.colors.surface,
        }}
      >
        {!edit ? (
          <VitalCard
            id={user?._id}
            vital_info={
              info?.vitals?.length > 0 && info?.vitals[info?.vitals.length - 1]
            }
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
