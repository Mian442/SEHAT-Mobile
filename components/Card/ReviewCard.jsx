import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Text, Subheading, Paragraph, Caption } from "react-native-paper";

const ReviewCard = () => {
  return (
    <View style={{ margin: 14 }}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Avatar
          rounded
          size="medium"
          overlayContainerStyle={{ backgroundColor: "#009688" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{}}
          title="A"
          source={
            9 < 10
              ? "Male" === "Male"
                ? require(`../../assets/images/man.png`)
                : require(`../../assets/images/woman.png`)
              : { uri: "data:image/jpeg;base64," + "dd" }
          }
        />
        <Subheading style={{ paddingLeft: 8, flexGrow: 1 }}>Adnan</Subheading>
        <View style={[styles.row, { marginRight: 5 }]}>
          <Text style={{ marginRight: 5 }}>Rating:</Text>
          <Icon name="star" type="antdesign" color="#ffeb3b" size={16} />
          <Icon name="star" type="antdesign" color="#ffeb3b" size={16} />
          <Icon name="star" type="antdesign" color="#ffeb3b" size={16} />
          <Icon name="star" type="antdesign" color="#ffeb3b" size={16} />
          <Caption>dse</Caption>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#9e9e9e",
          padding: 10,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut tempora
          laboriosam facilis aut, nobis modi doloremque vitae accusantium labore
          possimus excepturi, eos vel dolor voluptatum, eveniet aspernatur nam
          exercitationem quos!
        </Paragraph>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
});
