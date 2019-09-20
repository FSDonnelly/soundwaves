export const validate = (element, formData = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /^[^@]+@[^@]+\.[^@]+$/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''} `;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.password) {
    let strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const valid = strongRegex.test(element.value);
    const message = `${
      !valid
        ? 'Must be a valid password with at least 1 uppercase, 1 lowercase, 1 number, 1 special character (!@#$%^&), and 8 characters long'
        : ''
    } `;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'Passwords do not match' : ''} `;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''} `;
    error = !valid ? [valid, message] : error;
  }
  return error;
};

export const update = (element, formData, formName) => {
  const newFormData = {
    ...formData
  };

  const newELement = {
    ...newFormData[element.id]
  };

  newELement.value = element.e.target.value;

  if (element.blur) {
    let validData = validate(newELement, formData);
    newELement.valid = validData[0];
    newELement.validationMessage = validData[1];
  }

  newELement.touched = element.blur;
  newFormData[element.id] = newELement;

  return newFormData;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== 'confirmPassword') {
      dataToSubmit[key] = formData[key].value;
    }
  }

  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }

  return formIsValid;
};
