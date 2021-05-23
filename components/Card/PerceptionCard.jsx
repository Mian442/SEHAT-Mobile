import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import {
  Text,
  Avatar,
  Card,
  List,
  Paragraph,
  Subheading,
} from "react-native-paper";

const PerceptionCard = ({ list }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View>
      <View style={styles.container}>
        <Card style={[styles.shawdow, { borderRadius: 10 }]}>
          <Card.Title
            left={() => (
              <Avatar.Image
                source={
                  list.img != undefined
                    ? list.img
                    : list.gender == "male"
                    ? require("../../assets/images/doctorM.png")
                    : require("../../assets/images/doctorF.png")
                }
              />
            )}
            title={list.name}
            subtitle={list.specialist}
            titleStyle={{ paddingLeft: 25 }}
            subtitleStyle={{ paddingLeft: 25 }}
            style={{ margin: 7 }}
            rightStyle={{ marginHorizontal: 14 }}
            right={(props) => <Subheading {...props}>Illness</Subheading>}
          />

          <Divider style={{ height: 2, marginHorizontal: 20 }} />
          <Card.Content>
            <List.Accordion
              title="Prescription"
              left={(props) => (
                <Icon
                  {...props}
                  name="description"
                  type="material"
                  style={{ margin: 7 }}
                />
              )}
              expanded={expanded}
              onPress={handlePress}
            >
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                delectus quasi quia, possimus explicabo ducimus sit labore
                beatae fugit. Doloremque dolorem facilis, consequuntur cumque
                magnam sunt velit enim aliquam assumenda.
              </Paragraph>
            </List.Accordion>
            <Text
              style={{ color: "#bdbdbd", fontSize: 12, fontStyle: "italic" }}
            >
              Noted
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default PerceptionCard;

const styles = StyleSheet.create({
  container: { margin: 10 },
  shawdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
  },
});
