import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Text, FAB, useTheme, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Loading from "../components/Loading";
import {
  GET_MESSAGE_LIST,
  GET_MESSAGE_BY_IDS,
  MESSAGE,
} from "../redux/actions/UserActions";
import { SocketUrl } from "../config/Config";
const socket = io(SocketUrl + "/chat");

const ChatScreen = () => {
  const paper = useTheme();
  const message = useSelector((state) => state.User.message);
  const [receive, setReceive] = useState([]);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [scrollRef, setScrollRef] = useState();
  const [isPrescription, setIsPrescription] = useState(false);
  const [disease, setDisease] = useState("");
  const User = useSelector((state) => state.User.TOKEN);
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
  }, []);

  useEffect(() => {
    if (message) {
      setReceive(message.chat);
      setStatus(message._id);
    }
  }, [message]);
  useEffect(() => {
    socket.on("roomCreated", (msg) => {
      console.log("roomCreated");
      if (msg.user == User._id || msg.doctor === User._id) {
        console.log("true");
        dispatch(MESSAGE(msg));
        setReceive(msg.chat);
        setStatus(msg._id);
      }
    });
    socket.on("receive", (msg) => {
      console.log("received");
      if (msg.session_id === status) {
        console.log("true");
        setReceive([...receive, msg.msg]);
        setText("");
        setDisease("");
        setIsPrescription(false);
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
                  {User._id !== i.sender.id && (
                    <Text
                      style={{
                        textAlign: "left",
                        color: "#000",
                      }}
                    >
                      {i.sender.name}
                    </Text>
                  )}
                  {i.isPrescription && (
                    <>
                      <Text
                        style={{
                          textAlign:
                            User._id === i.sender.id ? "right" : "left",
                          color: User._id === i.sender.id ? "#fff" : "#000",
                        }}
                      >
                        Prescription
                      </Text>
                      <Text
                        style={{
                          textAlign:
                            User._id === i.sender.id ? "right" : "left",
                          color: User._id === i.sender.id ? "#fff" : "#000",
                        }}
                      >
                        Disease:{i.disease}
                      </Text>
                    </>
                  )}
                  <Text
                    style={{
                      textAlign: User._id === i.sender.id ? "right" : "left",
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
        {User.role.includes("doctor") && isPrescription && (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              margin: 10,
            }}
          >
            <Input
              placeholder="Type Disease"
              value={disease}
              inputContainerStyle={{
                alignSelf: "center",
                backgroundColor: paper.colors.surface,
              }}
              inputStyle={{ paddingLeft: 12, color: paper.colors.text }}
              containerStyle={{
                display: "flex",
                flexDirection: "row",
                flexShrink: 1,
              }}
              onChangeText={(text) => setDisease(text)}
            />
            <Icon
              name="close-o"
              type="evilicon"
              onPress={() => {
                setIsPrescription(false);
                setDisease("");
              }}
              color="red"
              size={42}
              style={{ marginLeft: -2 }}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            margin: 10,
          }}
        >
          <Input
            placeholder="Type a message"
            value={text}
            multiline={true}
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
              alignItems: "center",
              flexShrink: 1,
            }}
            onChangeText={(text) => setText(text)}
          />
          <Icon
            name="sc-telegram"
            type="evilicon"
            size={42}
            style={{ marginLeft: -2 }}
            onPress={() => {
              let data = {
                msg: {
                  text,
                  isPrescription,
                  disease,
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
              if (!message) {
                a = true;
                socket.emit("preparingRoom", {
                  user: User._id,
                  doctor: params.id,
                  data,
                });
              } else {
                data.session_id = message._id;
                socket.emit("send", data);
              }
            }}
          />
        </View>
        {User.role.includes("doctor") && !isPrescription && (
          <View style={{ margin: 10 }}>
            <Button
              mode="contained"
              onPress={() => {
                setIsPrescription(true);
              }}
            >
              Prescription Message
            </Button>
          </View>
        )}
      </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
