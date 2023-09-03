import Joi from "joi";
import { ApiError } from "@errors/ApiError";

interface IData {
  name: string;
  email: string;
  password: string;
}

class CreateValidation {
  static validate(data: IData): IData {
    const schemaJoi = Joi.object({
      name: Joi.string().not(Joi.string().empty()).required().messages({
        "string.empty": "The name property has to be a non-empty string",
        "string.base": "The name property has to be a non-empty string",
        "any.required": "The name property is required",
      }),
      email: Joi.string().not(Joi.string().empty()).required().messages({
        "string.empty": "The email property has to be a non-empty string",
        "string.base": "The email property has to be a non-empty string",
        "any.required": "The email property is required",
      }),
      password: Joi.string().not(Joi.string().empty()).required().messages({
        "string.empty": "The password property has to be a non-empty string",
        "string.base": "The password property has to be a non-empty string",
        "any.required": "The password property is required",
      }),
    });

    const { error } = schemaJoi.validate(data);

    if (error) {
      throw new ApiError(error.message);
    }

    return data;
  }
}

export { CreateValidation };
