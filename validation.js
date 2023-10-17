const { check, validationResult } = require('express-validator');

const categoryValidation = [
  check('userId', 'userId cannot be empty').not().isEmpty(),
  check('userId', 'userId must be a string').isString(),
  check('categoryName', 'categoryName cannot be empty').not().isEmpty(),
  check('categoryName', 'categoryName must be a string').isString()
];

const commentValidation = [
  check('userId', 'userId cannot be empty').not().isEmpty(),
  check('userId', 'userId must be a string').isString(),
  check('goalId', 'goalId cannot be empty').not().isEmpty(),
  check('goalId', 'goalId must be a string').isString(),
  check('text', 'text cannot be empty').not().isEmpty(),
  check('text', 'text must be a string').isString(),
  check('createdAt', 'Please include a valid date (yyyy-mm-dd)').isISO8601().toDate()
];

const goalValidation = [
  check('userId', 'userId cannot be empty').not().isEmpty(),
  check('userId', 'userId must be a string').isString(),
  check('categoryId', 'categoryId cannot be empty').not().isEmpty(),
  check('categoryId', 'categoryId must be a string').isString(),
  check('title', 'title cannot be empty').not().isEmpty(),
  check('title', 'title must be a string').isString(),
  check('description', 'description cannot be empty').not().isEmpty(),
  check('description', 'description must be a string').isString(),
  check('startDate', 'Please include a valid startDate (yyyy-mm-dd)').isISO8601().toDate(),
  check('dueDate', 'Please include a valid dueDate (yyyy-mm-dd)').isISO8601().toDate(),
  check('progress', 'progress cannot be empty').not().isEmpty(),
  check('progress', 'progress must be an integer').isInt()
];

const userValidation = [
  check('googleId', 'googleId cannot be empty').not().isEmpty(),
  check('googleId', 'googleId must be a string').isString(),
  check('displayName', 'display name cannot be empty').not().isEmpty(),
  check('displayName', 'displayName must be a string').isString(),
  check('firstName', 'firstName cannot be empty').not().isEmpty(),
  check('firstName', 'firstName must be a string').isString(),
  check('lastName', 'lastName cannot be empty').not().isEmpty(),
  check('lastName', 'lastName must be a string').isString(),
  check('image', 'image cannot be empty').not().isEmpty()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ error: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  commentValidation,
  userValidation,
  categoryValidation,
  goalValidation,
  validate
};
