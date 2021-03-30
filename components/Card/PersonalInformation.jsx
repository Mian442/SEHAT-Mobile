import { Body, CardItem, Left, Right } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Card, Title, Text, useTheme, Divider, FAB } from "react-native-paper";
import { useSelector } from "react-redux";

const PersonalInformation = ({ info, handelButton }) => {
  const paper = useTheme();
  const iseng = useSelector((state) => state.Language.ISENGLISH);
  const { information } = useSelector((state) => state.Language.Lang);
  const list = [
    {
      name: information.age,
      icon: "ruler",
      type: "entypo",
      color: "#ffc107",
      value: new Date().getFullYear() - new Date(info?.dob).getFullYear(),
    },
    {
      name: information.DOB,
      icon: "date",
      type: "fontisto",
      color: "#00e676",
      value: new Date(info?.dob).toDateString(),
    },
    {
      name: information.email,
      icon: "md-mail",
      type: "ionicon",
      color: "#9e9e9e",
      value: info?.email,
    },
    {
      name: information.ph,
      icon: "phone",
      type: "font-awesome",
      color: "#2e7d32",
      value: info?.ph,
    },
    {
      name: information.cnic,
      icon: "id-card-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: info?.information?.cnic,
    },
    {
      name: information.address,
      icon: "address-book-o",
      type: "font-awesome",
      color: "#673ab7",
      value: info?.information?.address,
    },
    {
      name: information.gender,
      icon: "genderless",
      type: "font-awesome",
      color: "#009688",
      value: info?.gender,
    },
    {
      name: information.martial_status,
      icon: "human-male-female",
      type: "material-community",
      color: paper.dark ? "#fff" : "#000",
      value: info?.information?.martial_status,
    },
    {
      name: information.height,
      icon: "human-male-height",
      type: "material-community",
      color: "#ff3d00",
      value: info?.information?.height,
    },
    {
      name: information.blood,
      icon: "blood-drop",
      type: "fontisto",
      color: "#ff1744",
      value: info?.information?.blood,
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
              source={
                info?.pic === null
                  ? info?.gender === "Male"
                    ? require(`../../assets/images/man.png`)
                    : require(`../../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + info?.pic }
              }
            />
          </Left>
          <Body style={{ flexGrow: 1, justifyContent: "center" }}>
            <Title>{info?.fname + " " + info?.lname}</Title>
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
            title={information.title}
            titleStyle={{ alignSelf: "center" }}
          />
        </CardItem>
        <Divider />
        {list.map((item, i) =>
          iseng ? (
            <EnglishDisplay {...item} key={i} />
          ) : (
            <UrduDisplay {...item} key={i} />
          )
        )}
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

export default PersonalInformation;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 25,
    right: 30,
    bottom: 0,
  },
});
