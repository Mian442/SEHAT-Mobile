import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Button, Text, Card, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const DoctorCard = ({ list, handelButton }) => {
  const navigation = useNavigation();
  const dollar = [];
  let no = 1;
  if (parseInt(list.online_fee) > 3000) {
    no = 3;
  } else if (
    parseInt(list.online_fee) > 1800 &&
    parseInt(list.online_fee) <= 3000
  ) {
    no = 2;
  } else if (
    parseInt(list.online_fee) > 700 &&
    parseInt(list.online_fee) <= 1800
  ) {
    no = 2;
  }
  for (var i = 0; i < no; i++) {
    dollar.push(
      <Icon
        key={i}
        name="dollar"
        type="fontisto"
        size={14}
        color="#00e676"
        style={{ marginRight: 4 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Card style={[styles.shadow, { borderRadius: 10 }]}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={() => (
            <Avatar
              rounded
              size="large"
              source={
                list.user.pic
                  ? { uri: "data:image/jpeg;base64," + list.user.pic }
                  : list.user.gender === "Male"
                  ? require("../../assets/images/doctorM.png")
                  : require("../../assets/images/doctorF.png")
              }
              onPress={() => {
                navigation.navigate("DoctorProfile", {
                  doctor_id: list._id,
                });
              }}
            />
          )}
          title={
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              onPress={() => {
                navigation.navigate("DoctorProfile", {
                  doctor_id: list._id,
                });
              }}
            >
              {list.user.title} {list.user.fname}
            </Text>
          }
          subtitle={list.specialty}
          titleStyle={{ paddingLeft: 30 }}
          subtitleStyle={{ paddingLeft: 25 }}
          style={{ margin: 10 }}
          right={() => (
            <View>
              <View
                style={[
                  styles.row,
                  {
                    marginRight: 20,
                  },
                ]}
              >
                <Icon
                  name="primitive-dot"
                  type="octicon"
                  size={22}
                  color={list.status === "online" ? "#00e676" : "#ff1744"}
                  style={{ marginRight: 4 }}
                />
                <Text style={{ fontSize: 18 }}>{list.status}</Text>
              </View>
            </View>
          )}
        />
        <Card.Content>
          <View
            style={[
              styles.row,
              {
                padding: 8,
                borderRadius: 7,
                backgroundColor: "#9e9e9e",
                justifyContent: "space-evenly",
                margin: 10,
              },
            ]}
          >
            <View style={styles.row}>
              <Icon
                name="md-ribbon"
                type="ionicon"
                size={24}
                color="#00e676"
                style={{ marginRight: 4 }}
              />
              <Text>Experience: {list.year}</Text>
            </View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                navigation.navigate("Chat", {
                  name: list.user.fname,
                  id: list._id,
                  role: list.user.role,
                  from: "Card",
                });
              }}
            >
              <Icon
                name="chat"
                type="material"
                size={24}
                color="#3f51b5"
                style={{ marginRight: 4 }}
              />
              <Text>Ask</Text>
            </TouchableOpacity>
            <View style={[styles.row]}>
              <Text
                style={{ fontSize: 16, marginRight: 7 }}
                allowFontScaling={true}
              >
                Price:
              </Text>
              {dollar.map((item) => item)}
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ alignSelf: "flex-end", marginRight: 18 }}>
          <Button
            mode="contained"
            onPress={handelButton}
            icon={(props) => (
              <Icon
                name="calendar-alt"
                type="font-awesome-5"
                {...props}
                style={{ marginRight: 7 }}
              />
            )}
            color="#009688"
            labelStyle={{ color: "white" }}
            uppercase
          >
            Appointment
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
