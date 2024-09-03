import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Alert,
  Image,
  Pressable,
} from "react-native";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SQLite from "expo-sqlite/legacy";
const db = SQLite.openDatabase("little_lemon");

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const sections = ["Starters", "Mains", "Desserts"];

const images = {
  "bruschetta.jpg": require("../img/bruschetta.jpg"),
  "greekSalad.jpg": require("../img/greekSalad.jpg"),
  "grilledFish.jpg": require("../img/grilledFish.jpg"),
  "pasta.jpg": require("../img/pasta.jpg"),
  "lemonDessert.jpg": require("../img/lemonDessert.jpg"),
};

const Item = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
    <Image style={styles.itemImage} source={images[image]} />
  </View>
);

const MenuItems = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  /*
  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={menuStyles.sectionHeader}>{title}</Text>
  );
  */

  const getMenu = async () => {
    let counter = 1;
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = json.menu.reduce((sections, item) => {
        const section = sections.find((sec) => sec.title === item.category);
        const newItem = {
          id: counter++,
          name: item.name,
          price: item.price.toString(),
          description: item.description,
          image: item.image,
        };
        if (section) {
          section.data.push(newItem);
        } else {
          sections.push({
            title: item.category,
            data: [newItem],
          });
        }
        return sections;
      }, []);
      setData(menu);
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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          style={styles.sectionList}
          sections={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              style={styles.item}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ffef",
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
  sectionHeader: {
    fontSize: 26,
    flexWrap: "wrap",
    backgroundColor: "#495e57",
    opacity: 0.8,
    textAlign: "center",
    color: "#FFFFFF",
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#cccccc",
    paddingVertical: 10,
    borderColor: "#495e57",
    borderWidth: 4,
    borderTopWidth: 0,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#495e57",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 20,
    color: "#000000",
    paddingBottom: 5,
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    color: "#495e57",
    paddingTop: 5,
  },
  itemHeader: {
    fontSize: 24,
    backgroundColor: "gray",
    color: "#333333",
    textAlign: "center",
  },
  sectionList: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: "#495E57",
  },
  searchField: {
    backgroundColor: "#EDEFEE",
    color: "#333333",
  },
  searchContainer: {
    backgroundColor: "#495E57",
    padding: 10,
  },
});

export default MenuItems;
