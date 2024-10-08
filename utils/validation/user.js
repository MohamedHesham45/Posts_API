const Joi = require("joi");

const createUser = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.base": "Name must be a string.",
      "string.pattern.base":
        "Name must only contain alphabetic characters and spaces.",
      "string.empty": "Name is required.",
      "any.required": "Name is required.",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/) 
  .messages({
    "string.base": "Password must be a string.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?).",
    "string.min": "Password must be at least 8 characters long.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
  // confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
  //   "any.only": "Passwords must match.",
  //   "any.required": "Confirm Password is required.",
  // }),
  image: Joi.object({
    buffer: Joi.binary().required().messages({
      'binary.base': 'Image file data must be provided',
      'any.required': 'Image file is required'
    }),
    mimetype: Joi.string().regex(/^image\//).required().messages({
      'string.base': 'Image type must be a string',
      'string.pattern.base': 'Invalid image type',
      'any.required': 'Image type is required'
    }),
    
  }).required()
  .messages({
    'object.base': 'Image must be an object',
    'any.required': 'Image is a required field'
  })
});

const loginUser = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string.",
        "string.email": "Email must be a valid email address.",
        "string.empty": "Email is required.",
        "any.required": "Email is required.",
      }),
      password: Joi.string().required()
      .messages({
        "string.base": "Password must be a string.",
        "string.empty": "Password is required.",
        "any.required": "Password is required.",
      }),
});

const tokenRefresh =Joi.object({
  token:Joi.string().required()
})

module.exports = {
  createUser,
  loginUser,
};
