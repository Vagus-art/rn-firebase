import React, { useState } from "react";
import { StyleSheet, View, SectionList } from "react-native";
import { Overlay, Input, ListItem, Divider } from "react-native-elements";
import ActionButton from "../ActionButton";
import { connect } from "react-redux";
import { pushToCategory } from "../lib/Helpers";

const mapStateToProps = state => ({
  stock: state.stock
});

const Stock = props => {
  const [isVisible, toggleOverlay] = useState(false);
  const [category, setCategory] = useState(false);

  return (
    <View style={styles.main}>
      {
        <SectionList
          renderItem={({ item }) => (
            <ListItem title={item.name} rightTitle={item.quantity} contentContainerStyle={{paddingLeft:20}}/>
          )}
          renderSectionHeader={({ section }) => (
            <ListItem
              title={section.title}
              containerStyle={{ backgroundColor: "#d3d3d3" }}
              onPress={() => toggleOverlay(!isVisible)}
              bottomDivider
            />
          )}
          sections={props.stock}
          ItemSeparatorComponent={()=><Divider />}
        />
      }
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
          label="Agregar item"
          placeholder="Nombre"
          leftIcon={{ name: "list" }}
          containerStyle={{ margin: 20 }}
          leftIconContainerStyle={{ marginLeft: 5, marginRight: 5 }}
          onChangeText={text => setCategory(text)}
        />
      </Overlay>
      <ActionButton
        touch={() => props.navigation.push("AddStock")}
        iconName="add"
      />
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
