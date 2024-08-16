import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  Pressable,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

const menuItemsToDisplay = [
  {
    title: "Appetizers",
    data: [
      { name: "Hummus", price: "$5.00" },
      { name: "Moutabal", price: "$5.00" },
      { name: "Falafel", price: "$7.50" },
      { name: "Marinated Olives", price: "$5.00" },
      { name: "Kofta", price: "$5.00" },
      { name: "Eggplant Salad", price: "$8.50" },
    ],
  },
  {
    title: "Main Dishes",
    data: [
      { name: "Lentil Burger", price: "$10.00" },
      { name: "Smoked Salmon", price: "$14.00" },
      { name: "Kofta Burger", price: "$11.00" },
      { name: "Turkish Kebab", price: "$15.50" },
    ],
  },
  {
    title: "Sides",
    data: [
      { name: "Fries", price: "$3.00", id: "11K" },
      { name: "Buttered Rice", price: "$3.00" },
      { name: "Bread Sticks", price: "$3.00" },
      { name: "Pita Pocket", price: "$3.00" },
      { name: "Lentil Soup", price: "$3.75" },
      { name: "Greek Salad", price: "$6.00" },
      { name: "Rice Pilaf", price: "$4.00" },
    ],
  },
  {
    title: "Desserts",
    data: [
      { name: "Baklava", price: "$3.00" },
      { name: "Tartufo", price: "$3.00" },
      { name: "Tiramisu", price: "$5.00" },
      { name: "Panna Cotta", price: "$5.00" },
    ],
  },
];

const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.item}>{name}</Text>
    <Text style={menuStyles.item}>{price}</Text>
  </View>
);

const MenuItems = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={menuStyles.sectionHeader}>{title}</Text>
  );

  const getMenu = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json"
      );
      const json = await response.json();
      setData(json.menu);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <SafeAreaView style={menuStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
    // <View style={menuStyles.container}>

    //   {showMenu && (
    //     <SectionList
    //       keyExtractor={(item, index) => item + index}
    //       sections={menuItemsToDisplay}
    //       renderItem={renderItem}
    //       renderSectionHeader={renderSectionHeader}
    //     />
    //   )}
    // </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
  },
  linkText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "lightblue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  item: {
    fontSize: 20,
    color: "#F4CE14",
  },
  sectionHeader: {
    fontSize: 26,
    flexWrap: "wrap",
    backgroundColor: "grey",
    opacity: 0.8,
    textAlign: "center",
    color: "black",
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 40,
    backgroundColor: "#EDEFEE",
    borderColor: "#EDEFEE",
    borderWidth: 2,
    borderRadius: 12,
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 32,
  },
});

export default MenuItems;
