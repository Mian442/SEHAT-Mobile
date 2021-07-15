import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import cryptoJs from "crypto-js";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import {
  ActivityIndicator,
  Button,
  Headline,
  Subheading,
  Surface,
  TextInput,
} from "react-native-paper";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import SavingModel from "./SavingModel";
import { Image } from "react-native-elements";
import { PAYMENT_WITH_API } from "../redux/actions/UserActions";
const Amount = () => {
  const User = useSelector((state) => state.User.TOKEN);
  const IntegritySalt = "t0sx41a1z5";
  console.log(User);
  let initial = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: "MC19175",
    pp_Password: "s5u4x9811v",
    pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
    pp_Amount: "",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
    pp_BillReference: "billRef",
    pp_Description: "Add Points to wallet",
    pp_TxnExpiryDateTime: moment()
      .add(1, "d")
      .format("YYYYMMDDHHmmss")
      .toString(),
    pp_ReturnURL:
      "https://fyp-admin-panel.herokuapp.com/api/wallet?id=" + User._id,
    pp_SecureHash: "",
    ppmpf_1: "",
  };
  const navigation = useNavigation();
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initial);
  const dispatch = useDispatch();

  const handelSubmit = () => {
    let a = { ...data };
    a.pp_Amount = a.pp_Amount + "00";
    let hashString =
      IntegritySalt +
      "&" +
      a.pp_Amount +
      "&" +
      a.pp_BillReference +
      "&" +
      a.pp_Description +
      "&" +
      a.pp_Language +
      "&" +
      a.pp_MerchantID +
      "&" +
      a.pp_Password +
      "&" +
      a.pp_ReturnURL +
      "&" +
      a.pp_TxnCurrency +
      "&" +
      a.pp_TxnDateTime +
      "&" +
      a.pp_TxnExpiryDateTime +
      "&" +
      a.pp_TxnRefNo +
      "&" +
      a.pp_TxnType +
      "&" +
      a.pp_Version +
      "&" +
      a.ppmpf_1;
    let hash = cryptoJs.HmacSHA256(hashString, IntegritySalt).toString();
    a.pp_SecureHash = hash;
    setModel(true);
    dispatch(
      PAYMENT_WITH_API(User._id, a, () => {
        setModel(false);
        setData(initial);
        navigation.goBack();
      })
    );
  };
  const { amount } = useSelector((state) => state.Language.Lang);
  useEffect(() => {
    navigation.setOptions({ headerTitle: amount.title });
  }, [amount]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Surface style={styles.surface}>
            <Headline
              style={{
                textAlign: "center",
                marginVertical: 7,
                color: "#c4151c",
              }}
            >
              {amount.subtitle}
            </Headline>
            <Subheading
              style={{ textAlign: "center", marginVertical: 7, color: "gray" }}
            >
              {amount.subtitle2}
            </Subheading>
            <Image
              source={{
                uri: "https://seeklogo.com/images/J/jazz-cash-logo-829841352F-seeklogo.com.jpg",
              }}
              style={{ height: 200, resizeMode: "contain", marginVertical: 7 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <TextInput
              label={amount.amount}
              placeholder={amount.amount}
              value={data.pp_Amount}
              dense
              mode="outlined"
              keyboardType="number-pad"
              style={{ marginVertical: 7 }}
              onChangeText={(text) => setData({ ...data, pp_Amount: text })}
            />
            <TextInput
              label={amount.phone}
              placeholder={amount.phone}
              value={data.ppmpf_1}
              dense
              mode="outlined"
              onChangeText={(text) => setData({ ...data, ppmpf_1: text })}
              style={{ marginVertical: 7 }}
              keyboardType="number-pad"
            />
            <Button
              onPress={handelSubmit}
              style={{ marginVertical: 7 }}
              color="#c4151c"
              mode="contained"
            >
              {amount.add}
            </Button>
          </Surface>
        </ScrollView>

        <SavingModel visible={model} title="Adding Amount" />
      </View>
    );
};

export default Amount;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
