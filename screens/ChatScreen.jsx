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
import {
  GET_MESSAGE_LIST,
  GET_MESSAGE_BY_IDS,
  MESSAGE,
} from "../redux/actions/UserActions";
const socket = io("https://sehat.herokuapp.com/chat");
const ChatScreen = () => {
  const paper = useTheme();
  const message = useSelector((state) => state.User.message);
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
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: params.name,
    });

    navigation.addListener("focus", () => {
      setLoading(false);
      if (params.from === "List") {
        dispatch(
          GET_MESSAGE_LIST(params.chat_id, () => {
            setTimeout(() => {
              setLoading(true);
            }, 3000);
          })
        );
      } else if (params.from === "Card") {
        let data = { doctor: params.id, user: User._id };
        dispatch(
          GET_MESSAGE_BY_IDS(data, () => {
            setTimeout(() => {
              setLoading(true);
            }, 3000);
          })
        );
      }
    });
    if (message) {
      setReceive(message.chat);
      setStatus(message._id);
    }
  }, [message]);
  useEffect(() => {
    socket.on("roomCreated", (msg) => {
      if (msg.user === User._id) {
        dispatch(MESSAGE(msg));
        let data = {
          session_id: msg._id,
          msg: {
            text,
            sender: {
              name: User.fname,
              id: User._id,
              time: new Date(),
            },
            receiver: {
              name: params.name,
              id: params.id,
              time: new Date(),
            },
          },
        };
        socket.emit("send", data);
      }
    });
    socket.on("receive", (msg) => {
      if (msg.session_id === status) {
        setReceive([...receive, msg.msg]);
        console.log("o2");
        setText("");
        scrollRef?.scrollToEnd({ animated: true });
      }
    });
  }, [receive]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View
        style={[styles.container, { backgroundColor: paper.colors.background }]}
      >
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
              scrollRef?.scrollToEnd({ animated: true });
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
              if (!message) {
                socket.emit("preparingRoom", {
                  user: User._id,
                  doctor: params.id,
                });
              } else {
                let data = {
                  session_id: message._id,
                  msg: {
                    text,
                    sender: {
                      name: User.fname,
                      id: User._id,
                      time: new Date(),
                    },
                    receiver: {
                      name: params.name,
                      id: params.id,
                      time: new Date(),
                    },
                  },
                };
                socket.emit("send", data);
              }
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
