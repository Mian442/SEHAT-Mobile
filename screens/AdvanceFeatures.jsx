import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import { List, Subheading, Title, useTheme } from "react-native-paper";
import { Alert } from "native-base";
const AdvanceFeatures = () => {
  const paper = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: paper.colors.surface }}>
      <Title style={{ padding: 20, textAlign: "center" }}>
        Advance Features
      </Title>
      <ScrollView showsVerticalScrollIndicator={false}>
        <List.Section>
          <List.Accordion title="Prediction">
            <List.Section title="Report Data">
              <List.Accordion title="Report Type">
                <ListItem
                  bottomDivider
                  onPress={() => navigation.navigate("Heart Disease")}
                >
                  <ListItem.Content>
                    <ListItem.Title>Heart Disease</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                <ListItem
                  bottomDivider
                  onPress={() => navigation.navigate("Multiple Diseases")}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      Multiple Diseases Prediction
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </List.Accordion>
            </List.Section>
            <ListItem
              bottomDivider
              onPress={() => navigation.navigate("Symptom Prediction")}
            >
              <ListItem.Content>
                <ListItem.Title>Symptom Prediction</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </List.Accordion>
        </List.Section>

        <List.Section>
          <List.Accordion title="Monitoring">
            <ListItem
              bottomDivider
              onPress={() => navigation.navigate("Graphs")}
            >
              <ListItem.Content>
                <ListItem.Title>Monitoring Graphs</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </List.Accordion>
        </List.Section>

        <List.Section>
          <List.Accordion title="Image Processing">
            <ListItem
              bottomDivider
              onPress={() => navigation.navigate("Image Enhancement")}
            >
              <ListItem.Content>
                <ListItem.Title>Image Enhancement</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default AdvanceFeatures;
