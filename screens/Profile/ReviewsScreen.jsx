import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "../../components/Card/ReviewCard";
import Loading from "../../components/Loading";
import { GET_DOC_REVIEW } from "../../redux/actions/DoctorAction";

const ReviewsScreen = () => {
  const paper = useTheme();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState(null);
  const user = useSelector((state) => state.User.TOKKEN);
  const review = useSelector((state) => state.Doctor.review);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_DOC_REVIEW(user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [review]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ backgroundColor: paper.colors.surface, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {review ? (
            review.map((item, i) => <ReviewCard key={i} data={item} />)
          ) : (
            <Title>No Result</Title>
          )}
        </ScrollView>
      </View>
    );
};

export default ReviewsScreen;

const styles = StyleSheet.create({});
