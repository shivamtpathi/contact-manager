import * as Contacts from "expo-contacts";

export const addContact = async (contact) => {
  // Request permissions
  console.log("ffff", contact);
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission denied");
  }

  const newContact = {
    [Contacts.Fields.FirstName]: contact.firstName || "", // First name
    [Contacts.Fields.LastName]: contact.lastName || "", // Last name
    [Contacts.Fields.PhoneNumbers]: [
      {
        label: contact.phoneNumbers[0].label || "mobile",
        number: contact.phoneNumbers[0].number || "",
      },
    ],
    [Contacts.Fields.Emails]: [
      {
        label: contact.emailLabel || "work",
        email: contact.email || "",
      },
    ],
    [Contacts.Fields.Company]: contact.company || "",
  };

  try {
    const contactId = await Contacts.addContactAsync(newContact);
    console.log("Contact added with ID:", contactId);
    return contactId;
  } catch (error) {
    console.error("Failed to add contact:", error);
    throw new Error("Failed to add contact");
  }
};

// 📖 Read contacts
export const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    });
    return data.filter((contact) => contact.phoneNumbers);
  } else {
    throw new Error("Permission denied");
  }
};

// 📝 Update contact

export const updateContact = async (
  contactId,
  updatedName,
  updatedPhoneNumber
) => {
  console.log("test update", contactId, updatedName, updatedPhoneNumber);
  await deleteContact(contactId);

  //   const contact = {
  //     id: contactId,
  //     [Contacts.Fields.FirstName]: updatedName,
  //     [Contacts.Fields.Company]: updatedPhoneNumber,
  //   };
  await addContact({
    firstName: updatedName,
    lastName: "",
    phoneNumbers: [
      {
        label: "mobile",
        number: updatedPhoneNumber,
      },
    ],
  });
  //   await Contacts.updateContactAsync(contact);
  console.log("added ====updated");
};

//  Delete contact
export const deleteContact = async (id) => {
  await Contacts.removeContactAsync(id);
};
