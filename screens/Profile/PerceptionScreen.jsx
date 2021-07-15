import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import PerceptionCard from "../../components/Card/PerceptionCard";
import Loading from "../../components/Loading";
import { GET_USER_PERCEPTION } from "../../redux/actions/UserActions";

const PerceptionScreen = () => {
  const user = useSelector((state) => state.User.TOKEN);
  const info = useSelector((state) => state.User.info);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // navigation.setOptions({ title: "Per" });
    navigation.addListener("focus", () => {
      dispatch(
        GET_USER_PERCEPTION(user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [info]);
  const paper = useTheme();
  if (!loading) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
      <FlatList
        data={info}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.prescription._id}
        renderItem={({ item }) => {
          return (
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
              <PerceptionCard
                list={item}
                handelButton={() => {
                  console.log(item.name, i);
                }}
              />
            </SafeAreaView>
          );
        }}
      />
    </View>
  );
};

export default PerceptionScreen;

const styles = StyleSheet.create({});
