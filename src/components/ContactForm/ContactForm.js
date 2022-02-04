import { useState } from "react";
import { Container, Field } from "./ContactForm.styled";
import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from "../../redux/Contacts/contacts-slice";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { data } = useFetchContactsQuery();
  const [createContact] = useCreateContactMutation();

  const handleChange = (value, name) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const findDuplicateContact = (array, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return array.some(
      (contact) => contact.name.toLowerCase() === normalizedFilter
    );
  };

  const onAddContact = () => {
    const filteredArray = findDuplicateContact(data, name);
    if (filteredArray) {
      alert(`${name} is already in contacts.`);
      return;
    }
    createContact({ name, phone });
    setName("");
    setPhone("");
  };

  const isInputNameEmpty = !name;
  const isInputPhoneEmpty = !phone;

  return (
    <Container>
      <Field>
        <label>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={name}
        />
      </Field>

      <Field>
        <label>Number</label>
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={(event) => {
            const { value, name } = event.currentTarget;
            handleChange(value, name);
          }}
          value={phone}
        />
      </Field>

      <button
        type="button"
        name="add"
        onClick={() => onAddContact()}
        disabled={isInputNameEmpty || isInputPhoneEmpty}
      >
        Add contact
      </button>
    </Container>
  );
}

export default ContactForm;
