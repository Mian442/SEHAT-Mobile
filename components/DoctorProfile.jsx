import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Avatar, Icon, AirbnbRating, Rating } from "react-native-elements";
import {
  Text,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Subheading,
  Surface,
  Title,
  useTheme,
  Chip,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { date } from "yup/lib/locale";
import {
  DOC_ADD_REVIEW,
  GET_DOC_INFORMATION,
} from "../redux/actions/DoctorAction";
import ReviewCard from "./Card/ReviewCard";
import Loading from "./Loading";
import SavingModel from "./SavingModel";

const DoctorProfile = () => {
  const paper = useTheme();
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const info = useSelector((state) => state.Doctor.info);
  const User = useSelector((state) => state.User.TOKKEN);
  const [model, setModel] = useState(false);
  const [review, setReview] = useState({
    star: 5,
    comment: "I am very Satisfied with the Doctor Performance!",
  });
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_INFORMATION(params.doctor_id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [info]);

  const avgRating = () => {
    let rating = 0;
    if (info?.review?.review.length > 0) {
      for (var i of info?.review?.review) {
        rating = rating + i.star;
      }
      rating = rating / info?.review?.review.length;
      return Math.round(rating);
    }
    rating = "No Reviews";
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: paper.colors.background }}
        >
          <View
            style={{
              backgroundColor: "#651fff",
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
            }}
          >
            <IconButton
              icon="arrow-left"
              color="#fff"
              size={32}
              style={{ marginTop: "7.5%" }}
              onPress={() => navigation.goBack()}
            />
            <View style={{ margin: 10 }}>
              <Card.Title
                title={info?.user.fname}
                titleStyle={{ color: "white" }}
                subtitleStyle={{ color: "white" }}
                subtitle={info?.specialty}
                right={() => (
                  <Avatar
                    rounded
                    size="large"
                    source={
                      info?.user.pic
                        ? { uri: "data:image/jpeg;base64," + info?.user.pic }
                        : info?.user.gender === "Male"
                        ? require("../assets/images/doctorM.png")
                        : require("../assets/images/doctorF.png")
                    }
                  />
                )}
              />
              <View
                style={{
                  marginHorizontal: 7,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ marginLeft: 7, color: "white" }}>
                  Rating: {avgRating()}
                </Text>
                <Icon name="star" type="antdesign" color="#ffeb3b" size={16} />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: 7,
                }}
              >
                <Button
                  mode="outlined"
                  color="#fff"
                  style={{
                    borderRadius: 12,
                    borderWidth: 3,
                    borderColor: "white",
                  }}
                  onPress={() => {
                    navigation.navigate("BookAppointment", {
                      _id: info?._id,
                      name: info?.user.fname,
                      lname: info?.user.lname,
                      pic: info?.user.pic,
                      gender: info?.user.gender,
                      specialty: info?.specialty,
                    });
                  }}
                >
                  Book Appointment
                </Button>
                {/* <Icon
                  name="phone"
                  type="font-awesome"
                  color="#FFF"
                  size={24}
                  containerStyle={{
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    backgroundColor: "#00a152",
                    borderRadius: 10,
                  }}
                />
                <Icon
                  name="message"
                  type="entypo"
                  color="#FFF"
                  size={26}
                  containerStyle={{
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    backgroundColor: "#ffb74d",
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("Chat", {
                      id: info._id,
                      fname: info?.user.fname,
                    })
                  }
                /> */}
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 25,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginBottom: 30,
                padding: 10,
              }}
            >
              <Surface
                style={[
                  styles.shawdow,
                  {
                    padding: 12,
                    marginRight: 7,
                    borderRadius: 10,
                    width: Dimensions.get("window").width,
                    justifyContent: "center",
                  },
                ]}
              >
                <View style={[styles.row, { alignItems: "center" }]}>
                  <Icon
                    name="video-camera"
                    type="font-awesome"
                    color="#ff1744"
                    style={{ marginRight: 5 }}
                  />
                  <Title>Video Consultation</Title>
                </View>
                <List.Item
                  title="Fee"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="money-check-alt"
                      type="font-awesome-5"
                      color="#00e676"
                    />
                  )}
                  right={() => <Text>Rs {parseInt(info?.online_fee)}</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
                <List.Item
                  title="Day"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="day-sunny"
                      type="fontisto"
                      color="#ffc107"
                    />
                  )}
                  right={() => <Text>Mon, Thu</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
                <List.Item
                  title="Time"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="timer"
                      type="material"
                      color="#9e9e9e"
                    />
                  )}
                  right={() => <Text>11:30AM - 2:30PM</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
              </Surface>
              <Surface
                style={[
                  styles.shawdow,
                  {
                    padding: 12,
                    borderRadius: 10,
                    width: Dimensions.get("window").width,
                    justifyContent: "center",
                  },
                ]}
              >
                <View style={[styles.row, { alignItems: "center" }]}>
                  <Icon
                    name="calendar-alt"
                    type="font-awesome-5"
                    color="#ff1744"
                    style={{ marginRight: 5 }}
                  />
                  <Title>Consultation</Title>
                </View>
                <List.Item
                  title="Fee"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="money-check-alt"
                      type="font-awesome-5"
                      color="#00e676"
                    />
                  )}
                  right={() => <Text>Rs {parseInt(info?.office_fee)}</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
                <List.Item
                  title="Day"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="day-sunny"
                      type="fontisto"
                      color="#ffc107"
                    />
                  )}
                  right={() => <Text>Mon, Thu</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
                <List.Item
                  title="Time"
                  left={(props) => (
                    <Icon
                      {...props}
                      name="timer"
                      type="material"
                      color="#9e9e9e"
                    />
                  )}
                  right={() => <Text>11:30AM - 2:30PM</Text>}
                  titleStyle={{
                    marginTop: -7,
                  }}
                />
              </Surface>
            </ScrollView>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="stethoscope"
                  type="font-awesome-5"
                  color="#00bcd4"
                  style={{ marginRight: 5 }}
                />
                <Title>Doctor Services</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View style={[styles.row, { alignItems: "center" }]}>
                {info?.record?.services?.map((service, i) => {
                  return (
                    <Chip
                      key={i}
                      mode="outlined"
                      style={{
                        margin: 7,
                        borderColor: "#2196f3",
                        borderWidth: 1.5,
                      }}
                      textStyle={{ color: "#2196f3" }}
                    >
                      {service}
                    </Chip>
                  );
                })}
              </View>
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="md-school"
                  type="ionicon"
                  color="#ffc107"
                  style={{ marginRight: 5 }}
                />
                <Title>Doctor Expertise</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View style={[styles.row, { alignItems: "center" }]}>
                {info?.record?.expertise?.map((service, i) => {
                  return (
                    <Chip
                      key={i}
                      mode="outlined"
                      style={{
                        margin: 7,
                        borderColor: "#f50057",
                        borderWidth: 1.5,
                      }}
                      textStyle={{ color: "#f50057" }}
                    >
                      {service}
                    </Chip>
                  );
                })}
              </View>
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="certificate"
                  type="material-community"
                  color="#2196f3"
                  style={{ marginRight: 5 }}
                />
                <Title>Work Experience</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View>
                {info?.record?.workExperience?.map((item, i) => {
                  return (
                    <List.Item
                      key={i}
                      title={item.post}
                      description={
                        item.institute +
                        " ~ " +
                        item.starting_year +
                        " - " +
                        item.ending_year
                      }
                      left={() => (
                        <Icon
                          name="dot-single"
                          type="entypo"
                          color={paper.colors.text}
                        />
                      )}
                    />
                  );
                })}
              </View>
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="scroll"
                  type="font-awesome-5"
                  color="#ffa726"
                  style={{ marginRight: 5 }}
                />
                <Title>Doctor Qualification</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View>
                {info?.record?.qualification?.map((item, i) => {
                  return (
                    <List.Item
                      key={i}
                      title={item.type}
                      description={
                        item.institute +
                        " ~ " +
                        item.starting_year +
                        " - " +
                        item.ending_year
                      }
                      left={() => (
                        <Icon
                          name="dot-single"
                          type="entypo"
                          color={paper.colors.text}
                        />
                      )}
                    />
                  );
                })}
              </View>
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="pen-fancy"
                  type="font-awesome-5"
                  color={paper.colors.text}
                  style={{ marginRight: 5 }}
                />
                <Title>Doctor Publication</Title>
              </View>
              <Divider style={{ height: 2 }} />
              {info?.record?.publications?.map((item, i) => {
                return (
                  <List.Item
                    key={i}
                    title={item.name}
                    description={item.place + ", " + item.year}
                    left={() => (
                      <Icon
                        name="dot-single"
                        type="entypo"
                        color={paper.colors.text}
                      />
                    )}
                  />
                );
              })}
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="trophy"
                  type="font-awesome-5"
                  color="#ffff00"
                  style={{ marginRight: 5 }}
                />
                <Title>Doctor Achievements</Title>
              </View>
              <Divider style={{ height: 2 }} />
              {info?.record?.achievements?.map((item, i) => {
                return (
                  <List.Item
                    key={i}
                    title={item.name + ", " + item.year + ", " + item.place}
                    titleStyle={{ fontSize: 18 }}
                    left={() => (
                      <Icon
                        name="dot-single"
                        type="entypo"
                        color={paper.colors.text}
                      />
                    )}
                  />
                );
              })}
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10, flex: 1 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="rate-review"
                  type="material"
                  color="#009688"
                  style={{ marginRight: 5 }}
                />
                <Title>Add Reviews</Title>
              </View>
              <View>
                <AirbnbRating
                  count={5}
                  showRating
                  reviews={["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]}
                  defaultRating={5}
                  size={20}
                  onFinishRating={(e) => setReview({ ...review, star: e })}
                />
                <TextInput
                  label="Review"
                  multiline={true}
                  value={review.comment}
                  right={
                    <TextInput.Icon
                      name="message-plus"
                      style={{ marginRight: 5 }}
                      color="#009688"
                      onPress={() => {
                        let data = {
                          id: info._id,
                          review: {
                            ...review,
                            date: new Date(),
                            user_name: User.fname + " " + User.lname,
                            gender: User.gender,
                            pic: User.pic,
                            userid: User._id,
                          },
                        };

                        setModel(true);
                        dispatch(
                          DOC_ADD_REVIEW(data, () => {
                            setTimeout(() => {
                              setModel(false);
                            }, 3000);
                          })
                        );
                      }}
                    />
                  }
                  onChangeText={(text) =>
                    setReview({ ...review, comment: text })
                  }
                />
              </View>
            </Surface>

            <Surface
              style={[
                styles.shawdow,
                { marginBottom: 30, padding: 7, borderRadius: 10, flex: 1 },
              ]}
            >
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="rate-review"
                  type="material"
                  color="#009688"
                  style={{ marginRight: 5 }}
                />
                <Title>Reviews</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View>
                {info?.review?.review.map((item, i) => (
                  <ReviewCard key={i} data={item} />
                ))}
              </View>
            </Surface>
          </View>
          <SavingModel visible={model} />
        </ScrollView>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#00e5ff",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
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
export default DoctorProfile;
