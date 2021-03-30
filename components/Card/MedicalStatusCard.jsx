import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Text, Card, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { USER_MEDICAL_STATUS_CHANGE } from "../../redux/actions/UserActions";
import SavingModel from "../SavingModel";

const MedicalHistoryCard = ({ id, data }) => {
  const navigation = useNavigation();
  const { medical_status } = useSelector((state) => state.Language.Lang);
  const iseng = useSelector((state) => state.Language.ISENGLISH);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const EnglishDisplay = () => {
    return (
      <Card style={{ margin: 20 }}>
        <List.Item
          title={medical_status.medicine}
          left={(props) => <List.Icon {...props} icon="pill" color="#4caf50" />}
          style={{ textAlign: "center" }}
          right={() => (
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {data?.medicine}
            </Text>
          )}
        />
        <List.Item
          title={medical_status.dosage}
          left={(props) => (
            <List.Icon {...props} icon="scale" color="#ab003c" />
          )}
          style={{ textAlign: "center" }}
          right={() => (
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {data?.dosage}
            </Text>
          )}
        />
        <List.Item
          title={medical_status.description}
          left={(props) => (
            <Icon
              {...props}
              name="description"
              type="material"
              color="#651fff"
              style={{ margin: 7 }}
            />
          )}
          titleStyle={{ marginLeft: 18 }}
          style={{ textAlign: "center" }}
          right={() => (
            <Text style={{ alignSelf: "center" }}>{data?.description}</Text>
          )}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Pictures", { pic: data?.pic });
          }}
        >
          <List.Item
            title={medical_status.pic}
            left={(props) => (
              <Icon
                {...props}
                name="md-image"
                type="ionicon"
                color="#00b0ff"
                style={{ margin: 7 }}
              />
            )}
            titleStyle={{ marginLeft: 18 }}
            right={(props) => (
              <Icon
                {...props}
                name="ios-arrow-forward"
                type="ionicon"
                style={{ margin: 7 }}
              />
            )}
          />
        </TouchableOpacity>
        <View
          style={{
            margin: 7,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.btn_edit}
            onPress={() =>
              navigation.push("Edit Medical Status", {
                data,
                forEdit: true,
                id,
              })
            }
          >
            <Icon
              name="pencil"
              type="material-community"
              color="#4caf50"
              size={16}
            />
            <Text style={{ paddingLeft: 7, fontSize: 18 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_del}
            onPress={() => {
              let d = { id, medicine_id: data._id };
              setVisible(true);
              dispatch(
                USER_MEDICAL_STATUS_CHANGE(d, () =>
                  setTimeout(() => {
                    setVisible(false);
                  }, 1000)
                )
              );
            }}
          >
            <Icon
              name="trash"
              type="font-awesome-5"
              color="#ff1744"
              size={16}
            />
            <Text style={{ paddingLeft: 7, fontSize: 18 }}>Delete</Text>
          </TouchableOpacity>
        </View>
        <SavingModel visible={visible} />
      </Card>
    );
  };

  const UrduDisplay = () => {
    return (
      <Card style={{ marginVertical: 10 }}>
        <List.Item
          title={medical_status.medicine}
          right={(props) => (
            <List.Icon {...props} icon="pill" color="#4caf50" />
          )}
          titleStyle={{ textAlign: "right" }}
          left={() => (
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {data?.medicine}
            </Text>
          )}
        />
        <List.Item
          title={medical_status.dosage}
          right={(props) => (
            <List.Icon {...props} icon="scale" color="#ab003c" />
          )}
          titleStyle={{ textAlign: "right" }}
          left={() => (
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
              {data?.dosage}
            </Text>
          )}
        />
        <List.Item
          title={medical_status.description}
          right={(props) => (
            <Icon
              {...props}
              name="description"
              type="material"
              color="#651fff"
              style={{ margin: 7 }}
            />
          )}
          titleStyle={{ textAlign: "right" }}
          left={() => (
            <Text style={{ alignSelf: "center" }}>{data?.dosage}</Text>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Pictures");
          }}
        >
          <List.Item
            title={medical_status.pic}
            right={(props) => (
              <Icon
                {...props}
                name="md-image"
                type="ionicon"
                color="#00b0ff"
                style={{ margin: 7 }}
              />
            )}
            titleStyle={{ textAlign: "right" }}
            left={(props) => (
              <Icon
                {...props}
                name="ios-arrow-back"
                type="ionicon"
                style={{ margin: 7 }}
              />
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={btn_del}
          onPress={() => {
            let d = { id, medicine_id: data._id };
            setVisible(true);
            dispatch(
              USER_MEDICAL_STATUS_CHANGE(d, () =>
                setTimeout(() => {
                  setVisible(false);
                }, 3000)
              )
            );
          }}
        >
          <Icon name="trash" type="font-awesome-5" color="#ff1744" size={16} />
          <Text style={{ paddingLeft: 7, fontSize: 18 }}>حذف کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btn_edit}
          onPress={() =>
            navigation.push("Edit Medical Status", {
              data,
              forEdit: true,
              id,
            })
          }
        >
          <Icon
            name="pencil"
            type="material-community"
            color="#4caf50"
            size={16}
          />
          <Text style={{ paddingLeft: 7, fontSize: 18 }}>ترمیم کریں</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {iseng ? <EnglishDisplay /> : <UrduDisplay />}
    </View>
  );
};

export default MedicalHistoryCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 25,
    right: 0,
    bottom: 0,
  },
  btn_edit: {
    alignSelf: "flex-end",
    margin: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#4caf50",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 7,
    borderRadius: 7,
  },
  btn_del: {
    alignSelf: "flex-end",
    margin: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ff1744",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 7,
    borderRadius: 7,
  },
});
