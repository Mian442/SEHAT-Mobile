import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Faker from "faker";
import DoctorCard from "./Card/DoctorCard";
import { Title, TextInput, useTheme, Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import {
  GET_DOC_ALL_INFORMATION,
  GET_SPECIALTY,
} from "../redux/actions/DoctorAction";
const CategoryList = (props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const paper = useTheme();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const doctors = useSelector((state) => state.Doctor.category_list);
  const handlerGetDoctors = () => {
    setLoading(false);
    navigation.setOptions({ headerTitle: params.name });
    dispatch(
      GET_SPECIALTY(params.name, () => {
        setTimeout(() => {
          setLoading(true);
        }, 3000);
      })
    );
  };
  useEffect(() => {
    navigation.addListener("focus", handlerGetDoctors);
  }, []);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: 14 }}>
            <TextInput
              mode="outlined"
              label="Find Doctor"
              placeholder="Search Doctor"
              dense
              right={<TextInput.Icon name="magnify" color="#9e9e9e" />}
              value={text}
              onChangeText={(text) => setText(text)}
              style={{ margin: 10, color: "#e0e0e0" }}
            />
            <Title style={{ margin: 10 }}>Doctor's</Title>
            {doctors.map((item, i) => (
              <DoctorCard
                list={item}
                handelButton={() => {
                  navigation.navigate("BookAppointment", {
                    _id: item._id,
                    fname: item.user.fname,
                    lname: item.user.lname,
                    pic: item.user.pic,
                    gender: item.user.gender,
                    specialty: item.specialty,
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

export default CategoryList;

const styles = StyleSheet.create({});
