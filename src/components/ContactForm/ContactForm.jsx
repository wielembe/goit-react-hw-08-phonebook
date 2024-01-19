import { v4 as uuidv4 } from 'uuid';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import { Button, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    if (contacts.find(contact => contact.name === newName)) {
      alert(`${newName} is already in your contact list.`);
    } else if (
      contacts.filter(contact => contact.number.includes(newNumber)).length
    ) {
      alert(`${newName} cannot have the same number as your other contact.`);
    } else if (newName !== '' || newNumber !== '') {
      dispatch(
        addContact({
          name: newName,
          number: newNumber,
        })
      );
      form.reset();
    }
  };
  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <TextField
        size="small"
        className={css.contactForm__input}
        label="Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+([ -'][a-zA-Zа-яА-Я]+)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={uuidv4()}
        required
      />
      <TextField
        size="small"
        className={css.contactForm__input}
        label="Number"
        type="tel"
        name="number"
        pattern="^[+]?[0-9 \u0028\u0029\u002D]*$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={uuidv4()}
        required
      />
      <Button variant="outlined" type="submit">
        <PersonIcon /> Add contact
      </Button>
    </form>
  );
};
