import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Title, useTheme } from "react-native-paper";

const RecordScreen = () => {
  const paper = useTheme();
  const navigation = useNavigation();
  const list = [
    {
      name: "Services",
      navigation: "Services",
      icon: "stethoscope",
      type: "font-awesome-5",
      color: "#00bcd4",
    },
    {
      name: "Expertise",
      navigation: "Expertise",
      icon: "md-school",
      type: "ionicon",
      color: "#ffc107",
    },

    {
      name: "Qualification",
      navigation: "Qualification",
      icon: "scroll",
      type: "font-awesome-5",
      color: "#ffa726",
    },
    {
      name: "Publication",
      navigation: "Publication",
      icon: "pen-fancy",
      type: "font-awesome-5",
      color: "#000",
    },
    {
      name: "Achievements",
      navigation: "Achievements",
      icon: "trophy",
      type: "font-awesome-5",
      color: "#ff5722",
    },
    {
      name: "Working Experience",
      navigation: "Work Experience",
      icon: "certificate",
      type: "material-community",
      color: "#2196f3",
    },
  ];
  return (
    <View style={[styles.container, { backgroundColor: paper.colors.surface }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {list.map((item, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate(item.navigation);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Icon
              name={item.icon}
              type={item.type}
              color="#fff"
              size={36}
              style={{
                backgroundColor: item.color,
                padding: 10,
                borderRadius: 8,
                width: 80,
                height: 60,
              }}
            />
            <Title>{item.name}</Title>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({ container: { flex: 1 } });
