import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from 'redux/filterSlice';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import { addContact, deleteContact, fetchContacts } from '../redux/API';
import { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filterTerm = useSelector(selectFilter);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmitForm = e => {
    e.preventDefault();
    const contactName = e.target.elements.name.value;
    const contactNumber = e.target.elements.number.value;
    const newContact = {
      name: contactName,
      phone: contactNumber,
    };
    dispatch(addContact(newContact));

    if (contacts.some(i => i.name === contactName)) {
      alert(`You alraeady have a ${contactName} in contacts`);
      return;
    }
    e.target.reset();
  };

  const filterValue = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const handleDeleteContact = e => {
    dispatch(deleteContact(e.target.value));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h2>Phonebook</h2>
      <Phonebook onSubmit={handleSubmitForm} />

      <h2>Contacts</h2>
      <Filter filter={filterTerm} onChange={filterValue} />
      {isLoading && !error && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <Contacts
        contacts={contacts}
        filterTerm={filterTerm}
        onClick={handleDeleteContact}
      />
    </div>
  );
};
