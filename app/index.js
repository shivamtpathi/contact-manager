import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native"; // ✅ Add this
import SearchBar from "../components/SearchBar";
import ContactItem from "../components/ContactItem";
import { deleteContact, getContacts } from "../services/contactService";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // First time render ke liye load karo
  useEffect(() => {
    loadContacts();
  }, []);

  // Screen ke focus hone par loadContacts call karo
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteContact(id);
            loadContacts(); // Refresh contacts
          },
        },
      ]
    );
  };

  // Search filter ko handle karo
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onDelete={handleDelete}
            onEdit={() =>
              router.push({
                pathname: `/edit-contact`,
                params: {
                  id: item.id,
                  name: item.name,
                  phoneNumber: item.phoneNumbers[0]?.number,
                },
              })
            }
          />
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-contact")}
      >
        <Text style={styles.addButtonText}>+ Add Contact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
