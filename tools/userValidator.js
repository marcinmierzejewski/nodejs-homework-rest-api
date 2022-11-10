const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const singUpSchema = Joi.object({

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["pl", "com", "net", "eu"] },
    })
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required(),    
});


exports.validateSignUp = validator(singUpSchema);