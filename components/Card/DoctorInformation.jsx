import { HStack, Center } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Card, Title, Text, useTheme, Divider, FAB } from "react-native-paper";
import { useSelector } from "react-redux";

const DoctorInformation = ({ info, handelButton }) => {
  const paper = useTheme();
  const user = useSelector((state) => state.User.TOKEN);
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
            <Title>{info?.user.name}</Title>
          </Center>
        </HStack>
      </Card>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title="Doctor Profile"
          titleStyle={{ alignSelf: "center" }}
        />
        <Divider />
        {list.map((item, i) => (
          <EnglishDisplay {...item} key={i} />
        ))}
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

export default DoctorInformation;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 10,
  },
});
