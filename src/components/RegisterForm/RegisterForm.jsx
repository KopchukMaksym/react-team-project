import { Formik, Form } from 'formik';

import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerThunk } from 'redux/authorization/thunksAuth';
import { MdEmail, MdLock, MdAccountBox } from 'react-icons/md';

import { ReactComponent as Logo } from './logo.svg';

// import Logo from './logo.svg';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleRegister = e => {
    const { name: username, email, password } = e;
    dispatch(registerThunk({ username, email, password }));
    navigate('/login');
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid e-mail')
      .required('Required field to fill!'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(12, 'Password must be 12 characters maximum')
      .required('Required field to fill!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must match!')
      .required('Password confirmation required!'),
    name: Yup.string()
      .min(1, 'First name must be at least 1 characters long')
      .max(12, 'Firat name must be 12 characters maximum')
      .required('Required field to fill!'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        validateOnBlur
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, values, isValid, dirty, errors }) => {
          return (
            <Form className={css.form}>
              <div className={css.logoWrapper}>
                <Logo className={css.logo} />
                <h1>Wallet</h1>
              </div>
              <div className={css.inputWrapper}>
                {errors.email && (
                  <div className={css.errorMessage}>{errors.email}</div>
                )}
                <MdEmail className={css.icon} />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={css.input}
                />
              </div>

              <div className={css.inputWrapper}>
                {errors.password && (
                  <div className={css.errorMessage}>{errors.password}</div>
                )}
                <MdLock className={css.icon} />
                <input
                  // label={<MdLock width={16} height={21} />}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onInput={e => setPassword(e.target.value)}
                  value={values.password}
                  className={css.input}
                />
              </div>

              <div className={css.inputWrapper}>
                {errors.confirmPassword && (
                  <div className={css.errorMessage}>
                    {errors.confirmPassword}
                  </div>
                )}
                <MdLock className={css.icon} />
                <input
                  // label={<MdLock width={16} height={21} color={'#E0E0E0'} />}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={css.input}
                />
                {!errors.confirmPassword && password && (
                  <div className={css.wrapper}>
                    <div className={css.confirmProgress}></div>
                  </div>
                )}
              </div>

              <div className={css.inputWrapper}>
                {errors.name && (
                  <div className={css.errorMessage}>{errors.name}</div>
                )}
                <MdAccountBox className={css.icon} />
                <input
                  // label={<MdAccountBox width={18} height={18} />}
                  type="text"
                  name="name"
                  placeholder="First name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={css.input}
                />
              </div>

              <button
                className={css.button}
                type="submit"
                disabled={!isValid && !dirty}
              >
                Register
              </button>
              <div className={css.linkWrapper}>
                <NavLink className={css.link} to="/login">
                  Log in
                </NavLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
