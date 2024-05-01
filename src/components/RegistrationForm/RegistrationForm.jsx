import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors';
import Loader from '/src/components/Loader/Loader';
const RegistrationForm = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const initialRegisterValues = {
    name: '',
    email: '',
    password: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values));

    actions.resetForm();
  };
  // validation schema
  const RegistrationFormSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(3, 'Too Short!').max(30, 'Too Long!').trim(),
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string().required('Required').min(7, 'Too Short!'),
  });
  return (
    <div className={css.container}>
      <Formik
        initialValues={initialRegisterValues}
        onSubmit={handleSubmit}
        validationSchema={RegistrationFormSchema}
      >
        <Form>
          <label>
            <span className={css.form_title}>Name</span>
            <Field type="text" name="name" placeholder="John Dou"></Field>
            <ErrorMessage name="name" component="span" className={css.errorMessage} />
          </label>
          <label>
            <span className={css.form_title}>Email</span>
            <Field type="email" name="email" placeholder="example@mail.com"></Field>
            <ErrorMessage name="email" component="span" className={css.errorMessage} />
          </label>
          <label>
            <span className={css.form_title}>Password</span>
            <Field type="password" name="password"></Field>
            <ErrorMessage name="password" component="span" className={css.errorMessage} />
          </label>
          <button type="submit">Register</button>
        </Form>
      </Formik>
      <div className={css.message}>{isLoading && <Loader />}</div>
      <div className={css.message}></div>
    </div>
  );
};

export default RegistrationForm;
