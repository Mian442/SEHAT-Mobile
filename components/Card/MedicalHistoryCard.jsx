import { useNavigation } from "@react-navigation/native";
import { Body, CardItem, Left, Right } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, Card, FAB, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const MedicalHistoryCard = ({ id, medicalHistory, handelButton }) => {
  const navigation = useNavigation();
  const paper = useTheme();
  const { medical_history } = useSelector((state) => state.Language.Lang);
  const iseng = useSelector((state) => state.Language.ISENGLISH);

  const EnglishDisplay = () => {
    return (
      <View>
        <View style={[styles.row]}>
          <Icon
            name="calendar-alt"
            size={28}
            type="font-awesome-5"
            color="#ff1744"
          />
          <Text style={{ paddingLeft: 7, fontSize: 24, flexGrow: 3 }}>
            {new Date(medicalHistory?.date).toDateString()}
          </Text>
          <Icon
            name="edit"
            size={28}
            type="font-awesome-5"
            color="#009688"
            onPress={() =>
              navigation.push("Edit Medical History", {
                medicalHistory,
                forEdit: true,
                id,
              })
            }
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Card>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Icon
                  name="bacteria-outline"
                  type="material-community"
                  color="#4caf50"
                />
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history?.disease}
                </Text>
              </Left>
              <Right>
                <Text>{medicalHistory?.disease}</Text>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Icon
                  name="clipboard-list"
                  type="font-awesome-5"
                  color="#ab003c"
                />
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.symptom}
                </Text>
              </Left>
              <Right>
                {medicalHistory?.symptom &&
                  medicalHistory?.symptom.map((item, i) => (
                    <View style={styles.row} key={i}>
                      <Text style={{ paddingRight: 7 }}>{item}</Text>
                      <Icon
                        name="primitive-dot"
                        size={12}
                        type="octicon"
                        color={paper.colors.text}
                      />
                    </View>
                  ))}
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Icon
                  name="clipboard-pulse"
                  type="material-community"
                  color="#651fff"
                />
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.category}
                </Text>
              </Left>
              <Right>
                <Text>{medicalHistory?.category}</Text>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Icon name="face" type="material-community" color="#d500f9" />
                <Text style={{ paddingLeft: 7 }}>Reaction</Text>
              </Left>
              <Right>
                <Text>{medicalHistory?.reaction}</Text>
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Icon name="solution1" type="antdesign" color="#ff9100" />
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.treatment}
                </Text>
              </Left>
              <Right>
                <Text>{medicalHistory?.treatment}</Text>
              </Right>
            </CardItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Pictures", { pic: medicalHistory?.pic });
              }}
            >
              <CardItem
                bordered
                style={{ backgroundColor: paper.colors.background }}
              >
                <Left>
                  <Icon name="md-image" type="ionicon" color="#00b0ff" />
                </Left>
                <Body style={{ flexGrow: 8 }}>
                  <Text>{medical_history.pic}</Text>
                </Body>
                <Right>
                  <Icon
                    name="ios-arrow-forward"
                    type="ionicon"
                    color={paper.colors.text}
                  />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  };

  const UrduDisplay = () => {
    return (
      <View>
        <View
          style={[
            styles.row,
            { borderBottomWidth: 1, borderBottomColor: paper.colors.text },
          ]}
        >
          <Text
            style={{
              paddingRight: 7,
              fontSize: 24,
              flexGrow: 3,
              textAlign: "right",
            }}
          >
            {new Date(medicalHistory?.date).toDateString()}
          </Text>
          <Icon
            name="calendar-alt"
            size={28}
            type="font-awesome-5"
            color="#ff1744"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Card>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Text>{medicalHistory?.disease}</Text>
              </Left>
              <Body style={{ alignItems: "flex-end" }}>
                <Text>{medical_history.disease}</Text>
              </Body>
              <Right>
                <Icon
                  name="bacteria-outline"
                  type="material-community"
                  color="#4caf50"
                />
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                {medicalHistory?.symptom &&
                  medicalHistory?.symptom.map((item, i) => (
                    <View style={styles.row} key={i}>
                      <Icon
                        name="primitive-dot"
                        size={12}
                        type="octicon"
                        color={paper.colors.text}
                      />
                      <Text style={{ paddingLeft: 7 }}>{item}</Text>
                    </View>
                  ))}
              </Left>
              <Body
                style={{ alignItems: "flex-end", justifyContent: "center" }}
              >
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.symptom}
                </Text>
              </Body>
              <Right>
                <Icon
                  name="clipboard-list"
                  type="font-awesome-5"
                  color="#ab003c"
                />
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Text>{medicalHistory?.symptom}</Text>
              </Left>
              <Body style={{ alignItems: "flex-end" }}>
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.category}
                </Text>
              </Body>
              <Right>
                <Icon
                  name="clipboard-pulse"
                  type="material-community"
                  color="#651fff"
                />
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Text>{medicalHistory?.reaction}</Text>
              </Left>
              <Body style={{ alignItems: "flex-end" }}>
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.reaction}
                </Text>
              </Body>
              <Right>
                <Icon name="face" type="material-community" color="#d500f9" />
              </Right>
            </CardItem>
            <CardItem style={{ backgroundColor: paper.colors.background }}>
              <Left>
                <Text>{medicalHistory?.treatment}</Text>
              </Left>
              <Body style={{ alignItems: "flex-end" }}>
                <Text style={{ paddingLeft: 7 }}>
                  {medical_history.treatment}
                </Text>
              </Body>
              <Right>
                <Icon name="solution1" type="antdesign" color="#ff9100" />
              </Right>
            </CardItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Pictures", { pic: medicalHistory?.pic });
              }}
            >
              <CardItem
                bordered
                style={{ backgroundColor: paper.colors.background }}
              >
                <Left>
                  <Icon
                    name="ios-arrow-back"
                    type="ionicon"
                    color={paper.colors.text}
                  />
                </Left>
                <Body style={{ alignItems: "flex-end" }}>
                  <Text>{medical_history.pic}</Text>
                </Body>
                <Right>
                  <Icon name="md-image" type="ionicon" color="#00b0ff" />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {iseng ? <EnglishDisplay /> : <UrduDisplay />}
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

export default MedicalHistoryCard;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    bottom: 0,
  },
});
