import { Body, CardItem, Left, Right } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Card, Title, Text, useTheme, Divider, FAB } from "react-native-paper";
import { useSelector } from "react-redux";

const DoctorInformation = ({ info, handelButton }) => {
  const paper = useTheme();
  const user = useSelector((state) => state.User.TOKKEN);
  const list = [
    {
      name: "Specialty",
      icon: "user-md",
      type: "font-awesome",
      color: "#ffc107",
      value: info?.specialty,
    },
    {
      name: "License NO",
      icon: "drivers-license-o",
      type: "font-awesome",
      color: "#00e676",
      value: info?.licenseNo,
    },
    {
      name: "Online Fee",
      icon: "attach-money",
      type: "material",
      color: "#2e7d32",
      value: info?.online_fee,
    },
    {
      name: "Office Fee",
      icon: "money-check-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: info?.office_fee,
    },
    {
      name: "About",
      icon: "info-circle",
      type: "font-awesome",
      color: "#673ab7",
      value: info?.about,
    },
  ];

  const EnglishDisplay = (item) => {
    return (
      <CardItem bordered style={{ backgroundColor: paper.colors.surface }}>
        <Left>
          <Icon name={item.icon} type={item.type} color={item.color} />
        </Left>
        <Body
          style={{
            flexGrow: 4,
            alignSelf: "center",
          }}
        >
          <Text>{item.name}</Text>
        </Body>
        <Right
          style={{
            flexGrow: 6,
            alignSelf: "center",
          }}
        >
          <Text>{item.value}</Text>
        </Right>
      </CardItem>
    );
  };

  const UrduDisplay = (item) => {
    return (
      <CardItem bordered style={{ backgroundColor: paper.colors.surface }}>
        <Left
          style={{
            flexGrow: 6,
            alignSelf: "center",
          }}
        >
          <Text>{item.value}</Text>
        </Left>
        <Body style={{ alignSelf: "center", alignItems: "flex-end" }}>
          <Text style={{ paddingLeft: 7, textAlign: "right" }}>
            {item.name}
          </Text>
        </Body>
        <Right>
          <Icon name={item.icon} type={item.type} color={item.color} />
        </Right>
      </CardItem>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ margin: 10 }}>
        <CardItem
          style={{
            backgroundColor: paper.colors.surface,
          }}
        >
          <Left>
            <Avatar
              rounded
              size="large"
              overlayContainerStyle={{ backgroundColor: "#009688" }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={{}}
              title={user.fname[0]}
              source={
                user?.pic === null
                  ? user?.gender === "Male"
                    ? require(`../../assets/images/man.png`)
                    : require(`../../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + user?.pic }
              }
            />
          </Left>
          <Body style={{ flexGrow: 1, justifyContent: "center" }}>
            <Title>{user?.fname + " " + user?.lname}</Title>
          </Body>
        </CardItem>
      </Card>
      <Card style={{ margin: 10 }}>
        <CardItem
          header
          bordered
          style={{
            backgroundColor: paper.colors.surface,
          }}
        >
          <Card.Title
            title="Doctor Profile"
            titleStyle={{ alignSelf: "center" }}
          />
        </CardItem>
        <Divider />
        {list.map((item, i) => (
          <EnglishDisplay {...item} key={i} />
        ))}
      </Card>
      <FAB
        style={styles.fab}
        icon={"pencil"}
        animated={true}
        color="#fff"
        onPress={handelButton}
      />
    </View>
  );
};

export default DoctorInformation;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 25,
    right: 30,
    bottom: 2,
  },
});
