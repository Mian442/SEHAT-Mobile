import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon, Image, ListItem } from "react-native-elements";
import { Text, Subheading, Surface, Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
export default function HomeScreen() {
  const navigation = useNavigation();
  const vitals = useSelector((state) => state.User.vitals);
  const paper = useTheme();
  const list = [
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
  ];
  const record = [
    {
      name: "blood-drop",
      type: "fontisto",
      color: "#ff1744",
      text: vitals
        ? vitals.blood_pressure
          ? vitals.blood_pressure + " mmHg"
          : "N/A"
        : "N/A",
      texttype: "Blood Pressure",
    },
    // {
    //   name: "thermometer-3",
    //   type: "font-awesome",
    //   color: "#ffc107",
    //   text: "N/A",
    //   texttype: "Temperature",
    // },
    {
      name: "heart",
      type: "fontisto",
      color: "#f50057",
      text: vitals
        ? vitals.heart_beat
          ? vitals.heart_beat + " BPM"
          : "N/A"
        : "N/A",
      texttype: "Heart Beat",
    },
    {
      name: "scale-bathroom",
      type: "material-community",
      color: "#2196f3",
      text: vitals ? (vitals.weight ? vitals.weight + " kg" : "N/A") : "N/A",
      texttype: "Weight",
    },
    {
      name: "cubes",
      type: "font-awesome-5",
      color: "#009688",
      text: vitals
        ? vitals.blood_glucose
          ? vitals.blood_glucose + " mg/dl"
          : "N/A"
        : "N/A",
      texttype: "Blood Glucose",
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={[
        { backgroundColor: paper.colors.background, flex: 1 },
      ]}
    >
      <View style={{ margin: 14 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Doctor");
            }}
          >
            <Surface style={[styles.surface, styles.shadow]}>
              <Image
                source={require("../assets/images/doctor(3).png")}
                style={{ width: 80, height: 80 }}
              />
              <Text>Find Doctor!</Text>
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Category");
            }}
          >
            <Surface style={[styles.surface, styles.shadow]}>
              <Image
                source={require("../assets/images/stethoscope.png")}
                style={{ width: 80, height: 80 }}
              />
              <Text>Consult Now!</Text>
            </Surface>
          </TouchableOpacity>
        </View>
        {/* <Surface
          style={[
            styles.shadow,
            { padding: 8, borderRadius: 10, marginBottom: 30 },
          ]}
        >
          <Title>Top Specialist</Title>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              navigation.navigate("DoctorProfile", {
                name: "Dr. Saif",
                doctor_id: "sdfss0sd7f0s8d",
              });
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: "#ffecb3",
                borderRadius: 10,
                height: 70,
              }}
            >
              <Avatar source={require("../assets/images/doctorM.png")} />
              <ListItem.Content>
                <ListItem.Title>Dr. Saif</ListItem.Title>
                <ListItem.Subtitle>
                  <View
                    style={{
                      marginLeft: 30,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Subheading style={{ fontSize: 12, color: "#000" }}>
                      Specialist
                    </Subheading>
                    <Text style={{ marginLeft: 7, color: "#000" }}>4.5</Text>
                    <Icon
                      name="star"
                      type="antdesign"
                      color="#ffeb3b"
                      size={16}
                    />
                  </View>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron size={34} color="#9e9e9e" />
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              navigation.navigate("DoctorProfile", {
                name: "Dr. Rose",
                doctor_id: "sdfss0sd7f0s8d",
              });
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: "#e1bee7",
                borderRadius: 10,
                height: 70,
              }}
            >
              <Avatar source={require("../assets/images/doctorF.png")} />
              <ListItem.Content>
                <ListItem.Title>Dr. Rose</ListItem.Title>
                <ListItem.Subtitle>
                  <View
                    style={{
                      marginLeft: 30,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Subheading style={{ fontSize: 12, color: "#000" }}>
                      Specialist
                    </Subheading>
                    <Text style={{ marginLeft: 7, color: "#000" }}>4.5</Text>
                    <Icon
                      name="star"
                      type="antdesign"
                      color="#ffeb3b"
                      size={16}
                    />
                  </View>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron size={34} color="#9e9e9e" />
            </ListItem>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              navigation.navigate("DoctorProfile", {
                name: "Dr. Adnan",
                doctor_id: "sdfss0sd7f0s8d",
              });
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: "#ffecb3",
                borderRadius: 10,
                height: 70,
              }}
            >
              <Avatar source={require("../assets/images/doctorM.png")} />
              <ListItem.Content>
                <ListItem.Title>Dr. Adnan</ListItem.Title>
                <ListItem.Subtitle>
                  <View
                    style={{
                      marginLeft: 30,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Subheading style={{ fontSize: 12, color: "#000" }}>
                      Specialist
                    </Subheading>
                    <Text style={{ marginLeft: 7, color: "#000" }}>4.5</Text>
                    <Icon
                      name="star"
                      type="antdesign"
                      color="#ffeb3b"
                      size={16}
                    />
                  </View>
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron size={34} color="#9e9e9e" />
            </ListItem>
          </TouchableOpacity>
        </Surface>
        <Surface
          style={[
            styles.shadow,
            { padding: 8, borderRadius: 10, marginBottom: 30 },
          ]}
        >
          <Title>Top Category</Title>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {list.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{ margin: 20 }}
                onPress={() => {
                  navigation.navigate("List", { name: item.name });
                }}
              >
                <Surface
                  style={{
                    padding: 8,
                    height: 140,
                    width: 140,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 4,
                    borderRadius: 15,
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                  <Text style={{ textAlign: "center" }}>{item.name}</Text>
                </Surface>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Surface>
         */}
        <Surface
          style={[
            styles.shadow,
            { padding: 8, borderRadius: 10, marginBottom: 30 },
          ]}
        >
          <Title>Current Record</Title>
          <>
            <View
              style={{
                display: "flex",
              }}
            >
              {record.map((item, i) => (
                <View
                  key={i}
                  style={{
                    margin: 15,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    name={item.name}
                    type={item.type}
                    color="#fff"
                    size={28}
                    style={{
                      backgroundColor: item.color,
                      padding: 8,
                      borderRadius: 8,
                      width: 50,
                    }}
                  />
                  <Text style={{ marginHorizontal: 10 }}>{item.texttype}</Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      flexGrow: 1,
                      textAlign: "right",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  surface: {
    padding: 8,
    height: 120,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    borderRadius: 15,
  },
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
  },
});
