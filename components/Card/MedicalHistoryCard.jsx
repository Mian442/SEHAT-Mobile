import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { HStack, Center, VStack } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { Card, FAB, Text, Title, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import NoResult from "../NoResult";

const MedicalHistoryCard = ({ id, medicalHistory, handelButton }) => {
  const navigation = useNavigation();
  const paper = useTheme();
  const { medical_history } = useSelector((state) => state.Language.Lang);
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);

  let List = [
    {
      name: medical_history?.disease,
      icon: "bacteria-outline",
      color: "#4caf50",
      type: "material-community",
      value: medicalHistory?.disease ? medicalHistory?.disease : "N/A",
    },
    {
      name: medical_history.symptom,
      icon: "clipboard-list",
      color: "#ab003c",
      type: "font-awesome-5",
      value:
        medicalHistory?.symptom?.length > 0
          ? medicalHistory?.symptom.map((item, i) => (
              <VStack key={i} style={{}}>
                <Center size={7}>
                  {is_eng ? (
                    <HStack style={{ marginRight: 14 }}>
                      <Center>
                        <Icon
                          name="primitive-dot"
                          size={12}
                          type="octicon"
                          color={paper.colors.text}
                        />
                      </Center>
                      <Center size={16}>
                        <Text>{item}</Text>
                      </Center>
                    </HStack>
                  ) : (
                    <HStack style={{ marginLeft: 14 }}>
                      <Center size={16}>
                        <Text>{item}</Text>
                      </Center>
                      <Center>
                        <Icon
                          name="primitive-dot"
                          size={12}
                          type="octicon"
                          color={paper.colors.text}
                        />
                      </Center>
                    </HStack>
                  )}
                </Center>
              </VStack>
            ))
          : "N/A",
    },
    {
      name: medical_history.category,
      icon: "clipboard-pulse",
      color: "#651fff",
      type: "material-community",
      value: medicalHistory?.category ? medicalHistory?.category : "N/A",
    },
    {
      name: medical_history.treatment,
      icon: "face",
      color: "#d500f9",
      type: "material-community",
      value: medicalHistory?.treatment ? medicalHistory?.treatment : "N/A",
    },
    {
      name: medical_history?.reaction,
      icon: "solution1",
      color: "#ff9100",
      type: "antdesign",
      value: medicalHistory?.reaction ? medicalHistory?.reaction : "N/A",
    },
  ];

  const EnglishDisplay = (item) => {
    return (
      <View>
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface }}
        >
          <Center size={16} shadow={3}>
            <Icon name="calendar-alt" type="font-awesome-5" color="#ff1744" />
          </Center>
          <Center shadow={3}>
            <Title>{moment(medicalHistory?.date).format("MMM DD/YYYY ")}</Title>
          </Center>
          <Center
            style={{ flexGrow: 1, alignItems: "flex-end", marginRight: 14 }}
            shadow={3}
          >
            <Icon
              name="edit-3"
              type="feather"
              color="#009688"
              onPress={() =>
                navigation.push("Edit Medical History", {
                  medicalHistory,
                  forEdit: true,
                  id,
                })
              }
            />
          </Center>
        </HStack>

        <View style={{ marginVertical: 5 }}>
          <Card>
            {List.map((item, i) => (
              <HStack
                key={i}
                space={3}
                alignItems="center"
                style={{ backgroundColor: paper.colors.surface }}
              >
                <Center size={16} shadow={3}>
                  <Icon name={item.icon} type={item.type} color={item.color} />
                </Center>
                <Center shadow={3}>
                  <Text>{item?.name}</Text>
                </Center>
                <Center
                  style={{
                    flexGrow: 1,
                    alignItems: "flex-end",
                    marginRight: 14,
                  }}
                  shadow={3}
                >
                  {item?.value}
                </Center>
              </HStack>
            ))}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Pictures", { pic: medicalHistory?.pic });
              }}
            >
              <HStack
                space={3}
                alignItems="center"
                style={{ backgroundColor: paper.colors.surface }}
              >
                <Center size={16} shadow={3}>
                  <Icon name="md-image" type="ionicon" color="#00b0ff" />
                </Center>
                <Center shadow={3}>
                  <Text>{medical_history.pic}</Text>
                </Center>
                <Center
                  style={{
                    flexGrow: 1,
                    alignItems: "flex-end",
                    marginRight: 14,
                  }}
                  shadow={3}
                >
                  <Text>
                    <Icon
                      name="ios-arrow-forward"
                      type="ionicon"
                      color={paper.colors.text}
                    />
                  </Text>
                </Center>
              </HStack>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  };

  const UrduDisplay = () => {
    return (
      <View>
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface }}
        >
          <Center
            style={{ flexGrow: 1, alignItems: "flex-start", marginLeft: 14 }}
            shadow={3}
          >
            <Icon
              name="edit-3"
              type="feather"
              color="#009688"
              onPress={() =>
                navigation.push("Edit Medical History", {
                  medicalHistory,
                  forEdit: true,
                  id,
                })
              }
            />
          </Center>
          <Center shadow={3}>
            <Title>{moment(medicalHistory?.date).format("MMM DD/YYYY ")}</Title>
          </Center>
          <Center size={16} shadow={3}>
            <Icon name="calendar-alt" type="font-awesome-5" color="#ff1744" />
          </Center>
        </HStack>
        <View style={{ marginVertical: 5 }}>
          <Card>
            {List.map((item, i) => (
              <HStack
                space={3}
                alignItems="center"
                style={{ backgroundColor: paper.colors.surface }}
              >
                <Center
                  style={{
                    flexGrow: 1,
                    alignItems: "flex-start",
                    marginLeft: 14,
                  }}
                  shadow={3}
                >
                  <Text>{item?.value}</Text>
                </Center>
                <Center shadow={3}>
                  <Text>{item?.name}</Text>
                </Center>
                <Center size={16} shadow={3}>
                  <Icon name={item.icon} type={item.type} color={item.color} />
                </Center>
              </HStack>
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Pictures", { pic: medicalHistory?.pic });
              }}
            >
              <HStack
                space={3}
                alignItems="center"
                style={{ backgroundColor: paper.colors.surface }}
              >
                <Center size={16} shadow={3}>
                  <Icon
                    name="ios-arrow-back"
                    type="ionicon"
                    color={paper.colors.text}
                  />
                </Center>
                <Center shadow={3}>
                  <Text>{medical_history.pic}</Text>
                </Center>
                <Center
                  style={{
                    flexGrow: 1,
                    alignItems: "flex-end",
                    marginRight: 14,
                  }}
                  shadow={3}
                >
                  <Text>
                    <Icon name="md-image" type="ionicon" color="#00b0ff" />
                  </Text>
                </Center>
              </HStack>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {medicalHistory ? (
        <>{is_eng ? <EnglishDisplay /> : <UrduDisplay />}</>
      ) : (
        <NoResult />
      )}
      <View style={{ height: 80 }}></View>
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
    right: 0,
    bottom: 0,
  },
});
