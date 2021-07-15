import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import {
  Button,
  Caption,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import {
  REMOVE_FAVORITE,
  GET_FAVORITES_DB,
} from "../../redux/actions/UserActions";

const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.User.favoriteList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  const User = useSelector((state) => state.User.TOKEN);
  const [model, setModel] = useState(false);
  useEffect(() => {
    navigation.setOptions({ headerTitle: "Favorite" });
  }, [lang]);
  useEffect(() => {
    dispatch(GET_FAVORITES_DB(User._id, () => setLoading(true)));
  }, []);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <SavingModel visible={model} title="Removing" />
        <ScrollView>
          {favorites.map((item, i) => (
            <Surface
              key={i}
              style={{ margin: 20, padding: 12, borderRadius: 12 }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  rounded
                  size="large"
                  overlayContainerStyle={{ backgroundColor: "#009688" }}
                  activeOpacity={0.7}
                  containerStyle={{}}
                  source={
                    item.user.pic === null
                      ? item.user.gender === "Male"
                        ? require(`../../assets/images/man.png`)
                        : require(`../../assets/images/woman.png`)
                      : { uri: "data:image/jpeg;base64," + item.pic }
                  }
                />
                <Title style={{ flexGrow: 1, marginLeft: 12 }}>
                  {item.user.fname}
                </Title>
                <Icon
                  name="trash"
                  type="font-awesome-5"
                  color="red"
                  onPress={() => {
                    setModel(true);
                    dispatch(
                      REMOVE_FAVORITE(User._id, { favorite: item._id }, () => {
                        setModel(false);
                      })
                    );
                  }}
                />
              </View>
              <Subheading style={{ textAlign: "center" }}>
                {item.user?.email}
              </Subheading>
              <Subheading>Gender: {item.user?.gender}</Subheading>
              <Subheading>specialty: {item.specialty}</Subheading>
              <Caption>{item.status}</Caption>
              <Button
                mode="contained"
                style={{ width: "100%", marginVertical: 7 }}
                disabled={item.restrict}
                onPress={() => {
                  navigation.navigate("BookAppointment", {
                    _id: item._id,
                    fname: item.user.fname,
                    lname: item.user.lname,
                    pic: item.user.pic,
                    gender: item.user.gender,
                    specialty: item.specialty,
                  });
                }}
              >
                Book Appointment
              </Button>
            </Surface>
          ))}
        </ScrollView>
      </View>
    );
};

export default FavoriteScreen;
