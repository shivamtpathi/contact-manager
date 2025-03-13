import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onEdit}>
      <View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phoneNumber}>
          {contact.phoneNumbers?.[0]?.number}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(contact.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 14,
    color: "gray",
  },
  delete: {
    color: "red",
  },
});

export default ContactItem; // ✅ Default export sahi se kar diya hai
