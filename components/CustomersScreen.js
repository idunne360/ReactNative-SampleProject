import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite/legacy";
import {
  IconButton,
  Provider,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import asyncAlert from "./asyncAlert";

const db = SQLite.openDatabase("little_lemon");

export default function CustomersScreen() {
  const [textInputValue, setTextInputValue] = useState("");
  const [dialog, setDialog] = useState({
    customer: {},
    isVisible: false,
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists customers (id integer primary key not null, uid text, name text);"
      );
      tx.executeSql("select * from customers", [], (_, { rows }) => {
        const customers = rows._array.map((item) => ({
          uid: item.uid,
          name: item.name,
        }));
        setCustomers(customers);
      });
    });
  }, []);

  const showDialog = (customer) =>
    setDialog({
      isVisible: true,
      customer,
    });

  const hideDialog = (updatedCustomer) => {
    setDialog({
      isVisible: false,
      customer: {},
    });
    const newCustomers = customers.map((customer) => {
      if (customer.uid !== updatedCustomer.uid) {
        return customer;
      }

      return updatedCustomer;
    });

    setCustomers(newCustomers);
    // Edit customer from DB
    db.transaction((tx) => {
      tx.executeSql(
        `update customers set uid=?, name=? where uid=${updatedCustomer.uid}`,
        [updatedCustomer.uid, updatedCustomer.name]
      );
    });
  };

  const deleteCustomer = async (customer) => {
    const shouldDelete = await asyncAlert({
      title: "Delete customer",
      message: `Are you sure you want to delete the customer named "${customer.name}"?`,
    });
    if (!shouldDelete) {
      return;
    }
    const newCustomers = customers.filter((c) => c.uid !== customer.uid);
    setCustomers(newCustomers);
    // SQL transaction to delete item based on uid
    db.transaction((tx) => {
      tx.executeSql("delete from customers where uid = ?", [customer.uid]);
    });
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Little Lemon Customers</Text>
          <TextInput
            placeholder="Enter the customer name"
            value={textInputValue}
            onChangeText={(data) => setTextInputValue(data)}
            underlineColorAndroid="transparent"
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            disabled={!textInputValue}
            onPress={() => {
              const newValue = {
                uid: Date.now().toString(),
                name: textInputValue,
              };
              setCustomers([...customers, newValue]);
              db.transaction((tx) => {
                tx.executeSql(
                  "insert into customers (uid, name) values(?, ?)",
                  [newValue.uid, newValue.name]
                );
              });
              setTextInputValue("");
            }}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}> Save Customer </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.customerName}>Customers: </Text>
            {customers.map((customer) => (
              <View style={styles.customer}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <View style={styles.icons}>
                  <IconButton
                    icon="pen"
                    size={24}
                    onPress={() => showDialog(customer)}
                  />
                  <IconButton
                    icon="delete"
                    size={24}
                    onPress={() => deleteCustomer(customer)}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        <Portal>
          <Dialog visible={dialog.isVisible} onDismiss={hideDialog}>
            <Dialog.Title>Edit Customer name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={dialog.customer.name}
                onChangeText={(text) =>
                  setDialog((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      name: text,
                    },
                  }))
                }
                underlineColorAndroid="transparent"
                style={styles.textInputStyle}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDialog(dialog.customer)}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  switch: {
    color: "#EDEFEE",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EDEFEE",
    marginBottom: 20,
  },
  textInputStyle: {
    height: 40,
    borderColor: "#EDEFEE",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#EDEFEE",
  },
  buttonStyle: {
    backgroundColor: "#F4CE14",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  customer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  customerName: {
    fontSize: 18,
    color: "#333333",
  },
  icons: {
    flexDirection: "row",
  },
});
