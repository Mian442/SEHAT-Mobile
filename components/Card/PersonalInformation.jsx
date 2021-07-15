import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { Card, Title, Text, useTheme, FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { HStack, Center } from "native-base";
const PersonalInformation = ({ info, handelButton }) => {
  const paper = useTheme();
  const is_eng = useSelector((state) => state.Language.IS_ENGLISH);
  const { information } = useSelector((state) => state.Language.Lang);
  const list = [
    {
      name: information.age,
      icon: "ruler",
      type: "entypo",
      color: "#ffc107",
      value: new Date().getFullYear() - new Date(info?.user.dob).getFullYear(),
    },
    {
      name: information.DOB,
      icon: "date",
      type: "fontisto",
      color: "#00e676",
      value: new Date(info?.user.dob).toDateString(),
    },
    {
      name: information.email,
      icon: "md-mail",
      type: "ionicon",
      color: "#9e9e9e",
      value: info?.user.email,
    },
    {
      name: information.ph,
      icon: "phone",
      type: "font-awesome",
      color: "#2e7d32",
      value: info?.user.ph,
    },
    {
      name: information.cnic,
      icon: "id-card-alt",
      type: "font-awesome-5",
      color: "#cddc39",
      value: info?.cnic ? info?.cnic : "N/A",
    },
    {
      name: information.address,
      icon: "address-book-o",
      type: "font-awesome",
      color: "#673ab7",
      value: info?.address ? info?.address : "N/A",
    },
    {
      name: information.gender,
      icon: "genderless",
      type: "font-awesome",
      color: "#009688",
      value: info?.user.gender,
    },
    {
      name: information.martial_status,
      icon: "human-male-female",
      type: "material-community",
      color: paper.dark ? "#fff" : "#000",
      value: info?.martial_status ? info?.martial_status : "N/A",
    },
    {
      name: information.height,
      icon: "human-male-height",
      type: "material-community",
      color: "#ff3d00",
      value: info?.height ? info?.height : "N/A",
    },
    {
      name: information.blood,
      icon: "blood-drop",
      type: "fontisto",
      color: "#ff1744",
      value: info?.blood ? info?.blood : "N/A",
    },
  ];

  const EnglishDisplay = (item) => {
    return (
      <HStack
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
          style={{ flexGrow: 1, alignItems: "flex-end", marginRight: 14 }}
          shadow={3}
        >
          <Text>{item?.value}</Text>
        </Center>
      </HStack>
    );
  };

  const UrduDisplay = (item) => {
    return (
      <HStack
        space={3}
        alignItems="center"
        style={{ backgroundColor: paper.colors.surface }}
      >
        <Center
          style={{ flexGrow: 1, alignItems: "flex-start", marginLeft: 14 }}
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ margin: 10 }}>
        <HStack
          space={3}
          alignItems="center"
          style={{ backgroundColor: paper.colors.surface, padding: 10 }}
        >
          <Center shadow={3}>
            <Avatar
              rounded
              size="large"
              overlayContainerStyle={{ backgroundColor: "#009688" }}
              activeOpacity={0.7}
              containerStyle={{}}
              source={
                info?.user.pic === null
                  ? info?.user.gender === "Male"
                    ? require(`../../assets/images/man.png`)
                    : require(`../../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + info?.user.pic }
              }
            />
          </Center>
          <Center shadow={3}>
            <Title>{info?.user.fname + " " + info?.user.lname}</Title>
          </Center>
        </HStack>
      </Card>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title={information.title}
          titleStyle={{ alignSelf: "center" }}
        />
        <Divider />
        {list.map((item, i) =>
          is_eng ? (
            <EnglishDisplay {...item} key={i} />
          ) : (
            <UrduDisplay {...item} key={i} />
          )
        )}
      </Card>
      <View style={{ height: 80 }}></View>
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
    right: 30,
    bottom: 10,
  },
});
