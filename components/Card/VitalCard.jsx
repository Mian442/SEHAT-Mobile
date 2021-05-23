import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Caption, Card, FAB, useTheme, Title } from "react-native-paper";
import { useSelector } from "react-redux";

const VitalCard = ({ id, vital_info, handelButton }) => {
  const paper = useTheme();
  const { vital } = useSelector((state) => state.Language.Lang);
  const iseng = useSelector((state) => state.Language.ISENGLISH);
  const navigation = useNavigation();
  console.log(vital_info);
  const list = [
    {
      name: vital.heart_beat,
      backcolor: "#ff1744",
      icon: "heartbeat",
      type: "font-awesome-5",
      value: vital_info?.heart_beat,
    },
    {
      name: vital.blood_pressure,
      backcolor: "#000",
      icon: "stethoscope",
      type: "font-awesome",
      value: vital_info?.blood_pressure,
    },
    {
      name: vital.weight,
      backcolor: "#ffc400",
      icon: "weight",
      type: "font-awesome-5",
      value: vital_info?.weight,
    },
    {
      name: vital.blood_glucose,
      backcolor: "#00b0ff",
      icon: "cubes",
      type: "font-awesome",
      value: vital_info?.blood_glucose,
    },
  ];
  const EnglishDisplay = () => {
    return (
      <>
        <View>
          <TouchableOpacity
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
            onPress={() =>
              navigation.push("Edit Vitals", {
                vitals: vital_info,
                forEdit: true,
                id,
              })
            }
          >
            <Title style={{ marginRight: 7 }}>Update Vitals</Title>
            <Icon name="edit" size={28} type="font-awesome-5" color="#009688" />
          </TouchableOpacity>
        </View>
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
                {/* <ListItem.Subtitle style={{ color: paper.colors.text }}>
                  {item.name}
                </ListItem.Subtitle> */}
              </ListItem.Content>
              <Text>{item.value}</Text>
            </ListItem>
          </Card>
        ))}
        <Caption>Noted on {new Date(vital_info?.date).toDateString()}</Caption>
      </>
    );
  };
  const UrduDisplay = () => {
    return (
      <>
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
                <ListItem.Subtitle style={{ color: paper.colors.text }}>
                  {item.name}
                </ListItem.Subtitle>
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
        <Caption style={{ alignSelf: "flex-end", marginRight: 7 }}>
          Noted on {new Date(vital_info?.date).toDateString()}
        </Caption>
      </>
    );
  };
  return (
    <View style={{ margin: 10, flex: 1 }}>
      {vital_info ? (
        <>{iseng ? <EnglishDisplay /> : <UrduDisplay />}</>
      ) : (
        <Title style={{ textAlign: "center" }}>No History Available!</Title>
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
