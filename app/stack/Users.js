import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { getCollections } from "../firebaseActions";
import ActionButton from "../ActionButton";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: payload => dispatch({ type: "GET_USERS", payload })
});

const Users = props => {
  useEffect(() => {
    getCollections().then(data => props.getUsers(data));
  }, []);
  return (
    <View style={styles.main}>
      {props.users && (
        <FlatList
          data={props.users}
          renderItem={ ({item}) => (
            <ListItem
              title={item.data.first}
              rightTitle={item.data.born}
              key={item.id}
              subtitle={"Dirección: " + item.data.last}
              onPress={() => props.navigation.push("ViewUser", {item:item})}
              bottomDivider
            />
          )}
        />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
