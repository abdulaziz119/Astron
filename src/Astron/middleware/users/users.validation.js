import { usersAnchovyValidationSchema } from "../../../common/validation/users/users.validation.js";
export async function usersAnchovyValidation(request, response, next) {
  try {
    await usersAnchovyValidationSchema.validateAsync(request.body);
    next();
  } catch (err) {
    response.json({
      status: 404,
      message: err.message,
    });
  }
}
