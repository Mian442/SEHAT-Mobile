import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { HStack, Center } from "native-base";
import { Icon, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Caption, Card, FAB, useTheme, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import NoResult from "../NoResult";
import moment from "moment";

const VitalCard = ({ id, vital_info, handelButton }) => {
  const paper = useTheme();
  const { vital } = useSelector((state) => state.Language.Lang);
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const navigation = useNavigation();
  const list = [
    {
      name: vital.heart_beat,
      backcolor: "#ff1744",
      icon: "heartbeat",
      type: "font-awesome-5",
      value: vital_info?.heart_beat ? vital_info?.heart_beat + " BPM" : "N/A",
    },
    {
      name: vital.blood_pressure,
      backcolor: "#000",
      icon: "stethoscope",
      type: "font-awesome",
      value: vital_info?.blood_pressure
        ? vital_info?.blood_pressure + " mmHg"
        : "N/A",
    },
    {
      name: vital.weight,
      backcolor: "#ffc400",
      icon: "weight",
      type: "font-awesome-5",
      value: vital_info?.weight ? vital_info?.weight + " kg" : "N/A",
    },
    {
      name: vital.blood_glucose,
      backcolor: "#00b0ff",
      icon: "cubes",
      type: "font-awesome",
      value: vital_info?.blood_glucose
        ? vital_info?.blood_glucose + " mg/dl"
        : "N/A",
    },
  ];
  const EnglishDisplay = () => {
    return (
      <View style={{ marginVertical: 7 }}>
        {list.map((item, i) => (
          <Card key={i}>
            <ListItem
              containerStyle={{ backgroundColor: paper.colors.surface }}
              bottomDivider
            >
              <Icon
                name={item.icon}
                type={item.type}
                color={item.backcolor}
                reverse
                reverseColor="#fff"
                size={18}
              />
              <ListItem.Content>
                <ListItem.Title style={{ color: paper.colors.text }}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              <Text>{item.value}</Text>
            </ListItem>
          </Card>
        ))}
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface }}
        >
          <Center shadow={3}>
            <Caption>
              Noted on {new Date(vital_info?.date).toDateString()}
            </Caption>
          </Center>
          <Center
            style={{ flexGrow: 1, alignItems: "flex-end", margin: 7 }}
            shadow={3}
          >
            <Icon
              name="edit-3"
              type="feather"
              color="#009688"
              onPress={() =>
                navigation.push("Edit Vitals", {
                  vitals: vital_info,
                  forEdit: true,
                  id,
                })
              }
            />
          </Center>
        </HStack>
      </View>
    );
  };
  const UrduDisplay = () => {
    return (
      <View style={{ marginVertical: 7 }}>
        {list.map((item, i) => (
          <Card key={i}>
            <ListItem
              containerStyle={{ backgroundColor: paper.colors.surface }}
              bottomDivider
            >
              <Text>{item.value}</Text>
              <ListItem.Content style={{ alignItems: "flex-end" }}>
                <ListItem.Title style={{ color: paper.colors.text }}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              <Icon
                name={item.icon}
                type={item.type}
                color={item.backcolor}
                reverse
                reverseColor="#fff"
                size={18}
              />
            </ListItem>
          </Card>
        ))}
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface }}
        >
          <Center
            style={{ flexGrow: 1, alignItems: "flex-start", margin: 7 }}
            shadow={3}
          >
            <Icon
              name="edit-3"
              type="feather"
              color="#009688"
              onPress={() =>
                navigation.push("Edit Vitals", {
                  vitals: vital_info,
                  forEdit: true,
                  id,
                })
              }
            />
          </Center>
          <Center>
            <Caption shadow={3}>
              Noted on {new Date(vital_info?.date).toDateString()}
            </Caption>
          </Center>
        </HStack>
      </View>
    );
  };
  return (
    <View style={{ margin: 10, flex: 1 }}>
      {vital_info ? (
        <>{is_eng ? <EnglishDisplay /> : <UrduDisplay />}</>
      ) : (
        <NoResult title="No History Available!" />
      )}
      <FAB
        style={styles.fab}
        icon="pencil"
        animated={true}
        color="#fff"
        onPress={handelButton}
      />
    </View>
  );
};

export default VitalCard;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    bottom: 0,
  },
});
