import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MedicalStatusCard from "../../components/Card/MedicalStatusCard";
import MedicalStatusInsertion from "../../components/Insertion/MedicalStatusInsertion";
import Loading from "../../components/Loading";
import { USER_INFORMATION } from "../../redux/actions/UserActions";

const MedicalHistoryScreen = () => {
  const paper = useTheme();
  const list = [1, 2, 34, 5, 8];
  const navigation = useNavigation();
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { medical_status } = useSelector((state) => state.Language.Lang);
  const info = useSelector((state) => state.User.info);
  const user = useSelector((state) => state.User.TOKKEN);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ title: medical_status.title });
    navigation.addListener("focus", () => {
      dispatch(
        USER_INFORMATION("medicineStatus", user._id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [medical_status, info]);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1, backgroundColor: paper.colors.background }}>
        {!edit ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
          >
            {info?.medicine_status?.map(
              (item, i) =>
                item.status && (
                  <MedicalStatusCard key={i} data={item} id={user?._id} />
                )
            )}
          </ScrollView>
        ) : (
          <MedicalStatusInsertion
            id={user._id}
            handelButton={() => setedit(!edit)}
          />
        )}
        <View style={{ height: 80 }}></View>
        {!edit && (
          <FAB
            style={styles.fab}
            icon={edit ? "content-save" : "pencil"}
            animated={true}
            color="#fff"
            onPress={() => setedit(!edit)}
          />
        )}
      </View>
    );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 25,
    right: 20,
    bottom: 0,
  },
});
