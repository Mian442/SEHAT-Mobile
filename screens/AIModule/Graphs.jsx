import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { GET_GRAPHS } from "../../redux/actions/AImoduleAction";
import { LineChart } from "react-native-chart-kit";
const config = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "3",
    stroke: "#ffa726",
  },
};
const Graphs = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_GRAPHS(
          (v) => {
            setLoading(true);
            setResult(v.results);
          },
          () => {
            setLoading(true);
          }
        )
      );
    });
  }, [setResult]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {result.length > 0 ? (
            result.map((item, i) => (
              <View key={i} style={{ margin: 20 }}>
                <Title style={{ textAlign: "center" }}>{item.data.city}</Title>
                <LineChart
                  data={{
                    labels: item.data.dates,
                    datasets: [
                      {
                        data: item.data.values,
                      },
                    ],
                  }}
                  height={250}
                  width={350}
                  chartConfig={config}
                />
              </View>
            ))
          ) : (
            <Title style={{ textAlign: "center" }}>No Result!</Title>
          )}
        </ScrollView>
      </View>
    );
};

export default Graphs;

const styles = StyleSheet.create({});
