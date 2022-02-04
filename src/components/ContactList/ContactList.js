import { useMemo } from "react";
import ContactItem from "../ContactItem/ContactItem";
import { getFilter } from "../../redux/Contacts/contacts-selectors";
import { useSelector } from "react-redux";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from "../../redux/Contacts/contacts-slice";

function ContactList() {
  const { data, error, isFetching } = useFetchContactsQuery();
  const filter = useSelector(getFilter);
  const [deleteContact] = useDeleteContactMutation();

  const filteredArray = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return data?.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [data, filter]);

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
