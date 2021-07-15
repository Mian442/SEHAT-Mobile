import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { Card, Paragraph, Text } from "react-native-paper";
import moment from "moment";
import { Item } from "native-base";
const AppointmentCard = ({ list, handelButton, role }) => {
  return (
    <View style={styles.container}>
      <Card style={{ borderRadius: 25 }}>
        <Card.Title
          left={() =>
            role === "patient" ? (
              <Avatar
                rounded
                size="large"
                overlayContainerStyle={{ backgroundColor: "#009688" }}
                activeOpacity={0.7}
                containerStyle={{}}
                title={list.fname[0]}
                source={
                  list?.pic === null
                    ? list?.gender === "Male"
                      ? require(`../../assets/images/doctorM.png`)
                      : require(`../../assets/images/doctorM.png`)
                    : { uri: "data:image/jpeg;base64," + list?.pic }
                }
              />
            ) : (
              <Avatar
                rounded
                size="large"
                overlayContainerStyle={{ backgroundColor: "#009688" }}
                activeOpacity={0.7}
                containerStyle={{}}
                title={list.fname[0]}
                source={
                  list?.pic === null
                    ? list?.gender === "Male"
                      ? require(`../../assets/images/man.png`)
                      : require(`../../assets/images/woman.png`)
                    : { uri: "data:image/jpeg;base64," + list?.pic }
                }
              />
            )
          }
          title={list.fname + " " + list.lname}
          subtitle={list.specialty}
          titleStyle={{ paddingLeft: 25 }}
          subtitleStyle={{ paddingLeft: 25 }}
          style={{ margin: 7 }}
          right={() =>
            role === "patient" ? (
              list.status === "pending" ? (
                <TouchableOpacity onPress={handelButton}>
                  <Icon
                    name="delete"
                    type="material-community"
                    size={26}
                    color="#ff1744"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
              ) : (
                <Text>Canceled</Text>
              )
            ) : list.status === "pending" ? null : (
              <Text>Canceled</Text>
            )
          }
        />

        <Divider style={{ height: 2, marginHorizontal: 20 }} />

        <Card.Content
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            color: "#00e676",
          }}
        >
          <Icon name="md-time" size={24} type="ionicon" color="#00e676" />
          <Text style={{ marginRight: 20, paddingLeft: 7 }}>
            {moment(list.time).format("hh:mm A")}
          </Text>
          <Icon
            name="calendar-alt"
            size={24}
            type="font-awesome-5"
            color="#00e676"
          />
          <Paragraph style={{ paddingLeft: 7 }}>{list.day}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: { margin: 10 },
});
