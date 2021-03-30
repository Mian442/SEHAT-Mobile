import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { TextInput, useTheme } from "react-native-paper";

const GivePerceptionScreen = () => {
  const paper = useTheme();
  const [search, setSearch] = useState("");
  const [perception, setPerception] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 15 }}>
          <TextInput
            label="Patient"
            placeholder="Search Patient"
            value={search}
            dense={true}
            onChangeText={(text) => setSearch(text)}
            mode="outlined"
            right={<TextInput.Icon name="magnify" color="#9e9e9e" />}
          />
          <TextInput
            label="Perception"
            placeholder="Enter Perception"
            value={perception}
            onChangeText={(text) => setPerception(text)}
            mode="outlined"
            multiline
          />
          <Button
            icon={
              <Icon
                name="file-send"
                size={24}
                color="#fff"
                style={{ paddingRight: 7 }}
                type="material-community"
              />
            }
            onPress={() => {
              let d = {
                id: id,
                ...data,
              };
              handelButton();
              // dispatch(
              //   USER_MEDICAL_HISTORY_UPDATE(data, () => {
              //     handelButton();
              //   })
              // );
            }}
            buttonStyle={{ margin: 10, backgroundColor: paper.colors.accent }}
            containerStyle={{ alignSelf: "flex-end" }}
            title="Send"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GivePerceptionScreen;

const styles = StyleSheet.create({});
