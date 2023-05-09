import Joi from "joi";

export const usersAnchovyValidationSchema = Joi.object({
  full_name: Joi.string().trim(true).min(5).max(30).required(),
  phone_number: Joi.string()
    .regex(/^\d{2}\d{3}\d{2}\d{2}$/)
    .required(),
  occupation: Joi.array().items(
    Joi.string().trim(true).min(2).max(30).required()
  ),
});
