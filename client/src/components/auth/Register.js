import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormField from '../../utils/FormField';
import { generateData, isFormValid, update } from '../../utils/formActions';

// import { setAlert } from '../../actions/alert';
import { register } from '../../actions/user';

const Register = ({ generateData, isFormValid, register, isAuthenticated }) => {
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: {
      element: 'input',
      value: '',
      config: {
        name: 'name_input',
        type: 'text',
        placeholder: 'Enter your name'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: ''
    },
    lastname: {
      element: 'input',
      value: '',
      config: {
        name: 'lastname_input',
        type: 'text',
        placeholder: 'Enter your Lastname'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      validationMessage: ''
    },
    email: {
      element: 'input',
      value: '',
      config: {
        name: 'email_input',
        type: 'email',
        placeholder: 'Enter your email'
      },
      validation: {
        required: true,
        email: true
      },
      valid: false,
      touched: false,
      validationMessage: ''
    },
    password: {
      element: 'input',
      value: '',
      config: {
        name: 'password_input',
        type: 'password',
        placeholder: 'Enter your password'
      },
      validation: {
        required: true,
        password: true
      },
      valid: false,
      touched: false,
      validationMessage: ''
    },
    confirmPassword: {
      element: 'input',
      value: '',
      config: {
        name: 'confirm_password_input',
        type: 'password',
        placeholder: 'Confirm your password'
      },
      validation: {
        required: true,
        password: true,
        confirm: 'password'
      },
      valid: false,
      touched: false,
      validationMessage: ''
    }
  });

  const { name, lastname, email, password, confirmPassword } = formData;

  const onChange = element => {
    const newFormData = update(element, formData, 'register');

    setFormData({
      ...formData,
      formData: newFormData
    });
    setFormError(false);
  };

  const onSubmit = async e => {
    e.preventDefault();

    let dataToSubmit = generateData(formData, 'register');
    let formIsValid = isFormValid(formData, 'register');

    if (formIsValid) {
      register(dataToSubmit);
      setFormError(false);
      setFormSuccess(true);
    } else {
      setFormError(true);
    }
  };

  //   Redirect after user is registered
  if (isAuthenticated) {
    return <Redirect to='/user/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Create Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <FormField
              id={'name'}
              formData={name}
              change={element => onChange(element)}
              name='name'
              value={name}
            />
          </div>
          <div className='form-group'>
            <FormField
              id={'lastname'}
              formData={lastname}
              change={element => onChange(element)}
              name='lastname'
              value={lastname}
            />
          </div>
          <div className='form-group'>
            <FormField
              id={'email'}
              formData={email}
              change={element => onChange(element)}
              name='email'
              value={email}
            />
          </div>
          <div className='form-group'>
            <FormField
              id={'password'}
              formData={password}
              name='password'
              change={element => onChange(element)}
              value={password}
            />
          </div>
          <div className='form-group'>
            <FormField
              id={'confirmPassword'}
              value={confirmPassword}
              name='confirmPassword'
              formData={confirmPassword}
              change={element => onChange(element)}
            />
          </div>
          <input
            type='submit'
            className='ui green inverted button'
            value='Register'
          />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/register_login'>Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  update: PropTypes.func.isRequired,
  isFormValid: PropTypes.func.isRequired,
  generateData: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  formError: PropTypes.bool,
  formSuccess: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  formData: state.user.formData
});

export default connect(
  mapStateToProps,
  { isFormValid, generateData, register, update }
)(Register);
