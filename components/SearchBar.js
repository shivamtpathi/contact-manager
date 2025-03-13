import React from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({ search, setSearch }) => (
  <TextInput
    style={styles.input}
    placeholder="Search Contacts..."
    value={search}
    onChangeText={setSearch}
  />
);

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 12,
  },
});
