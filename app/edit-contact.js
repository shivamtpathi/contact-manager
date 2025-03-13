import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // ✅ Params ko lene ke liye
import { updateContact } from "../services/contactService";
import { SafeAreaView } from "react-native-safe-area-context";

const EditContact = () => {
  const router = useRouter();
  const {
    id,
    name: initialName,
    phoneNumber: initialPhoneNumber,
  } = useLocalSearchParams(); // ✅ Params ko receive karo

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ✅ Params ko state me set karo
  useEffect(() => {
    if (initialName) setName(initialName);
    if (initialPhoneNumber) setPhoneNumber(initialPhoneNumber);
  }, [initialName, initialPhoneNumber]);

  const handleSubmit = async () => {
    if (!name || !phoneNumber) {
      Alert.alert("Error", "Name and phone number are required");
      return;
    }

    try {
      // Update contact with the new values
      await updateContact(id, name, phoneNumber);

      Alert.alert("Success", "Contact updated successfully", [
        {
          text: "OK",
          onPress: () => {
            router.back(); // ✅ Back to previous screen after successful update
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update contact");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Update Contact" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default EditContact;

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});
