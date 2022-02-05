import { createSelector } from "@reduxjs/toolkit";
import ContactItem from "../ContactItem/ContactItem";
import {
  getContacts,
  getFilter,
} from "../../redux/Contacts/contacts-selectors";
import { useSelector } from "react-redux";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from "../../redux/Contacts/contacts-slice";

function ContactList() {
  const { error, isFetching } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const getFilteredArray = createSelector(
    [getContacts, getFilter],
    (contacts, filter) => {
      if (!contacts || contacts.length === 0) return [];
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  );
  const filteredArray = useSelector(getFilteredArray);

  return (
    <>
      {isFetching && <h1>Загрузка...</h1>}
      {
        <ul>
          {filteredArray?.map((contact) => {
            return (
              <ContactItem
                key={contact.id}
                contact={contact}
                deleteContact={deleteContact}
              />
            );
          })}
        </ul>
      }
      {filteredArray?.length === 0 && <p>Ничего не найдено :/</p>}
      {error && <p>Произошла ошибка :/</p>}
    </>
  );
}

export default ContactList;
