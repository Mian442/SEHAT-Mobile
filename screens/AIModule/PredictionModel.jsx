import React, { createRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Title, Subheading } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Select, CheckIcon } from "native-base";
import SavingModel from "../../components/SavingModel";
import { GET_PREDICTION } from "../../redux/actions/AImoduleAction";
import * as yup from "yup";
import { ERROR } from "../../redux/actions/MessageAction";
const PredictionModel = () => {
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const [result, setResult] = useState("");
  const [data, setData] = useState({
    age: "",
    trestbps: "",
    chol: "",
    thalach: "",
    oldpeak: "",
    sex: -1,
    chestPain: -1,
    fbs: -1,
    restecg: -1,
    exang: -1,
    slope: -1,
    ca: -1,
    thal: -1,
  });
  const list = [
    {
      name: "Age",
      ref: createRef(),
      blur: false,
      keyType: "next",
      value: data.age,
      component: "input",
      index: 1,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, age: text }),
    },
    {
      name: "Resting Blood Pressure",
      ref: createRef(),
      blur: false,
      keyType: "next",
      value: data.trestbps,
      component: "input",
      index: 2,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, trestbps: text }),
    },
    {
      name: "Cholesterol",
      ref: createRef(),
      blur: false,
      keyType: "next",
      value: data.chol,
      component: "input",
      index: 3,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, chol: text }),
    },
    {
      name: "Maximum Heart Rate",
      ref: createRef(),
      blur: false,
      keyType: "next",
      value: data.thalach,
      component: "input",
      index: 4,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, thalach: text }),
    },
    {
      name: "ST Depression",
      ref: createRef(),
      blur: true,
      keyType: "done",
      value: data.oldpeak,
      component: "input",
      index: -1,
      keyboardType: "numeric",
      onChange: (text) => setData({ ...data, oldpeak: text }),
    },
  ];
  const select = [
    {
      label: "Gender",
      value: data.sex,
      onChange: (itemValue) => setData({ ...data, sex: itemValue }),
      children: [
        {
          label: "Female",
          value: 0,
        },
        {
          label: "Male",
          value: 1,
        },
      ],
    },
    {
      label: "Chest Pain Type",
      value: data.chestPain,
      onChange: (itemValue) => setData({ ...data, chestPain: itemValue }),
      children: [
        {
          label: "Typical Angina",
          value: 1,
        },
        {
          label: "ATypical Angina",
          value: 2,
        },
        {
          label: "Non-Anginal Pain",
          value: 3,
        },
        {
          label: "Asymptomatic",
          value: 4,
        },
      ],
    },
    {
      label: "Blood Sugar in Fasting",
      value: data.fbs,
      onChange: (itemValue) => setData({ ...data, fbs: itemValue }),
      children: [
        {
          label: "Less than 120",
          value: 0,
        },
        {
          label: "Greater than 120",
          value: 1,
        },
      ],
    },
    {
      label: "Rest ECG",
      value: data.restecg,
      onChange: (itemValue) => setData({ ...data, restecg: itemValue }),
      children: [
        {
          label: "normal",
          value: 0,
        },
        {
          label: "ST-T wave abnormality",
          value: 1,
        },
        {
          label: "Definite",
          value: 2,
        },
      ],
    },
    {
      label: "Slope",
      value: data.slope,
      onChange: (itemValue) => setData({ ...data, slope: itemValue }),
      children: [
        {
          label: "Up Sloping",
          value: 1,
        },
        {
          label: "Flat",
          value: 2,
        },
        {
          label: "DownSloping",
          value: 3,
        },
      ],
    },
    {
      label: "Exercise induced Angina",
      value: data.exang,
      onChange: (itemValue) => setData({ ...data, exang: itemValue }),
      children: [
        {
          label: "Yes",
          value: 0,
        },
        {
          label: "No",
          value: 1,
        },
      ],
    },
    {
      label: "Number of Major Vessels Colored by Fluoroscopy",
      value: data.ca,
      onChange: (itemValue) => setData({ ...data, ca: itemValue }),
      children: [
        {
          label: "0",
          value: 0,
        },
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
      ],
    },
    {
      label: "Thal",
      value: data.thal,
      onChange: (itemValue) => setData({ ...data, thal: itemValue }),
      children: [
        {
          label: "Normal",
          value: 1,
        },
        {
          label: "Fixed Defect",
          value: 2,
        },
        {
          label: "reversible Defect",
          value: 3,
        },
      ],
    },
  ];
  let schema = yup.object().shape({
    trestbps: yup
      .number()
      .required("Resting Blood Pressure is Required")
      .min(60, "Resting Blood Pressure grater than or equal to 60")
      .max(240, "Resting Blood Pressure less than or equal to 240"),
    chol: yup
      .number()
      .min(100, "Cholesterol Pressure grater than or equal to 100")
      .max(700, "Cholesterol Pressure less than or equal to 190")
      .required("Cholesterol Pressure is Required"),
    thalach: yup
      .number()
      .min(40, "Maximum Heart Rate Pressure grater than or equal to 40")
      .max(210, "Maximum Heart Rate Pressure less than or equal to 100")
      .required("Maximum Heart Rate Pressure is Required"),
    oldpeak: yup
      .number()
      .required()
      .min(0, "ST Depression grater than or equal to 0")
      .max(6.2, "ST Depression less than or equal to 6.2")
      .required("ST Depression is Required"),
    age: yup.number().required("Age is Required"),
    sex: yup.string().required("Gender is Required"),
    chestPain: yup.string().required("Chest Pain Type is Required"),
    fbs: yup.string().required("Blood Sugar in Fasting is Required"),
    restecg: yup.string().required("Rest ECG is Required"),
    exang: yup.string().required("Exercise induced Angina is Required"),
    slope: yup.string().required("Slope is Required"),
    ca: yup
      .string()
      .required("Number of Major Vessels Colored by Fluoroscopy is Required"),
    thal: yup.string().required("Thal is Required"),
  });
  return (
    <View style={{ flex: 1 }}>
      {result !== "" && result && (
        <View
          style={{
            padding: 14,
            backgroundColor: result === "Heart Disease" ? "#e57373" : "#81c784",
          }}
        >
          <Subheading>Result:</Subheading>
          <Title style={{ textAlign: "center" }}>{result}</Title>
        </View>
      )}
      <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
        <SavingModel visible={model} title="Predicting" />
        <Title>Disease Prediction</Title>
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
            let d = { ...data };
            d.age = parseInt(d.age ? d.age : 0);
            d.trestbps = parseInt(d.trestbps ? d.trestbps : 0);
            d.chol = parseInt(d.chol ? d.chol : 0);
            d.oldpeak = parseInt(d.oldpeak ? d.oldpeak : 0);
            d.thalach = parseInt(d.thalach ? d.thalach : 0);
            console.log(d);
            schema
              .validate(d, { abortEarly: true })
              .then(function (valid) {
                setModel(true);
                console.log(data);
                dispatch(
                  GET_PREDICTION(data, (v) => {
                    setModel(false);
                    setResult(v);
                  })
                );
              })
              .catch(({ errors }) => {
                console.log(errors);
                dispatch(ERROR({ content: errors[0], type: "error" }));
              });
          }}
        >
          Show Result
        </Button>
      </ScrollView>
    </View>
  );
};

export default PredictionModel;

const styles = StyleSheet.create({});
