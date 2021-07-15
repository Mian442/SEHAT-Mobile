import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import io from "socket.io-client";
const DetailScreen = () => {
  const socket = io("http://192.168.8.100:3000");
  const [data, setdata] = useState([]);
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setdata([...data, msg]);
    });
  }, [socket]);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          socket.emit("chat message", "can you hear me?");
        }}
      >
        <Text>Clcik</Text>
      </TouchableOpacity>
      {data.map((i, index) => {
        return <Text key={index}>{i}</Text>;
      })}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
