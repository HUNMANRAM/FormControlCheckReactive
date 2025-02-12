export const VALIDATION_MESSAGES: { [key: string]: { [key: string]: string } } = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 3 characters long.'
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.'
    }
  };