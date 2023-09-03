import Joi from "joi";
import { ApiError } from "../../../../errors/ApiError";

interface IData {
  content: string;
}

class CreateCommentArticleValidation {
  static validate(data: IData): IData {
    const schemaJoi = Joi.object({
      content: Joi.string().not(Joi.string().empty()).required().messages({
        "string.empty": "The content property has to be a non-empty string",
        "string.base": "The content property has to be a non-empty string",
        "any.required": "The content property is required",
      }),
    });

    const { error } = schemaJoi.validate(data);

    if (error) {
      throw new ApiError(error.message);
    }

    return data;
  }
}

export { CreateCommentArticleValidation };
