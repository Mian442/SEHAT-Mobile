import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import PerceptionCard from "../../components/Card/PerceptionCard";

const PerceptionScreen = () => {
  const paper = useTheme();
  const list = [
    {
      name: "abc",
      specialist: "special",
      gender: "female",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q1",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "male",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q2",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "female",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q3",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "female",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q4",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "male",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q5",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "female",
      des: { title: "Prescription", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q6",
    },
    {
      name: "abc",
      specialist: "special",
      gender: "male",
      des: { title: "Perception", content: "sasdas" },
      doctor_id: "dfjsldfjskj2q7+",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.doctor_id}
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
