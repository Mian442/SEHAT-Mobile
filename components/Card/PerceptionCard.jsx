import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { Text, Card, List, Paragraph, Subheading } from "react-native-paper";

const PerceptionCard = ({ list }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View>
      <View style={styles.container}>
        <Card style={[styles.shawdow, { borderRadius: 10 }]}>
          <Card.Title
            left={() => (
              <Avatar
                rounded
                size="large"
                overlayContainerStyle={{ backgroundColor: "#009688" }}
                activeOpacity={0.7}
                containerStyle={{}}
                source={
                  list.user.pic === null
                    ? list.user.gender === "Male"
                      ? require(`../../assets/images/doctorM.png`)
                      : require(`../../assets/images/doctorF.png`)
                    : { uri: "data:image/jpeg;base64," + list.user.pic }
                }
              />
            )}
            title={list.user.fname}
            subtitle={list.specialty}
            titleStyle={{ paddingLeft: 25 }}
            subtitleStyle={{ paddingLeft: 25 }}
            style={{ margin: 7 }}
            rightStyle={{ marginHorizontal: 14 }}
            right={(props) => (
              <Subheading {...props}>{list.prescription.disease}</Subheading>
            )}
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
              <Paragraph>{list.prescription.perception}</Paragraph>
            </List.Accordion>
            <Text
              style={{ color: "#bdbdbd", fontSize: 12, fontStyle: "italic" }}
            >
              {moment(list.prescription.date).format("MMM/DD/YYYY")}
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
