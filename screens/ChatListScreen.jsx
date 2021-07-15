import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { GET_CHAT_LIST } from "../redux/actions/UserActions";
import moment from "moment";
const ChatListScreen = () => {
  const chat = useSelector((state) => state.User.chat);
  const User = useSelector((state) => state.User.TOKEN);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const paper = useTheme();
  useEffect(() => {
    dispatch(
      GET_CHAT_LIST(User._id, () => {
        setTimeout(() => {
          setLoading(true);
        }, 3000);
      })
    );
    return;
  }, []);
  if (!loading && chat.length > 0) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
        {chat.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={{ backgroundColor: paper.colors.surface }}
            onPress={() =>
              navigation.navigate("Chat", {
                name: item.user.fname,
                id: item.user._id,
                role: item.user.role,
                chat_id: item._id,
                from: "List",
              })
            }
          >
            <Avatar
              rounded
              source={
                item.user.pic === null
                  ? item.user.gender === "Male"
                    ? require(`../assets/images/man.png`)
                    : require(`../assets/images/woman.png`)
                  : { uri: "data:image/jpeg;base64," + item.user.pic }
              }
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: paper.colors.text }}>
                {item.user.fname}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: paper.colors.text }}>
                {item.text}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Subtitle
                style={{ color: paper.colors.text, alignSelf: "flex-end" }}
              >
                {moment(item.time).format("MM/D/YY")}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
