import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "../../../../UI/ActionButton";
import TradeTemplate from "../../../../UI/templates/TradeTemplate";
import { SearchBar } from "react-native-elements";

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  }
});

export default Purchases = props => {
  const [search, setSearch] = useState(null);

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <View style={styles.MainContainer}>
      {/* Barra de busqueda, aun no funciona */}
      <SearchBar
        value={search}
        onChangeText={text => updateSearch(text)}
        placeholder="Buscar..."
        lightTheme
      />
      <ActionButton
        touch={() => toggleCategoryOverlay(!AddCategoryisVisible)}
        iconName="add"
      />
      <TradeTemplate person="Especias" sum="160" item="2 Orégano 1kg" touch={()=>alert("touch")} />
    </View>
  );
};
