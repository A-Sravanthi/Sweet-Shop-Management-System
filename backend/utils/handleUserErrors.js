// utils/handleUserErrors.js
const handleUserErrors = (err) => {
  let errors = { name: '', email: '', password: '' };

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = handleUserErrors;
