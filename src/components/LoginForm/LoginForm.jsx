import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
const LoginForm = () => {
  const initialLoginValues = {
    email: '',
    password: '',
  };
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(login(values));
    actions.resetForm();
  };
  // validation schema
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string().required('Required'),
  });
  return (
    <div className={css.container}>
      <Formik
        initialValues={initialLoginValues}
        onSubmit={handleSubmit}
        validationSchema={LoginFormSchema}
      >
        <Form>
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
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
