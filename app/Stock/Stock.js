import React, { useState } from "react";
import { StyleSheet, View, SectionList } from "react-native";
import { ListItem, Divider, SearchBar } from "react-native-elements";
import AddCategoryOverlay from "./AddCategoryOverlay";
import AddItemOverlay from "./AddItemOverlay";
import LongPressOverlayMenu from "./LongPressOverlayMenu";
import ActionButton from "../ActionButton";
import { connect } from "react-redux";
import { pushToCategory, deleteCategory, deleteItem, createCategory } from "../lib/Helpers";

const mapStateToProps = state => ({
  stock: state.stock
});

const Stock = props => {
  const [AddItemisVisible, toggleItemOverlay] = useState(false);
  const [AddCategoryisVisible, toggleCategoryOverlay] = useState(false);
  const [categoryLongPress, toggleCategoryLongPress] = useState(false);
  const [itemLongPress, toggleItemLongPress] = useState(false);

  /*
  Currentoption guarda cual fue el item que presionate, en caso de ser categoría, por ej, es lo que permite
  al helper saber a que categoría agregar los items/ que categoria eliminar, etc
  */

  const [currentOption, setCurrentOption] = useState(null);

  /* 
  Estos arrays definen las opciones de los menus en longpress, de los items y las categorias,
  title es el titulo del boton, y function es lo que se ejecuta al presionarlos.
  los arrays son mappeados en el componente, por eso la estructura.
  */

  const categoryMenu = [
    {
      title: "Agregar item",
      function: () => toggleItemOverlay(!AddItemisVisible),
    },
    {
      title: "Cambiar nombre",
      function: () => alert(JSON.stringify(currentOption))
    },
    {
      title: "Eliminar categoría",
      function: ({title})=>deleteCategory(title)
    }   
  ];
  const itemMenu = [
    {
      title: "Cambiar nombre",
      function: () => alert(JSON.stringify(currentOption))
    },
    {
      title: "Cambiar stock",
      function: () => alert("cambiar stock")
    },
    {
      title: "Eliminar item",
      function: () => deleteItem(currentOption.category,currentOption.key)
    }
  ];

  //agrega un item a la categoría que presionaste (sacada de currentoption)

  const addItem = (item) => {
    const category = currentOption.title;
    pushToCategory(category,item);
  }

  return (
    <View style={styles.main}>
      <SearchBar placeholder="Buscar..." lightTheme />
      {
        //mappeado de los items en secciones
        <SectionList
          renderItem={({ item }) => item.name?
            <ListItem
              title={item.name}
              rightTitle={item.quantity}
              contentContainerStyle={{ paddingLeft: 20 }}
              onLongPress={() => {setCurrentOption(item);toggleItemLongPress(!itemLongPress)}}
            /> : null
          }
          renderSectionHeader={({ section }) => (
            <ListItem
              title={section.title}
              containerStyle={{ backgroundColor: "#d3d3d3" }}
              onPress={() => {setCurrentOption(section);toggleItemOverlay(!AddItemisVisible)}}
              onLongPress={() => {setCurrentOption(section);toggleCategoryLongPress(!categoryLongPress)}}
              bottomDivider
            />
          )}
          sections={props.stock}
          ItemSeparatorComponent={() => <Divider />}
        />
      }
      <AddItemOverlay
        isVisible={AddItemisVisible}
        toggle={toggleItemOverlay}
        function={addItem}
      />
      <AddCategoryOverlay
        isVisible={AddCategoryisVisible}
        toggle={toggleCategoryOverlay}
        function={createCategory}
      />
      {/* Menu de categorías */}
      <LongPressOverlayMenu
        isVisible={categoryLongPress}
        toggle={toggleCategoryLongPress}
        menuData={categoryMenu}
        option={currentOption}
      />
      {/* Menu de items */}
      <LongPressOverlayMenu
        isVisible={itemLongPress}
        toggle={toggleItemLongPress}
        menuData={itemMenu}
        option={currentOption}
      />
      {/* Este ActionButton sirve para agregar categorías a la lista */}
      <ActionButton
        touch={() => toggleCategoryOverlay(!AddCategoryisVisible)}
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
