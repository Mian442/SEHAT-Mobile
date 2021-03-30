import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Text, FAB, useTheme, Title, Subheading } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "native-base";
import { GET_DOC_ALL_INFORMATION } from "../redux/actions/DoctorAction";
import Loading from "../components/Loading";
const socket = io("http://192.168.8.100:3000/chat");
const ChatScreen = () => {
  const paper = useTheme();
  const [receive, setReceive] = useState([]);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [scrollRef, setScrollRef] = useState();
  const User = useSelector((state) => state.User.TOKKEN);
  const doctors = useSelector((state) => state.Doctor.allDoctor);
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const doc = () => {
    let d = doctors.filter((i) => i._id === params.id);
    // setStatus(d[0].status);
    return d[0];
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // if (doctors.length === 0) {
    //   dispatch(
    //     GET_DOC_ALL_INFORMATION(() => {
    //       setTimeout(() => {
    //         setLoading(true);
    //       }, 3000);
    //     })
    //   );
    // }
    socket.on("receive", (msg) => {
      // if(msg.)
      // if (receive.length === 0) {

      // }

      setReceive([...receive, msg]);
      console.log("o", receive.length);
      setText("");
      scrollRef?.scrollToEnd({ animated: true });
    });
    // return () => socket.close();
  }, [receive]);
  // if (!loading) {
  //   return <Loading />;
  // } else
  return (
    <View
      style={[styles.container, { backgroundColor: paper.colors.background }]}
    >
      <View
        style={{
          backgroundColor: "#00e676",
          height: "12.8%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "2.8%",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Icon
            name="arrow-back"
            color="white"
            onPress={() => navigation.goBack()}
          />
          <View style={{ marginLeft: "3%" }}>
            <Title style={{ color: "white" }}>{params.name}</Title>
            {/* {doc().status === "online" && (
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {doc().status}
                </Text>
              )} */}
          </View>
        </View>
      </View>

      <ScrollView
        ref={(r) => setScrollRef(r)}
        onContentSizeChange={() => scrollRef.scrollToEnd({ animated: true })}
      >
        <View
          style={{
            marginTop: 5,
            flex: 1,
            alignItems: "flex-end",
            marginHorizontal: 25,
          }}
        >
          {receive.map((i, index) => {
            scrollRef.scrollToEnd({ animated: true });
            return (
              <View
                key={index}
                style={{
                  alignSelf:
                    User._id === i.sender.id ? "flex-end" : "flex-start",
                  backgroundColor:
                    User._id === i.sender.id ? "#009688" : "#e0e0e0",

                  justifyContent: "center",
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: User._id === i.sender.id ? "left" : "right",
                    color: User._id === i.sender.id ? "#fff" : "#000",
                  }}
                >
                  {User._id === i.sender.id ? "me" : i.sender.name}
                </Text>
                <Text
                  style={{
                    textAlign: User._id === i.sender.id ? "left" : "right",
                    color: User._id === i.sender.id ? "#fff" : "#000",
                  }}
                >
                  {i.text}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
        }}
      >
        <Input
          placeholder="Type a message"
          value={text}
          inputContainerStyle={{
            alignSelf: "center",
            borderRadius: 25,
            borderWidth: 2,
            backgroundColor: paper.colors.surface,
          }}
          inputStyle={{ paddingLeft: 12, color: paper.colors.text }}
          containerStyle={{
            display: "flex",
            flexDirection: "row",
            flexShrink: 1,
          }}
          onChangeText={(text) => setText(text)}
        />
        <FAB
          small
          style={{ height: 40 }}
          icon={(props) => (
            <Icon
              name="sc-telegram"
              type="evilicon"
              {...props}
              size={28}
              style={{ marginLeft: -2 }}
            />
          )}
          onPress={() => {
            let data = {
              text,
              sender: {
                name: User.fname,
                id: User._id,
                time: new Date(),
                role: User.role,
              },
              receiver: {
                name: params.name,
                id: params.id,
                time: new Date(),
                role: params.role,
              },
            };
            if (!receive.length === 0) {
              data["session_id"] = id;
            }
            // console.log(data);
            socket.emit("send", data);
          }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
