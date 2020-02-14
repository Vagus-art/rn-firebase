import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import ActionButton from "../ActionButton";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  users: state.users
});

const Users = props => {
  return (
    <View style={styles.main}>
      {props.users && (
        <FlatList
          data={props.users}
          renderItem={ ({item}) => (
            <ListItem
              title={item.first}
              rightTitle={item.born}
              subtitle={item.last}
              key={item.id}
              onPress={() => props.navigation.push("ViewUser", {item:item})}
              bottomDivider
            />
          )}
        />
          )
          }
      <ActionButton touch={() => props.navigation.push("AddUser")} iconName="person-add"/>
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

export default connect(mapStateToProps, null)(Users);
