const { check, validationResult } = require('express-validator');

const categoryValidation = [
  check('usertId', 'userId cannot be empty').not().isEmpty(),
  check('categoryName', 'categoryName cannot be empty').not().isEmpty()
];

const commentValidation = [
  check('usertId', 'userId cannot be empty').not().isEmpty(),
  check('goalId', 'goalId cannot be empty').not().isEmpty(),
  check('text', 'text cannot be empty').not().isEmpty(),
  check('createdAt', 'Please include a valid date (yyyy-mm-dd)').isISO8601().toDate()
];

const goalValidation = [
  check('usertId', 'userId cannot be empty').not().isEmpty(),
  check('categoryId', 'categoryId cannot be empty').not().isEmpty(),
  check('title', 'title cannot be empty').not().isEmpty(),
  check('description', 'description cannot be empty').not().isEmpty(),
  check('startDate', 'Please include a valid startDate (yyyy-mm-dd)').isISO8601().toDate(),
  check('dueDate', 'Please include a valid dueDate (yyyy-mm-dd)').isISO8601().toDate(),
  check('progress', 'progress cannot be empty').not().isEmpty()
];

const userValidation = [
  check('googleId', 'googleId cannot be empty').not().isEmpty(),
  check('displayName', 'display name cannot be empty').not().isEmpty(),
  check('firstName', 'firstName cannot be empty').not().isEmpty(),
  check('lastName', 'lastName cannot be empty').not().isEmpty(),
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
