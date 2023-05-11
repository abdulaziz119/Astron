import { authAdminByQueryService } from "../../../common/service/admin/admin.service.js";
import jwt from "../../../common/utils/jwt.js";
export default async function authToken(request, response, next) {
  try {
    let { data } = jwt.verify(request.headers.token);
    const query = {
      phone_number: data.phone_number,
      password: data.password,
    };
    let users = await authAdminByQueryService(query);
    if (!users) {
      throw new Error("user not found");
    }
    request.users = users;
    next();
  } catch (error) {
    return response.json({
      status: 401,
      message: error.message,
    });
  }
}
