import React, { useState } from "react";
import { StyleSheet, View, SectionList } from "react-native";
import { ListItem, Divider, SearchBar } from "react-native-elements";
import CategoryOverlay from "../../UI/CategoryOverlay";
import ItemOverlay from "../../UI/ItemOverlay";
import LongPressOverlayMenu from "../../UI/LongPressOverlayMenu";
import ActionButton from "../../UI/ActionButton";
import { connect } from "react-redux";
import {
  pushToCategory,
  deleteCategory,
  deleteItem,
  updateItem,
  createCategory,
  renameCategory,
  insertToCategory
} from "../../lib/Helpers";

const mapStateToProps = state => ({
  stock: state.stock
});

const Stock = props => {
  const [search, setSearch] = useState(null);

  const updateSearch = search => {
    setSearch(search);
  };
  
  //const [filteredStock, setFilteredStock] = useState(props.stock);

  //add item/ category menu visibility
  const [AddItemisVisible, toggleItemOverlay] = useState(false);
  const [modifyItemisVisible, toggleModifyItemOverlay] = useState(false);
  const [modifyItemCategoryisVisible, toggleModifyItemCategoryOverlay] = useState(
    false
  );


  //modify item/ category menu visibility
  const [AddCategoryisVisible, toggleCategoryOverlay] = useState(false);
  const [modifyCategoryisVisible, toggleModifyCategoryOverlay] = useState(
    false
  );

  //self explanatory
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
      function: () => toggleItemOverlay(!AddItemisVisible)
    },
    {
      title: "Cambiar nombre",
      function: () => toggleModifyCategoryOverlay(!modifyCategoryisVisible)
    },
    {
      title: "Eliminar categoría",
      function: ({ title }) => deleteCategory(title)
    }
  ];
  const itemMenu = [
    {
      title: "Modificar",
      function: () => toggleModifyItemOverlay(!modifyItemisVisible)
    },
    {
      title: "Mover a otra categoría",
      function: () => toggleModifyItemCategoryOverlay(!modifyItemCategoryisVisible)
    },
    {
      title: "Eliminar item",
      function: () => deleteItem(currentOption.category, currentOption.key)
    }
  ];

  //estas funciones son las que ejecutan los overlays, son funciones de un rango mas alto para que desde los
  //componentes overlay solo se necesite pasar los estados como argumento, haciendo que sean componentes reusables
  //para tanto creacion como modificacion

  //currentOption es un estado que guarda el item que presionaste, asi sacando la informacion necesaria
  //para actualizar el elemento especifico en la base de datos
  //las categorias y los items tienen diferentes propiedades, eso se tiene en cuenta implicitamente
  //en las funciones

  const addItem = item => {
    const category = currentOption.title;
    pushToCategory(category, item);
  };

  const modifyCategory = renamedCategory => {
    const category = currentOption.title;
    renameCategory(category, renamedCategory);
  };

  const modifyItem = item => {
    const category = currentOption.category;
    const key = currentOption.key;
    updateItem(category, key, item);
  };

  const moveToCategory = destiny => {
    const oldCategory = currentOption.category;
    const {key, name, quantity} = currentOption;
    insertToCategory(destiny,{ key, name, quantity });
    deleteItem(oldCategory,key);
  }

  

  return (
    <View style={styles.main}>
      {/* Barra de busqueda, aun no funciona */}
      <SearchBar
        value={search}
        onChangeText={text => updateSearch(text)}
        placeholder="Buscar..."
        lightTheme
      />
      {
        //mappeado de los items en secciones
        <SectionList
          renderItem={({ item }) =>
            item.name ? (
              <ListItem
                title={item.name}
                rightTitle={item.quantity}
                contentContainerStyle={{ paddingLeft: 20 }}
                onLongPress={() => {
                  setCurrentOption(item);
                  toggleItemLongPress(!itemLongPress);
                }}
              />
            ) : null
          }
          renderSectionHeader={({ section }) => (
            <ListItem
              title={section.title}
              containerStyle={{ backgroundColor: "#d3d3d3" }}
              onPress={() => {
                setCurrentOption(section);
                toggleItemOverlay(!AddItemisVisible);
              }}
              onLongPress={() => {
                setCurrentOption(section);
                toggleCategoryLongPress(!categoryLongPress);
              }}
              bottomDivider
              topDivider
            />
          )}
          sections={props.stock}
          ItemSeparatorComponent={() => <Divider />}
        />
      }

      {/* ACTION BUTTON QUE AGREGA CATEGORÍAS */}
      <ActionButton
        touch={() => toggleCategoryOverlay(!AddCategoryisVisible)}
        iconName="add"
      />
      {/* MENU DEL ACTION BUTTON */}
      {/* Agregar categoría */}
      <CategoryOverlay
        label="Agregar categoría"
        isVisible={AddCategoryisVisible}
        toggle={toggleCategoryOverlay}
        function={createCategory}
      />

      {/* MENU LONGPRESS DE CATEGORíAS */}
      <LongPressOverlayMenu
        isVisible={categoryLongPress}
        toggle={toggleCategoryLongPress}
        menuData={categoryMenu}
        option={currentOption}
      />

      {/* OPCIONES DEL MENU LONGPRESS DE CATEGORÍA */}
      {/* Agregar item a categoría */}
      <ItemOverlay
        nameLabel="Agregar item"
        quantityLabel="Cantidad"
        isVisible={AddItemisVisible}
        toggle={toggleItemOverlay}
        function={addItem}
      />  
      {/* Renombrar categoría */}
      <CategoryOverlay
        label="Renombrar categoría"
        isVisible={modifyCategoryisVisible}
        toggle={toggleModifyCategoryOverlay}
        function={modifyCategory}
      />

      {/* MENU LONGPRESS DE ITEMS */}
      <LongPressOverlayMenu
        isVisible={itemLongPress}
        toggle={toggleItemLongPress}
        menuData={itemMenu}
        option={currentOption}
      />
      
      {/* OPCIONES DEL MENU LONGPRESS DE ITEMS */}
      {/* Modificar item */}
      <ItemOverlay
        nameLabel="Nuevo nombre"
        option={currentOption}
        quantityLabel="Cantidad"
        isVisible={modifyItemisVisible}
        toggle={toggleModifyItemOverlay}
        function={modifyItem}
      />
      {/* Cambiar categoría de item */}
      <CategoryOverlay
        label="Categoría destino"
        isVisible={modifyItemCategoryisVisible}
        toggle={toggleModifyItemCategoryOverlay}
        function={moveToCategory}
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
