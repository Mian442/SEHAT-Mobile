import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Title, useTheme } from "react-native-paper";
import DoctorCard from "./Card/DoctorCard";
import Faker from "faker";

const List = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const paper = useTheme();
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);

  const list = [];
  for (var i = 0; i < 15; i++) {
    list.push({
      name: Faker.name.prefix() + " " + Faker.name.firstName(),
      specialist: "special",
      gender: Faker.name.gender(),
      img: Faker.image.people(),
      year: parseInt((Faker.random.number() / 10000).toFixed(0)),
      amount: parseInt((Faker.random.number() / 10).toFixed(0)),
      status: Faker.random.boolean(),
      doctor_id: "dfjsldfjskj2q",
    });
  }
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
      <ScrollView>
        <View style={{ margin: 14 }}>
          <Title style={{ margin: 10 }}>Doctors</Title>
          {list.map((item, i) => (
            <DoctorCard
              list={item}
              handelButton={() => {
                navigation.navigate("BookAppointment", {
                  doctor_id: item.doctor_id,
                  name: item.name,
                });
              }}
              key={i}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default List;
