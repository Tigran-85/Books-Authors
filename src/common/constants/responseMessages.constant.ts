export const BAD_REQUEST = 'Bad Request';

export const RESPONSE_MESSAGES = {
  SIGN_OUT: 'Signed out',
  DELETED: 'Deleted successfully',
  UPDATED: 'Updated successfully',
  VERIFIED: 'Verified successfully',
};

export const ERROR_MESSAGES = {
  USER_EXIST: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  BOOK_EXISTS: 'Book already exists',
  BOOK_NOT_FOUND: 'Book not found',
  AUTHOR_EXISTS: 'Author already exists',
  AUTHOR_NOT_FOUND: 'Author not found',
  USER_EMAIL_EXISTS: 'User with this email already exists',
  USER_DOES_NOT_EXIST: "User doesn't exist",
  INVALID_EMAIL: 'Invalid email address',
  WEAK_PASSWORD: 'Password is too weak',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INVALID_CREDENTIALS: 'Username or password are wrong',
  TOKEN_IS_INVALID: 'Token is invalid',
  TOKEN_EXPIRED: 'Token expired',
  UNAUTHORIZED_USER: 'Unauthorized user',
  INVALID_TOKEN: 'Invalid token',
  INVALID_OLD_PASSWORD: 'Your old password was typed incorrectly',
  NOT_ALLOWED: 'Not allowed',
};

export const VALIDATION_ERROR_MESSAGES = {
  INVALID_FIRSTNAME:
    'Please enter your first name. It should be between 1 and 50 characters long.',
  INVALID_LASTNAME:
    'Please enter your last name. It should be between 1 and 50 characters long.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD:
    'Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter and one number',
};