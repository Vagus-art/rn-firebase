import React, { useState } from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
import {
  CheckBox,
  Overlay,
  Input,
  Button
} from "react-native-elements";
import ActionButton from "../ActionButton";
import { connect } from "react-redux";
import firebase from "../firebase";

const mapStateToProps = state => ({
  stock: state.stock
});

const Stock = props => {
  const [isVisible, toggleOverlay] = useState(false);
  const [category, setCategory] = useState(false);
  const onSaveCategory = () => {
    if (category) {
      const key = firebase.ref("/users").push().key;
      firebase
        .ref("/rnfirebase/stock/" + key + "/")
        .update({
          categoryName: category,
          id: key
        });
      props.navigation.goBack();
    }
    else alert("Escribe el nombre de la categoría")
  };
  return (
    <View style={styles.main}>
      <CheckBox
        center
        title="Agregar categoría"
        iconLeft
        uncheckedIcon="plus"
        onPress={() => toggleOverlay(!isVisible)}
      />
      <Overlay
        overlayStyle={{
          alignItems: "center",
          justifyContent: "center",
          height: 200,
          width: 300
        }}
        isVisible={isVisible}
        onBackdropPress={() => toggleOverlay(!isVisible)}
      >
        <Input
          label="Agregar Categoría"
          placeholder="Nombre"
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 20 }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setCategory(text)}
        />
        <Button
          icon={{
            name: "check",
            size: 15,
            color: "white"
          }}
          title="Guardar"
          onPress={() => onSaveCategory()}
        />
      </Overlay>
      <ActionButton touch={() => alert("something")} iconName="add" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll"
  }
});

export default connect(mapStateToProps, null)(Stock);
