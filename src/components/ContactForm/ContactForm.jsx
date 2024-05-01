import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './ContactForm.module.css';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = ({ onSubmit }) => {
  const initialContactValues = {
    name: '',
    number: '',
  };
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = values;
    dispatch(addContact(newContact));
    onSubmit();
    toast.success('New contact added');

    actions.resetForm();
  };

  // validation schema
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required').trim(),
    number: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{4}$/g, 'The number format must be xxx-xxx-xxxx')
      .required('Required')
      .trim(),
  });

  return (
    <div>
      <div className={css.close_btn}>
        <button
          type="button"
          onClick={() => {
            onSubmit();
          }}
        >
          ✖️
        </button>
      </div>
      <Formik
        initialValues={initialContactValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <label className={css.form_input}>
            <span>Name</span>
            <Field type="text" name="name" placeholder="Name Surname"></Field>
            <ErrorMessage name="name" component="span" />
          </label>
          <label className={css.form_input}>
            <span>Number</span>
            <Field type="tel" name="number" placeholder="111-222-3333"></Field>
            <ErrorMessage name="number" component="span" />
          </label>
          <button className={css.form_btn} type="submit">
            Create new contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
