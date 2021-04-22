import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { Text, Surface, TextInput, Title, useTheme } from "react-native-paper";

const CategoryScreen = () => {
  const [text, setText] = React.useState("");
  const paper = useTheme();
  const navigation = useNavigation();
  const [list, setList] = React.useState([
    {
      name: "Allergist",
      icon: require("../assets/images/Category/nose.png"),
    },
    {
      name: "Andrologist",
      icon: require("../assets/images/Category/gynecologist.png"),
    },
    {
      name: "Anesthesiologist",
      icon: require("../assets/images/Category/syringe.png"),
    },
    {
      name: "Cardiologist",
      icon: require("../assets/images/Category/heart.png"),
    },
    {
      name: "Cardiac Electrophysiologist",
      icon: require("../assets/images/Category/heart-beat.png"),
    },
    {
      name: "Dermatologist",
      icon: require("../assets/images/Category/cracked-skin.png"),
    },
    {
      name: "Emergency Room",
      icon: require("../assets/images/Category/stretcher.png"),
    },
    {
      name: "Endocrinologist",
      icon: require("../assets/images/Category/molecular.png"),
    },
    {
      name: "Epidemiologist",
      icon: require("../assets/images/Category/coronavirus.png"),
    },
    {
      name: "Family Medicine Physician",
      icon: require("../assets/images/Category/hospitalist.png"),
    },
    {
      name: "Gastroenterologist",
      icon: require("../assets/images/Category/intestine.png"),
    },
    {
      name: "Hematologist",
      icon: require("../assets/images/Category/find.png"),
    },
    {
      name: "Immunologist",
      icon: require("../assets/images/Category/virus.png"),
    },
    {
      name: "Infectious Disease",
      icon: require("../assets/images/Category/virus-search.png"),
    },
    {
      name: "Internal Medicine",
      icon: require("../assets/images/Category/digestion.png"),
    },
    {
      name: "Oral Surgeon",
      icon: require("../assets/images/Category/tooth.png"),
    },
    {
      name: "Medical Examiner",
      icon: require("../assets/images/Category/phonendoscope.png"),
    },
    {
      name: "Geneticist",
      icon: require("../assets/images/Category/dna.png"),
    },
    {
      name: "Neonatologist",
      icon: require("../assets/images/Category/baby.png"),
    },
    {
      name: "Nephrologist",
      icon: require("../assets/images/Category/kidney.png"),
    },
    {
      name: "Neurologist",
      icon: require("../assets/images/Category/brain.png"),
    },
    {
      name: "Neuro Surgeon",
      icon: require("../assets/images/Category/brain.png"),
    },
    {
      name: "Gynecologist",
      icon: require("../assets/images/Category/pregnant.png"),
    },
    {
      name: "Ophthalmologist",
      icon: require("../assets/images/Category/eye.png"),
    },
    {
      name: "Orthopedist",
      icon: require("../assets/images/Category/broken-bone.png"),
    },
    {
      name: "ENT Specialist",
      icon: require("../assets/images/Category/listen.png"),
    },
    {
      name: "Pathologist",
      icon: require("../assets/images/Category/chemistry.png"),
    },
    {
      name: "Hepatologist",
      icon: require("../assets/images/Category/liver.png"),
    },
    {
      name: "Vascular Surgeon",
      icon: require("../assets/images/Category/instruments.png"),
    },
    {
      name: "Urologist",
      icon: require("../assets/images/Category/bladder.png"),
    },
    {
      name: "Surgeon",
      icon: require("../assets/images/Category/surgeon.png"),
    },
    {
      name: "Spinal Cord",
      icon: require("../assets/images/Category/spinal-cord.png"),
    },
    {
      name: "Radiologist",
      icon: require("../assets/images/Category/x-rays.png"),
    },
    {
      name: "Plastic Surgeon",
      icon: require("../assets/images/Category/plastic-surgery.png"),
    },
  ]);
  const lists = [
    {
      name: "Allergist",
      icon: require("../assets/images/Category/nose.png"),
    },
    {
      name: "Andrologist",
      icon: require("../assets/images/Category/gynecologist.png"),
    },
    {
      name: "Anesthesiologist",
      icon: require("../assets/images/Category/syringe.png"),
    },
    {
      name: "Cardiologist",
      icon: require("../assets/images/Category/heart.png"),
    },
    {
      name: "Cardiac Electrophysiologist",
      icon: require("../assets/images/Category/heart-beat.png"),
    },
    {
      name: "Dermatologist",
      icon: require("../assets/images/Category/cracked-skin.png"),
    },
    {
      name: "Emergency Room",
      icon: require("../assets/images/Category/stretcher.png"),
    },
    {
      name: "Endocrinologist",
      icon: require("../assets/images/Category/molecular.png"),
    },
    {
      name: "Epidemiologist",
      icon: require("../assets/images/Category/coronavirus.png"),
    },
    {
      name: "Family Medicine Physician",
      icon: require("../assets/images/Category/hospitalist.png"),
    },
    {
      name: "Gastroenterologist",
      icon: require("../assets/images/Category/intestine.png"),
    },
    {
      name: "Hematologist",
      icon: require("../assets/images/Category/find.png"),
    },
    {
      name: "Immunologist",
      icon: require("../assets/images/Category/virus.png"),
    },
    {
      name: "Infectious Disease",
      icon: require("../assets/images/Category/virus-search.png"),
    },
    {
      name: "Internal Medicine",
      icon: require("../assets/images/Category/digestion.png"),
    },
    {
      name: "Oral Surgeon",
      icon: require("../assets/images/Category/tooth.png"),
    },
    {
      name: "Medical Examiner",
      icon: require("../assets/images/Category/phonendoscope.png"),
    },
    {
      name: "Geneticist",
      icon: require("../assets/images/Category/dna.png"),
    },
    {
      name: "Neonatologist",
      icon: require("../assets/images/Category/baby.png"),
    },
    {
      name: "Nephrologist",
      icon: require("../assets/images/Category/kidney.png"),
    },
    {
      name: "Neurologist",
      icon: require("../assets/images/Category/brain.png"),
    },
    {
      name: "Neuro Surgeon",
      icon: require("../assets/images/Category/brain.png"),
    },
    {
      name: "Gynecologist",
      icon: require("../assets/images/Category/pregnant.png"),
    },
    {
      name: "Ophthalmologist",
      icon: require("../assets/images/Category/eye.png"),
    },
    {
      name: "Orthopedist",
      icon: require("../assets/images/Category/broken-bone.png"),
    },
    {
      name: "ENT Specialist",
      icon: require("../assets/images/Category/listen.png"),
    },
    {
      name: "Pathologist",
      icon: require("../assets/images/Category/chemistry.png"),
    },
    {
      name: "Hepatologist",
      icon: require("../assets/images/Category/liver.png"),
    },
    {
      name: "Vascular Surgeon",
      icon: require("../assets/images/Category/instruments.png"),
    },
    {
      name: "Urologist",
      icon: require("../assets/images/Category/bladder.png"),
    },
    {
      name: "Surgeon",
      icon: require("../assets/images/Category/surgeon.png"),
    },
    {
      name: "Spinal Cord",
      icon: require("../assets/images/Category/spinal-cord.png"),
    },
    {
      name: "Radiologist",
      icon: require("../assets/images/Category/x-rays.png"),
    },
    {
      name: "Plastic Surgeon",
      icon: require("../assets/images/Category/plastic-surgery.png"),
    },
  ];

  useEffect(() => {
    setList(
      list.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
    );
  });

  const list_filter = (text) => {
    setList(
      lists.filter(
        (item) => item.name.toLowerCase().search(text.toLowerCase()) !== -1
      )
    );
    setText(text);
  };
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          mode="outlined"
          label="Category"
          placeholder="Search Category"
          dense
          right={<TextInput.Icon name="magnify" color="#9e9e9e" />}
          value={text}
          onChangeText={list_filter}
          style={{ margin: 10, color: "#e0e0e0" }}
        />
        <Title style={{ margin: 10 }}>Total {list.length} Category:</Title>
        <View
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {list.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{ opacity: 1 }}
              onPress={() => {
                navigation.navigate("CategoryList", { name: item.name });
              }}
            >
              <Surface key={i} style={styles.surface}>
                <Image source={item.icon} style={{ width: 50, height: 50 }} />
                <Text style={{ textAlign: "center" }}>{item.name}</Text>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  surface: {
    height: 120,
    width: 130,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 24,
    borderRadius: 15,
  },
});
