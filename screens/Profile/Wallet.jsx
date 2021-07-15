import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Headline, Surface, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import { GET_WALLET } from "../../redux/actions/UserActions";

const Wallet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const User = useSelector((state) => state.User.TOKEN);
  const wallet = useSelector((state) => state.User.wallet);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.Language.Lang);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.wallet.title });
  }, [lang]);
  useEffect(() => {
    if (User._id) dispatch(GET_WALLET(User._id, () => setLoading(true)));
  }, []);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <SavingModel visible={model} title="Paying" />
        <Surface style={styles.surface}>
          {wallet ? (
            <View>
              <Text style={{ margin: 20, fontSize: 18 }}>
                {lang.wallet.current_wallet}: Rs. {wallet.current} \-
              </Text>
            </View>
          ) : (
            <Headline style={{ textAlign: "center", margin: 7 }}>
              {lang.wallet.add_wallet}
            </Headline>
          )}
        </Surface>

        <Button
          mode="contained"
          style={{ margin: 20 }}
          uppercase={false}
          onPress={() => navigation.navigate("Amount")}
        >
          {lang.wallet.add_wallet}
        </Button>
        {/* <Button uppercase={false}>Withdraw Amount</Button> */}
      </View>
    );
};

export default Wallet;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    margin: 20,
  },
});
