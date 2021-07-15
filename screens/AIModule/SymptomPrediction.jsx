import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Select, CheckIcon } from "native-base";
import { Button, FAB, Subheading, Title } from "react-native-paper";
import { Icon } from "react-native-elements";
import SavingModel from "../../components/SavingModel";
import { GET_SYMPTOM_PREDICTION } from "../../redux/actions/AImoduleAction";
import { useDispatch } from "react-redux";
const SymptomPrediction = () => {
  const [symptomCount, setSymptomCount] = useState(["", "", ""]);
  const [result, setResult] = useState("");
  const [model, setModel] = useState(false);
  const dispatch = useDispatch();
  const [symptom, setSymptom] = useState({
    itching: 0,
    skin_rash: 0,
    nodal_skin_eruptions: 0,
    continuous_sneezing: 0,
    shivering: 0,
    chills: 0,
    joint_pain: 0,
    muscle_wasting: 0,
    vomiting: 0,
    fatigue: 0,
    weight_loss: 0,
    restlessness: 0,
    irregular_sugar_level: 0,
    cough: 0,
    high_fever: 0,
    breathlessness: 0,
    sweating: 0,
    headache: 0,
    yellowish_skin: 0,
    dark_urine: 0,
    nausea: 0,
    loss_of_appetite: 0,
    pain_behind_the_eyes: 0,
    back_pain: 0,
    abdominal_pain: 0,
    diarrhoea: 0,
    mild_fever: 0,
    yellow_urine: 0,
    yellowing_of_eyes: 0,
    acute_liver_failure: 0,
    swelled_lymph_nodes: 0,
    malaise: 0,
    blurred_and_distorted_vision: 0,
    phlegm: 0,
    throat_irritation: 0,
    redness_of_eyes: 0,
    sinus_pressure: 0,
    runny_nose: 0,
    congestion: 0,
    chest_pain: 0,
    fast_heart_rate: 0,
    obesity: 0,
    excessive_hunger: 0,
    extra_marital_contacts: 0,
    loss_of_smell: 0,
    muscle_pain: 0,
    red_spots_over_body: 0,
    dischromic_patches: 0,
    watering_from_eyes: 0,
    increased_appetite: 0,
    polyuria: 0,
    rusty_sputum: 0,
    receiving_blood_transfusion: 0,
    receiving_unsterile_injections: 0,
    stomach_bleeding: 0,
    lethargy: 0,
    patches_in_throat: 0,
  });

  const list = [
    {
      label: "Itching",
      var_name: "itching",
    },
    {
      label: "Skin Rash",
      var_name: "skin_rash",
    },
    {
      label: "Skin Eruptions",
      var_name: "nodal_skin_eruptions",
    },
    {
      label: "Continuos Sneezing",
      var_name: "continuous_sneezing",
    },
    {
      label: "Shivering",
      var_name: "shivering",
    },
    {
      label: "Chills",
      var_name: "chills",
    },
    {
      label: "Joint Pain",
      var_name: "joint_pain",
    },
    {
      label: "Muscle Wasting",
      var_name: "muscle_wasting",
    },
    {
      label: "Vomiting",
      var_name: "vomiting",
    },
    {
      label: "Fatigue",
      var_name: "fatigue",
    },
    {
      label: "Weight Loss",
      var_name: "weight_loss",
    },
    {
      label: "Restlessness",
      var_name: "restlessness",
    },
    {
      label: "Irregular Sugar Level",
      var_name: "irregular_sugar_level",
    },
    {
      label: "Cough",
      var_name: "cough",
    },
    {
      label: "High Fever",
      var_name: "high_fever",
    },
    {
      label: "Breathlessness",
      var_name: "breathlessness",
    },
    {
      label: "Sweating",
      var_name: "sweating",
    },
    {
      label: "Headache",
      var_name: "headache",
    },
    {
      label: "Yellowish Skin",
      var_name: "yellowish_skin",
    },
    {
      label: "Dark Urine",
      var_name: "dark_urine",
    },
    {
      label: "Nausea",
      var_name: "nausea",
    },
    {
      label: "Loss of Appetite",
      var_name: "loss_of_appetite",
    },
    {
      label: "Pain Behind the Eyes",
      var_name: "pain_behind_the_eyes",
    },
    {
      label: "Back Pain",
      var_name: "back_pain",
    },
    {
      label: "Abdominal Pain",
      var_name: "abdominal_pain",
    },
    {
      label: "Diarrhea",
      var_name: "diarrhoea",
    },
    {
      label: "Mild Fever",
      var_name: "mild_fever",
    },
    {
      label: "Yellow Urine",
      var_name: "yellow_urine",
    },
    {
      label: "Yellowing of Eyes",
      var_name: "yellowing_of_eyes",
    },
    {
      label: "Acute Liver Failure",
      var_name: "acute_liver_failure",
    },
    {
      label: "Swelled Lymph Nodes",
      var_name: "swelled_lymph_nodes",
    },
    {
      label: "Malaise",
      var_name: "malaise",
    },
    {
      label: "Blurred and Distorted Vision",
      var_name: "blurred_and_distorted_vision",
    },
    {
      label: "Phlegm",
      var_name: "phlegm",
    },
    {
      label: "Throat Irritation",
      var_name: "throat_irritation",
    },
    {
      label: "Redness of Eyes",
      var_name: "redness_of_eyes",
    },
    {
      label: "Sinus Pressure",
      var_name: "sinus_pressure",
    },
    {
      label: "Runny Nose",
      var_name: "runny_nose",
    },
    {
      label: "Congestion",
      var_name: "congestion",
    },
    {
      label: "Chest_pain",
      var_name: "chest_pain",
    },
    {
      label: "Fast Heart Rate",
      var_name: "fast_heart_rate",
    },
    {
      label: "Obesity",
      var_name: "obesity",
    },
    {
      label: "Excessive Hunger",
      var_name: "excessive_hunger",
    },
    {
      label: "Extra Marital Contacts",
      var_name: "extra_marital_contacts",
    },
    {
      label: "Loss of Smell",
      var_name: "loss_of_smell",
    },
    {
      label: "Muscle Pain",
      var_name: "muscle_pain",
    },
    {
      label: "Red Spots over Body",
      var_name: "red_spots_over_body",
    },
    {
      label: "Dichromic patches",
      var_name: "dischromic_patches",
    },
    {
      label: "Watering from Eyes",
      var_name: "watering_from_eyes",
    },
    {
      label: "Increased Appetite",
      var_name: "increased_appetite",
    },
    {
      label: "Polyuria",
      var_name: "polyuria",
    },
    {
      label: "Rusty Sputum",
      var_name: "rusty_sputum",
    },
    {
      label: "Receiving Blood Transfusion",
      var_name: "receiving_blood_transfusion",
    },
    {
      label: "Receiving Unsterile Injections",
      var_name: "receiving_unsterile_injections",
    },
    {
      label: "Stomach Bleeding",
      var_name: "stomach_bleeding",
    },
    {
      label: "Lethargy",
      var_name: "lethargy",
    },
    {
      label: "Patches in Throat",
      var_name: "patches_in_throat",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {result !== "" && result && (
        <View
          style={{
            padding: 14,
            backgroundColor: "#e57373",
          }}
        >
          <Subheading>Result:</Subheading>
          <Title style={{ textAlign: "center" }}>{result}</Title>
        </View>
      )}
      <SavingModel visible={model} title="Predicting" />
      <ScrollView style={{ margin: 20 }}>
        {symptomCount.map((item, i) => (
          <View key={i} style={{ marginVertical: 14 }}>
            <Text>Symptom {i + 1}</Text>
            <Select
              minWidth={200}
              selectedValue={item}
              placeholder={`Symptom ${i + 1}`}
              onValueChange={(itemValue) => {
                let a = { ...symptom };
                let b = [...symptomCount];
                console.log(Object.keys(a).length);
                if (symptomCount.includes(itemValue)) {
                  alert("Symptom Already Existed");
                } else {
                  if (a[symptomCount[i]]) {
                    a[b[i]] = 0;
                    b[i] = itemValue;
                    a[itemValue] = 1;
                  } else {
                    b[i] = itemValue;
                    a[itemValue] = 1;
                  }

                  setSymptom(a);
                  setSymptomCount(b);
                }
              }}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {list.map((value, i) => (
                <Select.Item
                  key={i}
                  label={value.label}
                  value={value.var_name}
                />
              ))}
            </Select>
          </View>
        ))}
        <Button
          mode="contained"
          onPress={() => {
            setModel(true);
            console.log(symptom);
            dispatch(
              GET_SYMPTOM_PREDICTION(symptom, (v) => {
                setModel(false);
                setResult(v);
              })
            );
          }}
        >
          Show Result
        </Button>
      </ScrollView>
      {symptomCount.length <= 17 && (
        <FAB
          style={styles.fab}
          animated={true}
          color="#fff"
          onPress={() => setSymptomCount([...symptomCount, ""])}
          icon="plus"
        />
      )}
    </View>
  );
};

export default SymptomPrediction;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 10,
    bottom: 20,
  },
});
