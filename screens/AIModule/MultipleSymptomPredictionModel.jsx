import React, { createRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Title, Subheading } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Select, CheckIcon } from "native-base";
import SavingModel from "../../components/SavingModel";
import { GET_4_DISEASE_PREDICTION } from "../../redux/actions/AImoduleAction";
const MultipleSymptomPredictionModel = () => {
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [result, setResult] = useState("");
  const [data, setData] = useState({
    temperature: "",
    pulse_rate: "",
    la_pain: -1,
    ua_pain: -1,
    vomiting_feeling: -1,
    indigestion: -1,
    yellowish_urine: -1,
  });
  const list = [
    {
      name: "Temperature",
      ref: createRef(),
      blur: false,
      keyType: "next",
      value: data.temperature,
      component: "input",
      index: 1,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, temperature: text }),
    },
    {
      name: "Pulse Rate",
      ref: createRef(),
      blur: true,
      keyType: "done",
      value: data.pulse_rate,
      component: "input",
      index: -1,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, pulse_rate: text }),
    },
  ];
  const select = [
    {
      label: "Left Atrium Pain",
      value: data.la_pain,
      onChange: (itemValue) => setData({ ...data, la_pain: itemValue }),
      children: [
        {
          label: "Yes",
          value: 10,
        },
        {
          label: "No",
          value: 0,
        },
      ],
    },
    {
      label: "Urinalysis Angina Pain",
      value: data.ua_pain,
      onChange: (itemValue) => setData({ ...data, ua_pain: itemValue }),
      children: [
        {
          label: "Yes",
          value: 10,
        },
        {
          label: "No",
          value: 0,
        },
      ],
    },

    {
      label: "Vomiting Feeling",
      value: data.vomiting_feeling,
      onChange: (itemValue) =>
        setData({ ...data, vomiting_feeling: itemValue }),
      children: [
        {
          label: "Yes",
          value: 10,
        },
        {
          label: "No",
          value: 0,
        },
      ],
    },

    {
      label: "Yellowish Urine",
      value: data.yellowish_urine,
      onChange: (itemValue) => setData({ ...data, yellowish_urine: itemValue }),
      children: [
        {
          label: "Yes",
          value: 10,
        },
        {
          label: "No",
          value: 0,
        },
      ],
    },
    {
      label: "Indigestion",
      value: data.indigestion,
      onChange: (itemValue) => setData({ ...data, indigestion: itemValue }),
      children: [
        {
          label: "Yes",
          value: 10,
        },
        {
          label: "No",
          value: 0,
        },
      ],
    },
  ];
  const resultList = [
    "Heart Disease",
    "Viral Fever or Cold",
    "Jaundice",
    "Food poisoning",
  ];
  return (
    <View style={{ flex: 1 }}>
      {result !== "" && result && (
        <View
          style={{
            padding: 14,
            backgroundColor: resultList.includes(result)
              ? "#e57373"
              : "#81c784",
          }}
        >
          <Subheading>Result:</Subheading>
          <Title style={{ textAlign: "center" }}>{result}</Title>
        </View>
      )}
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <SavingModel visible={model} title="Predicting" />
        <Title>Diseases Prediction</Title>
        {list.map((item, i) => (
          <TextInput
            key={i}
            label={item.name}
            style={{ marginVertical: 14 }}
            mode="outlined"
            dense
            value={item.value}
            onChangeText={item.onChange}
            disabled={item.disabled}
            ref={item.ref}
            onSubmitEditing={() => {
              item.index !== -1 && list[item.index].ref.current.focus();
            }}
            blurOnSubmit={item.blur}
            returnKeyType={item.keyType}
            keyboardType={item.keyboardType}
          />
        ))}
        {select.map((item, i) => (
          <View key={i} style={{ marginVertical: 14 }}>
            <Text>{item.label}</Text>
            <Select
              selectedValue={item.value}
              minWidth={200}
              placeholder={item.label}
              onValueChange={item.onChange}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {item.children.map((value, i) => (
                <Select.Item key={i} label={value.label} value={value.value} />
              ))}
            </Select>
          </View>
        ))}
        <Button
          mode="contained"
          onPress={() => {
            setModel(true);
            console.log(data);
            dispatch(
              GET_4_DISEASE_PREDICTION(data, (v) => {
                setModel(false);
                setResult(v);
              })
            );
          }}
        >
          Show Result
        </Button>
      </ScrollView>
    </View>
  );
};

export default MultipleSymptomPredictionModel;

const styles = StyleSheet.create({});
