import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  stockValue: state.stockValue
});

const Balance = props => {
  return (
    <View style={styles.main}>
      <Card>
        <Text h4 style={styles.cardTitle}>
          Valor en Stock
        </Text>
        <Divider style={styles.cardDivider}></Divider>
        <View style={styles.flexRow}>
          <View>
            <Text>Unidades: {props.stockValue.itemCounter}</Text>
          </View>
          <View>
            <Text>Valor acumulado: ${props.stockValue.moneyCounter}</Text>
          </View>
        </View>
      </Card>
      <Card>
        <Text h4 style={styles.cardTitle}>
          Fondos registrados
        </Text>
        <Divider style={styles.cardDivider}></Divider>
      </Card>
      <Card>
        <Text h4 style={styles.cardTitle}>
          Deudas acumuladas
        </Text>
        <Divider style={styles.cardDivider}></Divider>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll"
  },
  cardTitle: {
    width: "auto",
    textAlign: "center",
    opacity: 0.7
  },
  cardDivider: {
    margin: 10
  },
  flexRow: {
    flex: 1,
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default connect(mapStateToProps, null)(Balance);
