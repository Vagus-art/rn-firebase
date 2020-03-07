import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import ActionButton from "../../UI/ActionButton";
import { connect } from "react-redux";
import PersonTemplate from "../../UI/templates/PersonTemplate";

const mapStateToProps = state => ({
  users: state.users
});

const Users = props => {
  const [search, setSearch] = useState(null);

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View style={styles.main}>
      {/* Barra de busqueda, aun no funciona */}
      <SearchBar
        value={search}
        onChangeText={text => updateSearch(text)}
        placeholder="Buscar..."
        lightTheme
      />
      {props.users && (
        <FlatList
          data={props.users}
          renderItem={ ({item}) => (
            <PersonTemplate
              name={item.name}
              phone={item.phone}
              adress={item.adress}
              key={item.id}
              touch={() => props.navigation.push("ViewUser", {item:item})}
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
