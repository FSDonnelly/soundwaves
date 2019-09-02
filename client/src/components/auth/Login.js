import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormField from '../../utils/Forms/FormField';
import { updateForm } from '../../utils/Forms/FormActions';
class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validaitonMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validaitonMessage: ''
      }
    }
  };

  updateForm = element => {
    const { formData } = this.state;
    const newFormData = updateForm(element, formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = () => {};

  render() {
    const {
      formData: { email, password }
    } = this.state;
    return (
      <div className='container'>
        <form onSubmit={e => this.submitForm(e)}>
          <FormField
            id={'email'}
            formData={email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={password}
            change={element => this.updateForm(element)}
          />
        </form>
      </div>
    );
  }
}

export default connect()(Login);

// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { login } from '../../actions/user';

// import MyButton from '../../utils/Button';

// const RegisterLogin = ({ login, isAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: {
//       element: 'input',
//       value: '',
//       config: {
//         name: 'email',
//         type: 'email',
//         placeholder: 'Enter your email'
//       },
//       validation: {
//         required: true,
//         email: true
//       },
//       valid: false,
//       touched: false,
//       validaitonMessage: ''
//     },
//     password: {
//       element: 'input',
//       value: '',
//       config: {
//         name: 'password',
//         type: 'password',
//         placeholder: 'Enter your password'
//       },
//       validation: {
//         required: true
//       },
//       valid: false,
//       touched: false,
//       validaitonMessage: ''
//     }
//   });

//   const { email, password } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     login(email, password);
//     console.log('SUCCESS');
//   };

//   // Redirect if loggecd in
//   if (isAuthenticated) {
//     return <Redirect to='/' />;
//   }
//   // console.log(formData);
//   return (
//     <div className='container'>
//       <div className='ui two column stackable grid container'>
//         <div className='column'>
//           <h1>New Customers</h1>
//           <p>
//             Create an account to recieve AWESOME deals and keep up to date on
//             the newest items!!
//           </p>
//           <MyButton
//             type='default'
//             linkTo='/register'
//             message='Create an Account'
//             buttonClassName='ui green inverted button'
//             icon='icon user'
//             addStyles={{
//               margin: '10px 0 0 0 '
//             }}
//           />
//         </div>
//         <div className='column'>
//           <h1>Resgistered Customers</h1>
//           <p>If you have an account, please log in.</p>
//           <form className='form' onSubmit={e => onSubmit(e)}>
//             <div className='form-group'>
//               <label htmlFor='exampleInputEmail1'>
//                 <strong>Email address</strong>
//               </label>
//               <input
//                 type='email'
//                 name='email'
//                 className='form-control'
//                 id='exampleInputEmail1'
//                 aria-describedby='emailHelp'
//                 placeholder='Enter email'
//                 onChange={e => onChange(e)}
//                 value={email}
//               />
//               <small id='emailHelp' className='form-text text-muted'>
//                 We'll never share your email with anyone else.
//               </small>
//             </div>
//             <div className='form-group'>
//               <label htmlFor='exampleInputPassword1'>
//                 <strong>Password</strong>
//               </label>
//               <input
//                 name='password'
//                 type='password'
//                 className='form-control'
//                 id='exampleInputPassword1'
//                 placeholder='Password'
//                 onChange={e => onChange(e)}
//                 value={password}
//               />
//               <MyButton
//                 type='submit'
//                 value='Login'
//                 message='Submit'
//                 buttonClassName='ui green inverted button'
//                 icon='icon user'
//                 addStyles={{
//                   marginTop: '10px'
//                 }}
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// RegisterLogin.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.user.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { login }
// )(RegisterLogin);

// // export default RegisterLogin;